// TabPaneTwo.tsx
import React from 'react';
import { Formik, Form, FieldArray, Field, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { FormFieldsResponse, QuestionsArray } from '@/src/Interfaces/api/form';
import { createFormFields } from '@/src/api/axios/services/form';
import {
  Col,
  Input,
  Label,
  Row,
  FormFeedback,
  InputGroup,
  Button,
} from 'reactstrap';
import { deleteForm } from '@/src/api/axios/services/form/delete.form';
import { CREATED } from '@/src/api/constants/status-response.constant';
interface TabPaneTwoProps {
  questions: Question[];
  formId: string | null;
  setFormFields: (fields: FormFieldsResponse) => void;
  toggleTab: (tabId: number) => void;
  activeTab: number;
}
const TabPaneTwo = ({
  questions,
  formId,
  setFormFields,
  toggleTab,
  activeTab,
}: TabPaneTwoProps) => (
  <Formik
    initialValues={{
      // @ts-ignore
      questions: questions.map(({ formId: _, ...rest }) => ({
        formId: formId || '',
        ...rest,
      })),
    }}
    validationSchema={Yup.object({
      questions: Yup.array().of(
        Yup.object({
          label: Yup.string().required('La pregunta es requerida'),
          type: Yup.string().required('El tipo de pregunta es requerido'),
          options: Yup.array().when('type', (type, schema) => {
            if (type.includes('selector')) {
              return schema
                .of(Yup.string().required('La opción es requerida'))
                .required('Las opciones son requeridas');
            }
            return schema.notRequired();
          }),
        }),
      ),
    })}
    onSubmit={async (formData: QuestionsArray) => {
      const questionsProcesed = formData.questions
        .filter((question) => question.options)
        .map((question) => ({
          label: question.label,
          type: question.type,
          optionsData: question.options,
          formId: formId || '',
        }));
      const response = await createFormFields(questionsProcesed);
      if (response.status === CREATED) {
        setFormFields(response);
        toggleTab(activeTab + 1);
      }
    }}
  >
    {(formik) => {
      return (
        <Form className='repeater' encType='multipart/form-data'>
          <FieldArray name='questions'>
            {({ push, remove }) => (
              <div>
                {formik.values.questions.map((_question, index) => (
                  <Row key={`${index}-keyNewForm`} className='mt-2'>
                    <Col lg={4} className='mb-3'>
                      <Label>Pregunta</Label>
                      <Field
                        as={Input}
                        id={`questions[${index}].label`}
                        name={`questions[${index}].label`}
                        className='form-control'
                        placeholder='Ingrese la Pregunta'
                        invalid={
                          formik.touched.questions?.[index]?.label &&
                          !!(
                            formik.errors.questions?.[
                              index
                            ] as FormikErrors<Question>
                          )?.label
                        }
                        type='text'
                      />
                      {formik.touched.questions?.[index]?.label &&
                      (
                        formik.errors.questions?.[
                          index
                        ] as FormikErrors<Question>
                      )?.label ? (
                        <FormFeedback type='invalid'>
                          {
                            (
                              formik.errors.questions?.[
                                index
                              ] as FormikErrors<Question>
                            )?.label
                          }
                        </FormFeedback>
                      ) : null}
                    </Col>
                    <Col lg={3} className='mb-3'>
                      <label htmlFor='email'>Tipo de Pregunta</label>
                      <Field
                        as={Input}
                        type='select'
                        className='form-select'
                        id={`questions[${index}].type`}
                        name={`questions[${index}].type`}
                        invalid={
                          formik.touched.questions?.[index]?.type &&
                          !!(
                            formik.errors.questions?.[
                              index
                            ] as FormikErrors<Question>
                          )?.type
                        }
                      >
                        <option>Seleccione el tipo de pregunta</option>
                        <option value='checkbox'>Si o No</option>
                        <option value='text'>Texto</option>
                        <option value='selector'>Selector</option>
                      </Field>
                      {formik.touched.questions?.[index]?.type &&
                      (
                        formik.errors.questions?.[
                          index
                        ] as FormikErrors<Question>
                      )?.type ? (
                        <FormFeedback type='invalid'>
                          {
                            (
                              formik.errors.questions?.[
                                index
                              ] as FormikErrors<Question>
                            )?.type
                          }
                        </FormFeedback>
                      ) : null}
                    </Col>
                    {formik.values.questions[index].type === 'selector' && (
                      <FieldArray name={`questions[${index}].options`}>
                        {({ push, remove }) => (
                          <Col lg={3}>
                            <Label
                              style={{
                                marginBottom: '0px',
                              }}
                            >
                              Opciones
                            </Label>
                            {/* @ts-ignore */}
                            {formik.values.questions[index].options.map(
                              (_option, optionIndex) => (
                                <div
                                  key={`${optionIndex}--optionIndex`}
                                  className='d-flex align-items-center justify-content-between'
                                >
                                  <InputGroup className='input-group auth-pass-inputgroup'>
                                    <Field
                                      as={Input}
                                      id={`questions[${index}].options[${optionIndex}]`}
                                      name={`questions[${index}].options[${optionIndex}]`}
                                      className='form-control mt-2'
                                      placeholder='Ingrese la opción'
                                      type='text'
                                      invalid={
                                        Array.isArray(
                                          (
                                            formik.touched.questions?.[
                                              index
                                            ] as FormikErrors<Question>
                                          )?.options,
                                        ) &&
                                        Array.isArray(
                                          (
                                            formik.errors.questions?.[
                                              index
                                            ] as FormikErrors<Question>
                                          )?.options,
                                        ) &&
                                        (
                                          formik.touched.questions?.[
                                            index
                                          ] as FormikErrors<Question>
                                        )?.options?.[optionIndex] &&
                                        !!(
                                          formik.errors.questions?.[
                                            index
                                          ] as FormikErrors<Question>
                                          // @ts-ignore
                                        )?.options?.[optionIndex]?.length
                                      }
                                    />
                                    <div className='input-group-append'>
                                      <Button
                                        className='btn btn-danger mt-2'
                                        onClick={() => remove(optionIndex)}
                                      >
                                        <i className='mdi mdi-delete-forever' />
                                      </Button>
                                    </div>
                                  </InputGroup>
                                  {Array.isArray(
                                    (
                                      formik.touched.questions?.[
                                        index
                                      ] as FormikErrors<Question>
                                    )?.options,
                                  ) &&
                                  Array.isArray(
                                    (
                                      formik.errors.questions?.[
                                        index
                                      ] as FormikErrors<Question>
                                    )?.options,
                                  ) &&
                                  (
                                    formik.touched.questions?.[
                                      index
                                    ] as FormikErrors<Question>
                                  )?.options?.[optionIndex] &&
                                  typeof(
                                    formik.errors.questions?.[
                                      index
                                    ] as FormikErrors<Question>
                                  )?.options?.[optionIndex] ? (
                                    <FormFeedback type='invalid'>
                                      {/*@ts-ignore*/}
                                      {
                                        (
                                          formik.errors.questions?.[
                                            index
                                          ] as FormikErrors<Question>
                                        )?.options?.[optionIndex]
                                      }
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              ),
                            )}
                            <Button
                              color='secondary'
                              type='button'
                              className='mt-2 mb-2 w-100'
                              onClick={() => push('')}
                              value='Agregar Opción'
                            >
                              <i className='mdi mdi-plus' />
                              Agregar Opción
                            </Button>
                          </Col>
                        )}
                      </FieldArray>
                    )}

                    <Col className='d-flex align-self-center justify-content-end'>
                      <div className='d-grid'>
                        <input
                          type='button'
                          className='btn btn-danger'
                          value='Eliminar Pregunta'
                          onClick={() => remove(index)}
                        />
                      </div>
                    </Col>
                  </Row>
                ))}
                <input
                  type='button'
                  className='btn btn-success mt-3 mt-lg-1'
                  style={{ marginTop: '1rem' }}
                  value={'Agregar Pregunta'}
                  onClick={() =>
                    push({
                      label: '',
                      type: '',
                      options: [''],
                    })
                  }
                />
              </div>
            )}
          </FieldArray>
          <div className='wizard clearfix mt-3'>
            <div className='actions clearfix'>
              <ul>
                <li
                  className={activeTab === 1 ? 'previous disabled' : 'previous'}
                >
                  {activeTab === 3 ? (
                    <div />
                  ) : (
                    <input
                      className='btn btn-primary'
                      type='submit'
                      value={'Anterior'}
                      onClick={() => {
                        toggleTab(activeTab - 1);
                        if (formId) deleteForm(formId);
                      }}
                    />
                  )}
                </li>
                <li className={'next'}>
                  <input
                    className='btn btn-primary'
                    type='submit'
                    value={'Siguiente'}
                  />
                </li>
              </ul>
            </div>
          </div>
        </Form>
      );
    }}
  </Formik>
);

export default TabPaneTwo;

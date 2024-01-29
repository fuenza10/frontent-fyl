// TabPaneOne.tsx
import React from 'react';
import { Form, Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import { FormikProps } from 'formik';
interface MyFormValues {
  name: string;
  userId: string;
}
const TabPaneOne = ({
  validationCreateForm,
}: { validationCreateForm: FormikProps<MyFormValues> }) => (
  <Form
    onSubmit={(e) => {
      e.preventDefault();

      validationCreateForm.handleSubmit(e);
      return false;
    }}
  >
    <Row>
      <Col lg='12'>
        <div className='mb-3'>
          <Label>Nombre del Formulario</Label>
          <Input
            type='text'
            className='form-control'
            id='name'
            placeholder='Ingrese el Nombre del Formulario'
            value={validationCreateForm.values.name || ''}
            onChange={validationCreateForm.handleChange}
            invalid={
              validationCreateForm.touched.name &&
              validationCreateForm.errors.name
                ? true
                : false
            }
          />
          {validationCreateForm.touched.name &&
          validationCreateForm.errors.name ? (
            <FormFeedback type='invalid'>
              {validationCreateForm.errors.name}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
    </Row>
    <div className='wizard clearfix mt-3'>
      <div className='actions clearfix'>
        <ul>
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

export default TabPaneOne;

import { IState } from '@/src/Interfaces';
import { Company } from '@/src/Interfaces/api/company';
import { findAllCompanies } from '@/src/api/axios/services/company/get.company';
import Breadcrumb from '@/src/components/Common/Breadcrumb';
import { useRut } from '@/src/hooks/Rut/useRut';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
  Row,
} from 'reactstrap';
import * as Yup from 'yup';

import { register } from '@/src/api/axios/services/auth/post.auth';
import { notification } from 'antd';
export const CreateUser = () => {
  document.title = 'Crear Usuario';
  const [companies, setCompanies] = useState<Company[]>([]);
  const { rut, updateRut, isValid } = useRut();
  const { user } = useSelector((state: IState) => state.auth);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      companyId: '',
      rut: '',
      userRole: user?.UserRole.find((role: any) => role === 'ADMIN_ROLE') === 'ADMIN_ROLE'
        ? ['CLIENT_ROLE']
        : ['USER_ROLE'],
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Este campo es requerido'),
      lastName: Yup.string().required('Este campo es requerido'),
      email: Yup.string()
        .email('Email invalido')
        .matches(/^(?!.*@[^,]*,)/)
        .required('Este campo es requerido'),
      password: Yup.string()
        .min(8, 'El password debe tener al menos 8 caracteres')
        .matches(/(.*[a-z].*)/, 'Debe tener al menos una minúscula')
        .matches(/(.*[A-Z].*)/, 'Debe tener al menos una mayúscula')
        .matches(/(.*[0-9].*)/, 'Debe tener al menos un número')
        .required('Este campo es requerido'),
      companyId: user?.UserRole.find((role: any) => role === 'ADMIN_ROLE') === 'ADMIN_ROLE'
        ? Yup.string().notRequired()
        : Yup.string().required('Este campo es requerido'),
      rut: Yup.string().required('Este campo es requerido'),
    }),

    onSubmit: (values: any) => {
      const response = register(values)
        .then((res) => {
          if (res.status === 201) {
            notification.success({
              message: 'Usuario creado con éxito',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: 'Error al crear el usuario',
          });
        });
    },
  });
  useEffect(() => {
    async function fetchCompanies() {
      const response = await findAllCompanies();
    
      setCompanies(response ?? []);
    }
    fetchCompanies();
  }, []);
  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid={true}>
          <Breadcrumb title='Usuarios' breadcrumbItem='Crea Tu Nuevo Cliente' />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <div className='mb-3'>
                          <Label htmlFor='formrow-firstname-Input'>
                            Nombre
                          </Label>
                          <Input
                            type='text'
                            name='firstName'
                            className='form-control'
                            id='formrow-firstname-Input'
                            placeholder='Ingresa tu Nombre'
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.firstName &&
                                formik.errors.firstName
                                ? true
                                : false
                            }
                          />
                          {formik.errors.firstName &&
                            formik.touched.firstName ? (
                            <FormFeedback type='invalid'>
                              {typeof formik.errors.firstName === 'string'? formik.errors.firstName : JSON.stringify(formik.errors.firstName)}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className='mb-3'>
                          <Label htmlFor='formrow-lastname-Input'>
                            Apellidos
                          </Label>
                          <Input
                            type='text'
                            name='lastName'
                            className='form-control'
                            placeholder='Ingrese su Apellido'
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.lastName && formik.errors.lastName
                                ? true
                                : false
                            }
                          />
                          {formik.errors.lastName && formik.touched.lastName ? (
                            <FormFeedback type='invalid'>
                              {typeof formik.errors.lastName === 'string'? formik.errors.lastName : JSON.stringify(formik.errors.lastName)}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className='mb-3'>
                          <Label htmlFor='formrow-email-Input'>Email</Label>
                          <Input
                            type='email'
                            name='email'
                            className='form-control'
                            id='formrow-email-Input'
                            placeholder='Ingresa tu Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.email && formik.errors.email
                                ? true
                                : false
                            }
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <FormFeedback type='invalid'>
                              {typeof formik.errors.email === 'string'? formik.errors.email : JSON.stringify(formik.errors.email)}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className='mb-3'>
                          <Label htmlFor='formrow-password-Input'>
                            Password
                          </Label>
                          <Input
                            type='password'
                            name='password'
                            className='form-control'
                            id='formrow-password-Input'
                            placeholder='Ingresa la contraseña'
                            autoComplete='off'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={
                              formik.touched.password && formik.errors.password
                                ? true
                                : false
                            }
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <FormFeedback type='invalid'>
                              {typeof formik.errors.password === 'string'? formik.errors.password : JSON.stringify(formik.errors.password)}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4}>
                        <div className='mb-3'>
                          {companies.length > 0 ?
                            (
                              <>
                                <Label htmlFor='formrow-InputCity'>Compañía</Label>

                                <Input
                                  type='select'
                                  id='formrow-company-Input'
                                  name='companyId'
                                  className='form-control'
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.companyId}
                                >
                                  <option>Selecciona una empresa</option>
                                  {companies?.map((company) => (
                                    <option key={company.id} value={company.id}>
                                      {company.name}
                                    </option>
                                  ))}
                                </Input>
                                {formik.errors.companyId &&
                                  formik.touched.companyId ? (
                                  
                                  <FormFeedback type='invalid'>
                                    // @ts-ignore
                                    {typeof formik.errors.companyId === 'string'? formik.errors.companyId : JSON.stringify(formik.errors.companyId)}
                                  </FormFeedback>
                                ) : null}
                              </>
                            ) : <div />
                          }
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className='mb-3'>
                          <Label htmlFor='formrow-InputState'>Rut</Label>
                          <Input
                            name='rut'
                            type='text'
                            value={rut.formatted}
                            onChange={(e) => {
                              formik.handleChange(e);
                              updateRut(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                            className='form-control'
                            placeholder='Ingrese RUT de la empresa'
                            valid={isValid}
                            //@ts-ignore
                            invalid={
                              rut.formatted.length >= 0 &&
                              !isValid &&
                              formik.touched.rut
                            }
                          />
                          <FormFeedback valid>RUT Válido</FormFeedback>
                          <FormFeedback>
                            {rut.formatted.length === 0
                              ? 'El RUT es requerido'
                              : 'El RUT es invalido'}
                          </FormFeedback>
                        </div>
                      </Col>
                    </Row>

                    <div>
                      <button type='submit' className='btn btn-primary w-md'>
                        Crear Usuario
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

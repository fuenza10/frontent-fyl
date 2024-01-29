//@ts-nocheck
import {
  BAD_REQUEST,
  CREATED,
} from '@/src/api/constants/status-response.constant';
import Breadcrumb from '@/src/components/Common/Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { prettifyRut } from '@/src/hooks/Rut/rutUtils';
import { notification } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { useRut } from '@/src/hooks/Rut/useRut';
import { patchCompany } from '@/src/api/axios/services/company/patch.company';
export const CompanyUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state;

  const { rut, updateRut, isValid } = useRut();

  useEffect(() => {
    updateRut(company.rut);
  }, []);
  const validationCreateCompany = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: company.name,
      email: company.email,
      rut: company.rut,
      address: company.address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
      email: Yup.string()
        .email('Email invalido')
        .required('El email es requerido'),
      rut: Yup.string().required('El RUT es requerido'),
      address: Yup.string().required('La dirección es requerida'),
    }),
    onSubmit: async (formData) => {
      const rutFormatted = prettifyRut(formData.rut);
      const data = {
        ...formData,
        rut: rutFormatted,
      };
      const response = await patchCompany(company.id, data);
      if (response.status === CREATED) {
        notification.success({
          message: 'Empresa actualizada correctamente',
          description: 'La empresa se ha actualizada correctamente',
          duration: 2,
        });
        navigate('/company-table-1');
        validationCreateCompany.resetForm();
        updateRut('');
      }

      if (response.status === BAD_REQUEST) {
        notification.error({
          message: 'Error al actualizar la  empresa',
          description: response.details,
          duration: 2,
        });
      }
    },
  });

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid={true}>
          <Breadcrumb title='Empresas' breadcrumbItem='Actualizar Empresa' />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle>Información de La Empresa</CardTitle>
                  <p className='card-title-desc'>
                    Ingrese la información de la empresa
                  </p>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validationCreateCompany.handleSubmit();
                      return false;
                    }}
                  >
                    <FormGroup className='mb-4 mt-2' row>
                      <Label md='2' className='col-form-label'>
                        Nombre de la Empresa
                      </Label>
                      <Col md='10'>
                        <Input
                          type='text'
                          className='form-control'
                          name='name'
                          placeholder='Ingrese el nombre de la empresa'
                          onChange={validationCreateCompany.handleChange}
                          onBlur={validationCreateCompany.handleBlur}
                          value={validationCreateCompany.values.name}
                          invalid={
                            validationCreateCompany.touched.name &&
                            validationCreateCompany.errors.name
                              ? true
                              : false
                          }
                        />
                        {validationCreateCompany.touched.name &&
                        validationCreateCompany.errors.name ? (
                          <FormFeedback>
                            {JSON.stringify(
                              validationCreateCompany.errors.name,
                            )}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup className='mb-4' row>
                      <Label md='2' className='col-form-label'>
                        Email
                      </Label>
                      <Col md='10'>
                        <Input
                          type='email'
                          name='email'
                          className='form-control'
                          id='company-email-address'
                          placeholder='Ingrese el email de la empresa'
                          onChange={validationCreateCompany.handleChange}
                          onBlur={validationCreateCompany.handleBlur}
                          value={validationCreateCompany.values.email}
                          invalid={
                            validationCreateCompany.touched.email &&
                            validationCreateCompany.errors.email
                              ? true
                              : false
                          }
                        />
                        {validationCreateCompany.touched.email &&
                        validationCreateCompany.errors.email ? (
                          <FormFeedback>
                            {validationCreateCompany.errors.email}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup className='mb-4' row>
                      <Label md='2' className='col-form-label'>
                        Rut
                      </Label>
                      <Col md={10}>
                        <Input
                          name='rut'
                          type='text'
                          value={rut.formatted}
                          onChange={(e) => {
                            validationCreateCompany.handleChange(e);
                            updateRut(e.target.value);
                          }}
                          onBlur={validationCreateCompany.handleBlur}
                          className='form-control'
                          placeholder='Ingrese RUT de la empresa'
                          valid={isValid}
                          invalid={
                            rut.formatted.length >= 0 &&
                            !isValid &&
                            typeof validationCreateCompany.touched.rut ===
                              'boolean' &&
                            validationCreateCompany.touched.rut
                          }
                        />
                        <FormFeedback valid>RUT Válido</FormFeedback>
                        <FormFeedback>
                          {rut.formatted.length === 0
                            ? 'El RUT es requerido'
                            : 'El RUT es invalido'}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup className='mb-4' row>
                      <Label md='2' className='col-form-label'>
                        Dirección
                      </Label>
                      <Col md='10'>
                        <Input
                          className='form-control'
                          id='billing-address-company'
                          name='address'
                          placeholder='Ingrese la dirección de la empresa'
                          onChange={validationCreateCompany.handleChange}
                          onBlur={validationCreateCompany.handleBlur}
                          value={validationCreateCompany.values.address}
                          invalid={
                            validationCreateCompany.touched.address &&
                            validationCreateCompany.errors.address
                              ? true
                              : false
                          }
                        />
                        {validationCreateCompany.touched.address &&
                        validationCreateCompany.errors.address ? (
                          <FormFeedback>
                            {validationCreateCompany.errors.address}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <div
                      className='d-flex'
                      style={{ justifyContent: 'flex-end' }}
                    >
                      <Button type='submit' color='primary' className='btn '>
                        Actualizar Empresa
                      </Button>
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

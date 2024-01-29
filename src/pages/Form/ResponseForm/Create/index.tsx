import { Company } from '@/src/Interfaces/api/company';
import { findAllCompanies } from '@/src/api/axios/services/company/get.company';
import { formResponse } from '@/src/api/axios/services/form';
import Breadcrumb from '@/src/components/Common/Breadcrumb';
import CheckboxComponent from '@/src/components/Common/CheckBoxComponent';
import SelectorComponent from '@/src/components/Common/SelectorComponent';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
} from 'reactstrap';

const FormularioViewer = () => {
  const [respuestas, setRespuestas] = useState<{
    [key: string]: string | boolean;
  }>({});
  const [companyId, setCompanyId] = useState<string>('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const handleInputChange = (questionId: string, value: string | boolean) => {
    setRespuestas({ ...respuestas, [questionId]: value });
  };
  const location = useLocation();
  const navigate = useNavigate();
  
  const formName = location.state?.name;
  const fields = location.state?.fields;
  const formId = location.state?.id;
  
  useEffect(() => {
    async function fetchCompanies() {
      const response = await findAllCompanies();
      setCompanies(response);
    }
    fetchCompanies();
  }, []);

  const handleSubmitForm = async () => {
    try {
      const payload = {
        formId,
        companyId,
        responses: Object.entries(respuestas).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      };

      const response = await formResponse(payload);
      if (response.statusCode === 201) {
        notification.success({
          message: 'Formulario enviado',
          description: 'El formulario se ha enviado correctamente',
        });
        navigate('/form-table');
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error',
        description: 'Ocurrio un error al enviar el formulario',
      });
    }
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumb
            title='Formularios'
            breadcrumbItem='Responder Formulario'
          />
          <Row>
            <Card>
              <CardBody>
                <div>
                  <h5>{formName}</h5>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitForm();
                      return false;
                    }}
                  >
                    <Row className='mt-4'>
                      <Col
                        lg={6}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Label>Nombre</Label>
                      </Col>
                      <Col>
                        <Input
                          type='select'
                          onChange={(e) => setCompanyId(e.target.value)}
                        >
                          <option>Selecciona una empresa</option>
                          {companies?.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.name}
                            </option>
                          ))}
                        </Input>
                      </Col>

                      {fields?.map((question: FormField, index: number) => (
                        <div key={`question-${index}`} className='mt-4'>
                          {question.type === 'text' && (
                            <Row className='mt-3'>
                              <Col
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Label style={{ marginBottom: '0px' }}>
                                  {question.label}
                                </Label>
                              </Col>
                              <Col>
                                <Input
                                  type='text'
                                  onChange={(e) =>
                                    handleInputChange(
                                      question.id,
                                      e.target.value,
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                          )}
                          {question.type === 'checkbox' && (
                            <CheckboxComponent
                              pregunta={question}
                              onChange={handleInputChange}
                            />
                          )}

                          {question.type === 'selector' && (
                            <SelectorComponent
                              pregunta={question}
                              onChange={handleInputChange}
                            />
                          )}
                        </div>
                      ))}
                    </Row>
                    <Row className='mt-4'>
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Link to='/form-table' className='btn btn-secondary'>
                          {' '}
                          Volver
                        </Link>
                      </Col>
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Button color='primary' className='btn btn-primary'>Enviar</Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormularioViewer;

import { Company } from '@/src/Interfaces/api/company';
import { findAllCompanies } from '@/src/api/axios/services/company/get.company';
import { updateFormResponse } from '@/src/api/axios/services/form/patch.form';
import Breadcrumb from '@/src/components/Common/Breadcrumb';
import CheckboxComponent from '@/src/components/Common/CheckBoxComponent';
import SelectorComponent from '@/src/components/Common/SelectorComponent';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { DocumentPDF } from '../../PDF/DocumentPDF';
import { formateDate } from '@/src/common/functions/date-formater';
import { useSelector } from 'react-redux';
import { IState } from '@/src/Interfaces';

interface FormResponses {
  createdAt: string;
  formField: FormField;
  id: string;
  value: string;
}

const UpdateFormResponse = () => {
  const [respuestas, setRespuestas] = useState<{
    [key: string]: string | boolean;
  }>({});
  const [companyId, setCompanyId] = useState<string>('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const handleInputChange = (questionId: string, value: string | boolean) => {
    setRespuestas({ ...respuestas, [questionId]: value });
  };
  const location = useLocation();
  const { user } = useSelector((state: IState) => ({
    user: state.auth.user,
  }));

  const navigate = useNavigate();
  
  const formName = location.state?.forms.name;
  const formId = location.state?.formId;
  const responseId = location.state?.id;
  const fields = location.state?.forms?.fields;
  const isUser = location.state?.isUser ?? false;

  useEffect(() => {
    setCompanyId(location.state.companyId);
  }, [location.state.companyId]);

  useEffect(() => {
    async function fetchCompanies() {
      const response = await findAllCompanies();
      setCompanies(response);
    }
    fetchCompanies();
  }, []);

  const formResponses: FormResponses[] = location.state?.formResponses;

  const dateCreate = formateDate(formResponses[0].createdAt);
  const formResponse = Object.entries(respuestas).map(([questionId, value]) => {
    const matchingResponse = formResponses?.find(
     
      (response: any) => response.formField.id === questionId,
    );

    return {
      questionId,
      value,
      formResponseId: matchingResponse?.id,
    };
  });

  const handleSubmitForm = async () => {
    try {
      const payload = {
        id: responseId,

        formResponse,
      };

      const response = await updateFormResponse(payload, companyId, formId);
      if (response.statusCode === 200) {
        notification.success({
          message: 'Formulario Actualizado',
          description: 'El formulario se ha actualizado correctamente',
        });
        navigate('/form-response-table');
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Ocurrio un error al actualizar el formulario',
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
                          value={companyId}
                          disabled={isUser}
                        >
                          <option>Selecciona una empresa</option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.name}
                            </option>
                          ))}
                        </Input>
                      </Col>

                      {formResponses.map((question, index: number) => (
                        <div
                          key={`question-${
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            index
                          }`}
                          className='mt-4'
                        >
                          {question.formField.type === 'text' && (
                            <Row className='mt-3'>
                              <Col
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Label style={{ marginBottom: '0px' }}>
                                  {question.formField.label}
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
                                  defaultValue={question.value}
                                  disabled={isUser}
                                />
                              </Col>
                            </Row>
                          )}
                          {question.formField.type === 'checkbox' && (
                            <CheckboxComponent
                              pregunta={question.formField}
                              onChange={handleInputChange}
                            />
                          )}

                          {question.formField.type === 'selector' && (
                            <SelectorComponent
                              pregunta={{
                                id: question.formField.id,
                                label: question.formField.label,
                                type: question.formField.type,
                                options: question.formField.options,
                              }}
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
                        {!isUser && (
                          <>
                            <Button color='primary' className='btn btn-primary'>
                              Enviar
                            </Button>
                            <PDFDownloadLink
                              document={
                                <DocumentPDF
                                  formResponses={formResponses}
                                  formName={formName}
                                  dateCreate={dateCreate}
                                  companyName={
                                    companies.find(
                                      (company) => company.id === companyId,
                                    )?.name
                                  }
                                  user={user}
                                  companyRut={
                                    companies.find(
                                      (company) => company.id === companyId,
                                    )?.rut
                                  }
                                />
                              }
                              style={{marginLeft:'10px'}}
                              className='btn btn-success'
                              fileName={`${formName}- ${formateDate(
                                new Date().toString(),
                              )}`}
                            >
                              {({ loading }) =>
                                loading
                                  ? 'Generando Documento...'
                                  : 'Descargar Informe'
                              }
                            </PDFDownloadLink>
                            <Button
                            color='primary'
                            style={{marginLeft:'10px'}}
                            className='btn btn-secondary'
                            onClick={() => navigate('/form-response-table')}
                          >
                            Volver
                          </Button>
                          </>

                        )}
                        {isUser && (
                          <Button
                            color='primary'
                            className='btn btn-primary'
                            onClick={() => navigate('/form-response-table')}
                          >
                            Volver
                          </Button>
                        )}
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

export default UpdateFormResponse;

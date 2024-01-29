import Breadcrumbs from '@/src/components/Common/Breadcrumb';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';

import { createForm } from '@/src/api/axios/services/form';
import { useSelector } from 'react-redux';

import { IState } from '@/src/Interfaces';
import { FormFieldsResponse } from '@/src/Interfaces/api/form';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import StepsTab from './StepsTab';
import TabPaneOne from './TabOne';
import TabThree from './TabThree';
import TabPaneTwo from './TabTwo';
import { CREATED } from '@/src/api/constants/status-response.constant';

const FormCreate = () => {
  document.title = 'Creador Fomularios';
  const { user } = useSelector((state: IState) => state.auth);

  const [formId, setFormId] = useState<string | null>(null);
  const questions: Question[] = [
    { id: '', label: '', type: '', options: [{ value: '' }], formId: '' },
  ];
  const [formFields, setFormFields] = useState<FormFieldsResponse>();
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);

  function toggleTab(tab: number) {
    if (activeTab !== tab) {
      const modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  const validationCreateForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      userId: user?.id || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
    }),
    onSubmit: async (formData) => {
      const response = await createForm(formData);
      if (response.status === CREATED) {
        if (response?.form?.id) {
          setFormId(response.form.id);

          toggleTab(activeTab + 1);
        }
      }
    },
  });
  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid={true}>
          <Breadcrumbs
            title='Formularios'
            breadcrumbItem='Crea Tu Formulario'
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <StepsTab
                    activeTab={activeTab}
                    setActiveTab={toggleTab}
                    passedSteps={passedSteps}
                  />
                  <div className='content clearfix'>
                    <TabContent activeTab={activeTab} className='body'>
                      <TabPane tabId={1}>
                        <TabPaneOne
                          validationCreateForm={validationCreateForm}
                        />
                      </TabPane>
                      <TabPane tabId={2}>
                        <TabPaneTwo
                          formId={formId}
                          questions={questions}
                          setFormFields={setFormFields}
                          toggleTab={toggleTab}
                          activeTab={activeTab}
                        />
                      </TabPane>

                      <TabPane tabId={3}>
                        {formFields ? (
                          <TabThree
                            formFields={formFields}
                            activeTab={activeTab}
                            toggleTab={toggleTab}
                          />
                        ) : null}
                      </TabPane>
                    </TabContent>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormCreate;

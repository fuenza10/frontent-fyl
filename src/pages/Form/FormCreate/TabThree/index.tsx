import { FormFieldsResponse } from '@/src/Interfaces/api/form';
import { CREATED } from '@/src/api/constants/status-response.constant';
import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const TabThree = ({
  formFields,
  activeTab,
  toggleTab,
}: {
  formFields: FormFieldsResponse;
  toggleTab: (tabId: number) => void;
  activeTab: number;
}) => {
  return (
    <React.Fragment>
      <div className='row justify-content-center'>
        <Col lg='6'>
          <div className='text-center'>
            {formFields?.status === CREATED ? (
              <React.Fragment>
                <div className='mb-4'>
                  <i className='mdi mdi-check-circle-outline text-success display-4' />
                </div>
                <div>
                  <h5>Formulario Creado</h5>
                  <p className='text-muted'>
                    Tu formulario ha sido creado exitosamente, puedes verlo en
                    la lista de formularios.
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className='mb-4'>
                  <i className='mdi mdi-close-circle-outline text-danger display-4' />
                </div>
                <div>
                  <h5>Error al crear el Formulario</h5>
                  <p className='text-muted'>
                    Ha ocurrido un error al crear el formulario, por favor
                    intentalo de nuevo.
                  </p>
                </div>
              </React.Fragment>
            )}
          </div>
        </Col>
      </div>
      <div className='wizard clearfix mt-3'>
        <div className='actions clearfix'>
          <ul>
            <li
              className={activeTab === 1 ? 'previous disabled' : 'previous'}
            />
            <li className={'next'}>
              {activeTab === 3 ? (
                <Link
                  to='/form-table'
                  onClick={() => {
                    toggleTab(activeTab + 1);
                  }}
                >
                  Finalizar
                </Link>
              ) : (
                <div />
              )}
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
export default TabThree;

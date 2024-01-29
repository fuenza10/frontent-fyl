import Breadcrumb from '@/src/components/Common/Breadcrumb';
import { Loading } from '@/src/components/Common/Loading/Loading';

import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { columns } from './TableColums';

import TableContainer from '@/src/components/Common/TablePaginated/TableContainer';
import { forms } from '@/src/Interfaces/api/form';
import { findPaginatedForms } from '@/src/api/axios/services/form/get.form';
import { IState } from '@/src/Interfaces';
import { useSelector } from 'react-redux';

TableContainer;
const FormPaginatedTable = () => {
  const { user } = useSelector((state: IState) => ({
    user: state.auth.user,
  }));

  const [forms, setForms] = useState<forms[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function fetchCollaborators() {
      const response = await findPaginatedForms(1, 10, '', user?.id ?? '');

      if (response?.forms) {
        setForms(response.forms);
        ('');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los colaboradores, contacte al administrador',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          showConfirmButton: true,
        });
      }
    }
    fetchCollaborators();
  }, [user?.id]);


  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {isLoading && <Loading />}
          {/* Render Breadcrumb */}
          <Breadcrumb title='Formularios' breadcrumbItem='Mis Formularios' />
          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns(setForms, user?.id ?? '')}
                    data={forms}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className='custom-header-css'
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormPaginatedTable;

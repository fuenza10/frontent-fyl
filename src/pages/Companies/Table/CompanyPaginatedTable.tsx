import Breadcrumb from '@/src/components/Common/Breadcrumb';
import { Loading } from '@/src/components/Common/Loading/Loading';

import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { columns } from './TableColums';
import { ADD_COMPANY } from '@/src/constants/addButtonType';
import { findCompanyPaginated } from '@/src/api/axios/services/company/get.company';
import { Company } from '@/src/Interfaces/api/company';
import TableContainer from '@/src/components/Common/TablePaginated/TableContainer';

TableContainer;
const CompanyPaginatedTable = () => {

  const [companies, setCompanies] = useState<Company[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function fetchCollaborators() {
      const response = await findCompanyPaginated(1, 10, '');

      if (response?.data) {
        setCompanies(response.data);
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
  }, []);
  const handleOrderClicks = () => {
    navigate('/company-create');
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {isLoading && <Loading />}
          {/* Render Breadcrumb */}
          <Breadcrumb
            title='Empresas'
            breadcrumbItem='Empresas Activas'
          />
          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns(setCompanies)}
                    data={companies}
                    isGlobalFilter={true}
                    addButtonType={ADD_COMPANY}
                    handleCompanyClicks={handleOrderClicks}
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

export default CompanyPaginatedTable;

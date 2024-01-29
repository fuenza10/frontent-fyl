import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

// Formik Validation

//redux
import { useSelector } from 'react-redux';

import withRouter from '../../components/Common/withRouter';

//Import Breadcrumb
import Breadcrumb from '../../components/Common/Breadcrumb';

import { IState } from '@/src/Interfaces';
import avatar from '../../assets/images/1.png';

//@ts-ignore
const UserProfile = (props) => {
  const { user } = useSelector((state: IState) => ({
    user: state.auth.user,
  }));

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title='Usuario' breadcrumbItem='Perfil' />

          <Row>
            <Col lg='12'>
              <Card>
                <CardBody>
                  <div className='d-flex'>
                    <div className='ms-3'>
                      <img
                        src={avatar}
                        alt=''
                        className='avatar-md rounded-circle img-thumbnail'
                      />
                    </div>
                    <div className='flex-grow-1 align-self-center'>
                      <div className='text-muted'>
                        <h5>{`${user?.firstName} ${user?.lastName}`}</h5>
                        <p className='mb-1'>{user?.email}</p>
                        <p className='mb-0'>RUT :{user?.rut}</p>
                      </div>
                    </div>
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

export default withRouter(UserProfile);

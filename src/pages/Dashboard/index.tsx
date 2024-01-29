import React, { useEffect, useState } from 'react';
import { Button, Container, Input, Modal, ModalHeader } from 'reactstrap';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {
  updatePassword,
  updateUser,
} from '@/src/api/axios/services/user/patch.user';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/src/Interfaces';
import { AppDispatch } from '@/src/store';
import { firstLoginSuccess } from '@/src/store/auth/authSlice';

//i18n

const Dashboard: React.FC = () => {
  //meta title
  document.title = 'Dashboard';
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: IState) => ({
    user: state.auth.user,
  }));
  const [subscribemodal, setSubscribemodal] = useState(false);
  useEffect(() => {
    if (user?.isFirsLogin) {
      setTimeout(() => {
        setSubscribemodal(true);
      }, 1000);
    }
  }, [user]);
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleFristInit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    await updateUser({ isFirsLogin: false });
    await updatePassword({ newPassword: password }).then((response) => {
      if (!response?.isFirsLogin) {
        notification.success({
          message: 'Contraseña actualizada',
          description: 'Contraseña actualizada correctamente',
        });
        setSubscribemodal(false);
        dispatch(firstLoginSuccess())
      }
    });
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={'Dashboards'} breadcrumbItem={'Dashboard'} />
          {/* subscribe ModalHeader */}
          <Modal
            isOpen={subscribemodal}
            role='dialog'
            autoFocus={true}
            centered
            data-toggle='modal'
            toggle={() => {
              setSubscribemodal(!subscribemodal);
            }}
          >
            <div>
              <ModalHeader
                className='border-bottom-0'
                toggle={() => {
                  setSubscribemodal(!subscribemodal);
                }}
              />
            </div>
            <div className='modal-body'>
              <div className='text-center mb-4'>
                <div className='avatar-md mx-auto mb-4'>
                  <div className='avatar-title bg-light  rounded-circle text-primary h1'>
                    <i className='mdi mdi-key-outline' />
                  </div>
                </div>

                <div className='row justify-content-center'>
                  <div className='col-xl-10'>
                    <h4 className='text-primary'>Bienvenido</h4>
                    <p className='text-muted font-size-14 mb-4'>
                      Por favor, ingresa tu nueva contraseña
                    </p>

                    <div className='input-group rounded bg-light'>
                      <Input
                        type='password'
                        className='form-control bg-transparent border-0'
                        placeholder='ingresa tu nueva contraseña'
                        onChange={onChangePassword}
                      />
                      <Button
                        color='primary'
                        type='button'
                        id='button-addon2'
                        onClick={(e) => handleFristInit(e)}
                      >
                        <i className='bx bxs-paper-plane' />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

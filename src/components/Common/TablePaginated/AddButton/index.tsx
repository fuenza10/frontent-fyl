import {
  ADD_COMPANY,
  ADD_USER,
  ADD_CLIENT,
} from '@/src/constants/addButtonType';
import { Button, Col } from 'reactstrap';

interface AddButtonProps {
  addButtonType: string;
  handleCompanyClicks?: () => void;
  handleUserClick?: () => void;
  handleClientClick?: () => void;

}

const AddButton = ({
  addButtonType,
  handleCompanyClicks,
  handleUserClick,
  handleClientClick,

}: AddButtonProps) => {
  if (addButtonType === ADD_COMPANY) {
    return (
      <Col sm='7'>
        <div className='text-sm-end'>
          <Button
            type='button'
            color='success'
            className='btn-rounded  mb-2 me-2'
            onClick={handleCompanyClicks}
          >
            <i className='mdi mdi-plus me-1' />
            Crear Empresa
          </Button>
        </div>
      </Col>
    );
  }
  if (addButtonType === ADD_USER) {
    return (
      <Col sm='7'>
        <div className='text-sm-end'>
          <Button
            type='button'
            color='primary'
            className='btn mb-2 me-2'
            onClick={handleUserClick}
          >
            <i className='mdi mdi-plus-circle-outline me-1' />
            Crear Usuario
          </Button>
        </div>
      </Col>
    );
  }
  if (addButtonType === ADD_CLIENT) {
    return (
      <Col sm='7'>
        <div className='text-sm-end'>
          <Button
            type='button'
            color='success'
            className='btn-rounded mb-2 me-2'
            onClick={handleClientClick}
          >
            <i className='mdi mdi-plus me-1' />
            Crear Cliente
          </Button>
        </div>
      </Col>
    );
  }
};
export default AddButton;

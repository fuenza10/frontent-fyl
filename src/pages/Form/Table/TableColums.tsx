import { deleteCompany } from '@/src/api/axios/services/company/del.company';
import { findPaginatedForms } from '@/src/api/axios/services/form/get.form';
import {
  BooleanCell,
  StringCellWithBadge
} from '@/src/components/Common/TablePaginated/TypeColumns';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import 'flatpickr/dist/themes/material_blue.css';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import Swal from 'sweetalert2';


type CellProps = {

  value: string;

};


export const columns = (setForms: any, userId: string) => [
  {
    Header: 'Nombre',
    accessor: 'name',
    disableFilters: true,
    Cell: (cellProps: CellProps) => {
      return <StringCellWithBadge {...cellProps} />;
    },
  },

  {
    Header: 'Estado',
    accessor: 'state',
    disableFilters: true,
    Cell: (cellProps: CellProps) => {
      //@ts-ignore
      return <BooleanCell {...cellProps} />;
    },
  },
  // {
  //   Header: 'Fecha Nacimiento',
  //   accessor: 'fechaNacimiento',
  //   disableFilters: true,
  //   Cell: (cellProps) => {
  //     return <DateCell {...cellProps} />;
  //   },
  // },

  // {
  //   Header: "Payment Status",
  //   accessor: "paymentStatus",
  //   disableFilters: true,
  //   Cell: (cellProps) => {
  //     return <PaymentStatus {...cellProps} />;
  //   },
  // },
  // {
  //   Header: "Payment Method",
  //   accessor: "paymentMethod",
  //   disableFilters: true,
  //   Cell: (cellProps) => {
  //     return <PaymentMethod {...cellProps} />;
  //   },
  // },
  // {
  //   Header: 'View Details',
  //   accessor: 'view',
  //   disableFilters: true,
  //   Cell: () => {
  //     return (
  //       <Button
  //         type="button"
  //         color="primary"
  //         className="btn-sm btn-rounded"
  //         onClick={toggleViewModal}
  //       >
  //         View Details
  //       </Button>);
  //   }
  // },
  {
    Header: 'Acciones',
    accessor: 'action',
    disableFilters: true,
    
    Cell: (cellProps: { row: { original: any } }) => {
      return (
        <div className='d-flex gap-3' style={{display:'flex', justifyContent:'center'}}>

          <Link
            to='#'
            className='text-danger'
            onClick={() => {
              const orderData = cellProps.row.original;
              Swal.fire({
                title: '¿Estás seguro de Desactivar el Formulario?',
                text: `Estás a punto de desactivar el formulario ${orderData.name}, ID: ${orderData.id}`,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si!',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await deleteCompany(orderData.id);

                  const response = await findPaginatedForms(1, 10, '', userId);
                  setForms(response.forms);
                  Swal.fire(
                    'Eliminado!',
                    `EL Formulario ${orderData.name}, ID ${orderData.id} ha sido eliminada.`,
                    'success',
                  );
                }
              });
            }}
          >
            <i className='mdi mdi-delete font-size-18' id='deletetooltip' />
            <UncontrolledTooltip placement='top' target='deletetooltip'>
              Eliminar
            </UncontrolledTooltip>
          </Link>
          <Link to='/response-form' state={cellProps.row.original}>
            <i className='mdi mdi-form-select font-size-18' id='edittooltip' />
            <UncontrolledTooltip placement='top' target='edittooltip'>
              Responder
            </UncontrolledTooltip>
          </Link>
        </div>
      );
    },
  },
];

import { UserRole } from '@/src/Interfaces';
import { deleteCompany } from '@/src/api/axios/services/company/del.company';
import { findPaginatedForms } from '@/src/api/axios/services/form/get.form';
import {
  DateCell,
  StringCellWithBadge,
} from '@/src/components/Common/TablePaginated/TypeColumns';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import 'flatpickr/dist/themes/material_blue.css';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import Swal from 'sweetalert2';

type CellProps = {
  value: string;
};

export const columns = (setForms: any, userId: string, userRole: string[]) => [
  {
    Header: 'Nombre',
    accessor: 'forms.name',
    disableFilters: true,
    Cell: (cellProps: CellProps) => {
      return <StringCellWithBadge {...cellProps} />;
    },
  },

  {
    Header: 'Fecha de Respuesta',
    accessor: 'formResponses[0].createdAt',
    disableFilters: true,
    Cell: (cellProps: CellProps) => {
      return <DateCell {...cellProps} />;
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
      function isUser() {
        return userRole.includes(UserRole.USER_ROLE);
      }
      return (
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
          className='d-flex gap-3'
        >
          {isUser() ? (
            <>
              <Link
                to='/form-response-update'
                state={{ ...cellProps.row.original, isUser: isUser() }}
                className='text-success'
                onClick={() => {
                  // const orderData = cellProps.row.original;
                  // handleOrderClick(orderData);
                }}
              >
                <i
                  className='mdi mdi-eye-outline font-size-18'
                  id='edittooltip'
                />
                <UncontrolledTooltip placement='top' target='edittooltip'>
                  Revisar Respuestas
                </UncontrolledTooltip>
              </Link>
            </>
          ) : (
            <>
              <Link
                to='/form-response-update'
                state={cellProps.row.original}
                className='text-success'
                onClick={() => {
                  // const orderData = cellProps.row.original;
                  // handleOrderClick(orderData);
                }}
              >
                <i className='mdi mdi-pencil font-size-18' id='edittooltip' />
                <UncontrolledTooltip placement='top' target='edittooltip'>
                  Editar
                </UncontrolledTooltip>
              </Link>
              <Link
                to='#'
                className='text-danger'
                onClick={() => {
                  const orderData = cellProps.row.original;
                  Swal.fire({
                    title:
                      '¿Estás seguro de Desactivar la  respuesta del formulario?',
                    text: `Estás a punto de desactivar la respuesta ${orderData.name}, ID: ${orderData.id}`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si!',
                    cancelButtonText: 'Cancelar',
                    showCancelButton: true,
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await deleteCompany(orderData.id);

                      const response = await findPaginatedForms(
                        1,
                        10,
                        '',
                        userId,
                      );
                      setForms(response.forms);
                      Swal.fire(
                        'Eliminado!',
                        `El formulario ${orderData.name}, ID ${orderData.id} ha sido eliminado.`,
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
                <i
                  className='mdi mdi-form-select font-size-18'
                  id='edittooltip'
                />
                <UncontrolledTooltip placement='top' target='edittooltip'>
                  Responder
                </UncontrolledTooltip>
              </Link>
            </>
          )}
        </div>
      );
    },
  },
];

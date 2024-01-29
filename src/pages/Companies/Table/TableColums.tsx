import React from 'react';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import 'flatpickr/dist/themes/material_blue.css';
import {
  BooleanCell,
  DateCell,
  StringCell,
  StringCellWithBadge,
} from '@/src/components/Common/TablePaginated/TypeColumns';
import { deleteCompany } from '@/src/api/axios/services/company/del.company';
import { findCompanyPaginated } from '@/src/api/axios/services/company/get.company';

// import {
//   deleteCollaborator,
//   egresoCollaborator,
//   getActiveCollaborator,
// } from '@/helpers/Actions/Collaborators';
type CellProps = {
  // Define the properties that StringCellWithBadge expects here
  // For example:
  value: string;
  // Add more properties as needed
};


export const columns = (setCompanies: any) => [
  {
    Header: 'RUT',
    accessor: 'rut',
    disableFilters: true,
    Cell: (cellProps: CellProps) => {
      return <StringCell {...cellProps} />;
    },
  },
  {
    Header: 'Nombre',
    accessor: 'name',
    disableFilters: true,
    Cell: (cellProps: CellProps) => {
      return <StringCellWithBadge {...cellProps} />;
    },
  },
  {
    Header: 'Direccion',
    accessor: 'address',
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
    Header: 'Action',
    accessor: 'action',
    disableFilters: true,
    
    Cell: (cellProps: { row: { original: any } }) => {
      return (
        <div className='d-flex gap-3'>
          <Link
            to='/company-update-1'
            state={cellProps.row.original}
            className='text-success'
            onClick={() => {
              // const orderData = cellProps.row.original;
              // handleOrderClick(orderData);
            }}
          >
            <i className='mdi mdi-pencil font-size-18' id='edittooltip' />
            <UncontrolledTooltip placement='top' target='edittooltip'>
              Edit
            </UncontrolledTooltip>
          </Link>
          <Link
            to='#'
            className='text-danger'
            onClick={() => {
              const orderData = cellProps.row.original;

              Swal.fire({
                title: '¿Estás seguro de Desactivar la  Compañia?',
                text: `Estás a punto de desactivar a la compañía ${orderData.name}, ID: ${orderData.id}`,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si!',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await deleteCompany(orderData.id);

                  const response = await findCompanyPaginated(1, 10, '');
                  setCompanies(response.data);
                  Swal.fire(
                    'Eliminada!',
                    `La empresa ${orderData.name}, ID ${orderData.id} ha sido eliminada.`,
                    'success',
                  );
                }
              });
            }}
          >
            <i className='mdi mdi-delete font-size-18' id='deletetooltip' />
            <UncontrolledTooltip placement='top' target='deletetooltip'>
              Delete
            </UncontrolledTooltip>
          </Link>
        </div>
      );
    },
  },
];

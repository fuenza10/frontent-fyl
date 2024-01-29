// @ts-nocheck
import React, { Fragment } from 'react';

import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input } from 'reactstrap';
import { Filter, DefaultColumnFilter } from '../filters';
import AddButton from './AddButton';

// Define a default UI for filtering
// @ts-ignore
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col sm={4}>
      <div className='search-box me-2 mb-2 d-inline-block'>
        <div className='position-relative'>
          <label htmlFor='search-bar-0' className='search-label'>
            <span id='search-bar-0-label' className='sr-only'>
              Buscar
            </span>
            <input
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              id='search-bar-0'
              type='text'
              className='form-control'
              placeholder={`${count} ...`}
              value={value || ''}
            />
          </label>
          <i className='bx bx-search-alt search-icon' />
        </div>
      </div>
    </Col>
  );
}
interface TableContainerProps {
  columns: any;
  data: any;
  isGlobalFilter?: boolean;
  isAddOptions?: boolean;
  isAddUserList?: boolean;
  handleCompanyClicks?: any;
  handleUserClick?: any;
  handleClientClick?: any;
  isAddCustList?: boolean;
  customPageSize?: number;
  addButtonType?: string;
  className?: string;

  customPageSizeOptions?: any;
}
const TableContainer: React.FC<TableContainerProps> = ({
  columns,
  data,
  isAddOptions,
  isGlobalFilter,
  isAddUserList,
  handleCompanyClicks,
  handleUserClick,
  handleClientClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
  addButtonType,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };
  return (
    <Fragment>
      <Row className='mb-2'>
        <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className='form-select'
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Ver {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}

        <AddButton
          addButtonType={addButtonType}
          handleCompanyClicks={handleCompanyClicks}
          handleUserClick={handleUserClick}
          handleClientClick={handleClientClick}
        />
      </Row>

      <div className='table-responsive react-table'>
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className='table-light table-nowrap'>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <div className='mb-2' {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className='justify-content-md-end justify-content-center align-items-center'>
        <Col className='col-md-auto'>
          <div className='d-flex gap-1'>
            <Button
              color='primary'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </Button>
            <Button
              color='primary'
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {'<'}
            </Button>
          </div>
        </Col>
        <Col className='col-md-auto d-none d-md-block'>
          Pag{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </Col>
        <Col className='col-md-auto'>
          <Input
            type='number'
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className='col-md-auto'>
          <div className='d-flex gap-1'>
            <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
              {'>'}
            </Button>
            <Button
              color='primary'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};



export default TableContainer;

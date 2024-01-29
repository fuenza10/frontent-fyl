//@ts-nocheck

const convertDate = (date: string) => {
  const date1 = new Date(date);
  date1.setHours(24, 0, 0, 0);
  let dd = date1.getDate();
  let mm = date1.getMonth() + 1;
  const yyyy = date1.getFullYear();
  if (dd < 10) {
   
    dd = '0' + dd;
  }
  if (mm < 10) {
   
    mm = '0' + mm;
  }
 
  return dd + '/' + mm + '/' + yyyy;
};

const DateCell = (cell: { value: string }) => {
  return cell.value ? convertDate(cell.value) : '';
};


const StringCell = (cell: { value: any }) => {
  return cell.value ? cell.value : '';
};
const StringCellWithBadge = (cell: { value: string }) => {
  return cell.value ? cell.value.replace(/_/g, ' ') : '';
};

const BooleanCell = (cell: { value: boolean }) => {
  return cell.value ? 'Activo' : 'Inactivo';
}

export { DateCell, StringCell, StringCellWithBadge, BooleanCell };

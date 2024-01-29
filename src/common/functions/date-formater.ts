import moment from "moment";

export const formateDate = (date: string, format?: string) => {
    
    const dateFormat = format ? format : "DD/MM/YYYY";
    const newDate = new Date(date);
    const date1 = moment(new Date(newDate)).format(dateFormat);
    return date1;
};
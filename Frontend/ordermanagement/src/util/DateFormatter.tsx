import {format} from 'date-fns';
import { Date_Format, Date_Format_Date_Picker } from '../types/Constants';

export function formatDate(date: Date) {
    if(!date)
        return format(new Date(), Date_Format);
    return format(date, Date_Format);
}
export function formatDatePicker(date: Date) {
    if(!date)
        return format(new Date(), Date_Format_Date_Picker);
    return format(date, Date_Format_Date_Picker);
}
import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import moment from 'moment';
import FormInput from '../FormInput';
import {
    DatePicker as MaterialDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface DatePickerProps {
    [type: string]: any;
}

export default function DatePicker(props: DatePickerProps) {
    let { format = 'dd-mm-yyyy', minYear = null, yearsOnly = false, value, onChange, ...otherProps } = props;
    let givenValue = value;

    if (yearsOnly) {
        otherProps.views = ["year"];
        format = 'yyyy';

        if (minYear) {
            otherProps.minDate = (new Date).setFullYear(minYear);
        }

        if (givenValue) {
            givenValue = (new Date).setFullYear(givenValue);
        }

    } else if (givenValue) {
        givenValue = moment(givenValue, format.toUpperCase()).toDate();
    }

    const [selectedDate, handleDateChange] = React.useState([undefined, null, ''].includes(givenValue) ? new Date() : givenValue);

    const onDateSelection = (date: MaterialUiPickersDate) => {
        handleDateChange(date);
        onChange && onChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MaterialDatePicker
                TextFieldComponent={(FormInput as any)}
                value={selectedDate}
                animateYearScrolling
                autoOk
                {...otherProps}
                format={format.replace(/m/g, 'M')}
                onChange={onDateSelection} />
        </MuiPickersUtilsProvider>
    );
}
// eslint-disable-next-line import/no-duplicates
import 'date-fns';
// eslint-disable-next-line import/no-duplicates
import dateFns from 'date-fns/locale/pt-BR';
import React, { useCallback } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';

type DateFieldProps = {
  onChange: (value: ParsableDate) => void;
} & Omit<KeyboardDateTimePickerProps, 'onChange'>;

const DatePicker: React.FC<DateFieldProps> = ({ onChange, ...rest }) => {
  const handleOnChange = useCallback(
    (date: MaterialUiPickersDate | null, _?: string | null) => {
      if (onChange) {
        onChange(date);
      }
    },
    [onChange],
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateFns}>
      <KeyboardDateTimePicker
        margin="normal"
        fullWidth
        inputVariant="outlined"
        color="primary"
        invalidDateMessage="Data inválida"
        maxDateMessage="A data não deve ser futura"
        minDateMessage="A data não deve ser passada"
        variant="dialog"
        onChange={handleOnChange}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;

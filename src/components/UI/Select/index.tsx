import React, { useRef } from 'react';

import MdSelect, {
  SelectProps as MdSelectProps,
} from '@material-ui/core/Select';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import useStyles from './styles';

type SelectProps = {
  label: string;
  options: {
    name: string;
    value?: string;
  }[];
} & MdSelectProps;

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  required,
  value,
  ...rest
}) => {
  const classes = useStyles();
  const inputLabel = useRef<HTMLLabelElement>(null);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      className={classes.formControl}
      margin="normal"
      required={required}
    >
      <InputLabel ref={inputLabel} aria-label={label}>
        {label}
      </InputLabel>
      <MdSelect
        aria-label={label}
        native
        name={name}
        label={label}
        fullWidth
        value={value}
        {...rest}
      >
        <option aria-label="none" value="" />
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.name}
          </option>
        ))}
      </MdSelect>
    </FormControl>
  );
};

export default Select;

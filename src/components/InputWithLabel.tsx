import React from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import PrimaryButton from "./PrimaryButton";

const useStyles = makeStyles({
  inputLabel:{
    fontSize: '14px',
    color: 'var(--darkBlue)',
    fontWeight: 500,
    paddingBottom: '10px',
  },
  inputStyle:{
    '& > div':{
        maxHeight: '44px',
        height: '44px',
    },
    '& fieldset':{
        borderColor: '#8D8D8D',
    }
  },
  formControl:{
    margin: '6px 0px !important'
  }
});


interface InputWithLabelProps{
    labelText: string;
    placeholderText: string;
    inputOnChange: () => void;
    helperText?: string;
}

const InputWithLabel = (props:InputWithLabelProps) => {
  const classes = useStyles();

  return (
    <>
    <FormControl fullWidth className={classes.formControl}>
      <label className={classes.inputLabel} htmlFor="">{props.labelText}</label>
      <TextField fullWidth label="" placeholder={props.placeholderText} className={classes.inputStyle} onChange={props.inputOnChange} />
      {/* <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText> */}
    </FormControl>
    </>
  );
};

export default InputWithLabel;

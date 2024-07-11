import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import PrimaryButton from "./PrimaryButton";
import { InputAdornment } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles({
    inputLabel: {
      fontSize: "14px",
      color: "var(--darkBlue)",
      fontWeight: 500,
      paddingBottom: "10px",
    },
    inputStyle: {
      "& > div": {
        maxHeight: "44px",
        height: '44px',
      },
      "& fieldset": {
        borderColor: "#8D8D8D",
      },
    },
    formControl:{
    margin: '6px 0px !important'
    }
  });

interface PasswordInputProps{
    labelText: string;
    placeholderText: string;
    inputOnChange: () => void;
}

const PasswordInput = (props:PasswordInputProps) => {
    const classes = useStyles();
    const [showText, setShowText] = useState(false)
  return (
    <>
      <FormControl fullWidth className={classes.formControl}>
        <label className={classes.inputLabel} htmlFor="">
         {props.labelText}
        </label>
        <TextField
        fullWidth
          label=""
          className={classes.inputStyle}
          type={showText ? "text" : "password"}
          placeholder={props.placeholderText}
          onChange={props.inputOnChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{cursor: 'pointer'}} onClick={() => setShowText(!showText)}>
                {/* <VisibilityOffIcon /> */}
                <img src={
                process.env.PUBLIC_URL + "/assets/icons/password-hide.svg"
              } alt="" /> 
              </InputAdornment>
            ),
          }}
        />
        {/* <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText> */}
      </FormControl>
    </>
  )
}

export default PasswordInput
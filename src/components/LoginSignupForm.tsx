import React from "react";
import { Box } from "@mui/material";
import InputWithLabel from "./InputWithLabel";
import PrimaryButton from "./PrimaryButton";
import PasswordInput from "./PasswordInput";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/system/Unstable_Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  formWrapper: {
    width: "65%",
    margin: "auto",
  },
  formSlider: {
    backgroundColor: "var(--bg-secondary)",
  },
  pageHeadingText:{

  },
  pageSubText:{
    fontSize: '15px',
    color: '#212736',
  }
});

const handleAction = () => {};
const handleEmailChange = () => {};

const LoginSignupForm = () => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <Box className={classes.formWrapper}>
          <h1 className={classes.pageHeadingText}>Log in</h1>
          <p className={classes.pageSubText}>Don’t have an account? <Link to='/sign-up'>Create one</Link> </p>
            <Box>
              <InputWithLabel
                labelText="Email"
                placeholderText="Email"
                inputOnChange={handleEmailChange}
              />
            </Box>
            <Box>
              <PasswordInput
                labelText="Password"
                placeholderText="Password"
                inputOnChange={handleEmailChange}
              />
            </Box>
            <Box sx={{margin: '15px 0px'}}>
            <PrimaryButton
              btnText="Log in"
              handleAction={handleAction}
              btnWidth="full"
              />
              </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={6}>
          <Box className={classes.formSlider}>
            <h1>xs=4</h1>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginSignupForm;

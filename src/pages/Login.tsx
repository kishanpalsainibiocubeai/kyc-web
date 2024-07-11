import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/system/Unstable_Grid";
import { Link } from "react-router-dom";
import InputWithLabel from "../components/InputWithLabel";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import LoginSignupSlider from "../components/LoginSignupSlider";

const useStyles = makeStyles({
    logo:{
        position: 'fixed',
        left: '14px',
        top: '14px',
    },
  formWrapper: {
    width: "65%",
    margin: "auto",
    paddingTop: '100px',
    "& a": {
      color: "#1764FF",
      fontSize: "15px",
    },
  },
  formSlider: {
    backgroundColor: "var(--bg-secondary)",
    minHeight: '100vh',
    height: '100%',
    paddingTop: '80px',
  },
  pageHeadingText: {
    margin: "8px 0px",
  },
  pageSubText: {
    marginTop: "8px",
    fontSize: "15px",
    color: "#212736",
  },
  otherLoginOptionWrap: {
    border: '1px solid #E1E5EA',
    borderRadius: '84px',
    textAlign: 'center',
    padding: '8px 15px',
    margin: '30px 0px',
    '& p':{
        fontSize: '14px',
        color: '#373D4D',

    },
    '& img':{
        transform: 'translate(-4px, 2px)',
    },
  },
  sliderBrief:{
    width: "60%",
    textAlign: 'center',
    margin: '20px auto',
    '& img':{
        transform: 'translate(-4px, 6px)',
    },
    '& p':{
        color: "var(--textGrey)",
        fontSize: '14px'
    }
  },
  loginSignupFooter:{
    marginTop: '100px',
    marginBottom: '20px',
    '& span':{
        fontSize: '14px',
        color: '#000000',
        padding: '0px 10px',
    }
  }
});

const handleAction = () => {};
const handleEmailChange = () => {};

const Login = () => {
  const classes = useStyles();
  return (
    <Box sx={{ overflow: "hidden" }}>
    <img className={classes.logo} src={process.env.PUBLIC_URL + "/assets/icons/logo.svg"} alt="" /> 
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} sx={{ p: "0" }}>
          <Box className={classes.formWrapper}>
            <h1 className={classes.pageHeadingText}>Log in</h1>
            <p className={classes.pageSubText}>
              Don’t have an account? <Link to="/signup">Create one</Link>{" "}
            </p>
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
            <Box sx={{ margin: "15px 0px" }}>
              <PrimaryButton
                btnText="Log in"
                handleAction={handleAction}
                btnWidth="full"
              />
            </Box>
            <Box>
              <Box sx={{ textAlign: "center" }}>
                <Link to="/forget-password">Forgot password?</Link>
              </Box>
              <Box className={classes.otherLoginOptionWrap}>
                <Typography component="p">
                    <img src={
                process.env.PUBLIC_URL + "/assets/icons/sso-icon.svg"
              } alt="" /> 
              Use single sign-on (SSO)</Typography>
              </Box>
              <Box className={classes.otherLoginOptionWrap}>
                <Typography component="p">
                    <img src={
                process.env.PUBLIC_URL + "/assets/icons/google-icon.svg"
              } alt="" /> 
                  Sign in with a corporate Google account
                </Typography>
              </Box>
            </Box>
            <Box className={classes.loginSignupFooter}>
              <span>© 2024 Biocube.Ai</span>
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} sx={{ p: "0" }}>
          <Box className={classes.formSlider}>
            <LoginSignupSlider />
            <Box className={classes.sliderBrief}>
              <Typography component="p">
                <img src={
                process.env.PUBLIC_URL + "/assets/icons/identity-verification.svg"
              } alt="" />
                <b style={{fontWeight: 600}}>Identity Verification:</b> Verify good users and stop bad
                ones in seconds.
              </Typography>
              <Typography component="p">
                <img src={
                process.env.PUBLIC_URL + "/assets/icons/face-verification.svg"
              } alt="" />
                <b style={{fontWeight: 600}}>Face Verification:</b> Ensure a person is present and their face matches the image on the provided ID.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

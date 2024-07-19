import React from 'react'
import { Box, Button, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cmpWrapper: {
    padding: "10px 24px",
    backgroundColor: "#fff",
    textAlign: "center",
    "& > button": {
      textTransform: "capitalize",
      fontWeight: 600,
      textAlign: "center",
      justifyContent: "center",
      background: 'none !important',
    },
    "& h2": {
      marginBottom: "0px",
      fontWeight: 600,
    },
    '& p':{
        color: '#6C6C6C',
        fontSize: '14px',
        fontWeight: 500,
    }
  },
  imgWrapper: {
    backgroundColor: "#F6F8FF",
    padding: "30px 0px",
    position: "relative",
  },
  loadingWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "8px",
    border: "1px solid #00000040",
    borderRadius: "50%",
    display: 'flex',
    '& > span':{
        width: '28px !important',
        height: '28px !important',
    }
  },
});

interface IKycProcessMobileProps {
    handleClose: () => void;
}

const KycProcessMobile = (props:IKycProcessMobileProps) => {
    const classes = useStyles();
  return (
    <Box className={classes.cmpWrapper}>
        <Box>
            <h2>Verification in process  on another device</h2>
            <p>IOS Apple iphone • India  •  Lat-long 14.99.62.30 </p>
        </Box>
        <Box className={classes.imgWrapper}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/kyc-mobile-device.svg"
                    }
                    alt=""
                  />
                  <Box className={classes.loadingWrapper}>
                    <CircularProgress />
                  </Box>
        </Box>
        
        <Button variant="text" onClick={props.handleClose} sx={{pt:3, my: 3,}}>
                  Cancel
                </Button>
    </Box>
  )
}

export default KycProcessMobile
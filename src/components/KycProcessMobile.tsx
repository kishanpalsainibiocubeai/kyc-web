import React from 'react'
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    cmpWrapper:{
        padding: '10px 24px',
        backgroundColor: '#fff',
        textAlign: 'center',
    }
})

const KycProcessMobile = () => {
    const classes = useStyles();
  return (
    <Box className={classes.cmpWrapper}>
        <Box>
            <h2>Verification in process  on another device</h2>
            <p>IOS Apple iphone • India  •  Lat-long 14.99.62.30 </p>
        </Box>
        <Box>

        </Box>
    </Box>
  )
}

export default KycProcessMobile
import React from 'react'
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowDownToLine, Link } from 'lucide-react';


const useStyles = makeStyles({
    reportWrapper:{
        position: 'fixed',
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
        background: '#ddd',
        zIndex: '5',
    },
    reportTopbar:{
        backgroundColor: '#fff',
    },
    topbarActionWrap:{
        display: 'flex',
        color: '#465679',
        alignItems: 'center',
        gap: '30px',
        justifyContent: 'flex-end',
    },
    topbarIconBox:{

    }
})


const Report = () => {
    const classes = useStyles();
  return (
    <Box className={classes.reportWrapper}>
      <Box className={classes.reportTopbar}>
        <Grid container>
          <Grid item md={4} sm={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/logo-mobile.svg"
                  }
                  alt=""
                />
              </Box>
              <h3>[Applicant Name] [ID:XXXXXXX]</h3>
            </Box>
          </Grid>
          <Grid item md={8} sm={12}>
            <Box className={classes.topbarActionWrap}>
              <Box className={classes.topbarIconBox}>
                <Link />
              </Box>
              <Box className={classes.topbarIconBox}>
                <ArrowDownToLine />
              </Box>
              <Box>
                <p>Get Help</p>
              </Box>
              <Box>
                <p>Exit</p>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      Report
    </Box>
  );
}

export default Report
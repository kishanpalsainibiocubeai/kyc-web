import React from 'react'
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Menu } from 'lucide-react';


const useStyles = makeStyles({
    cmpWrapper:{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        left: '0px',
        right: '0px',
        padding: '10px 24px',
        backgroundColor: '#fff',
    }
})

const TopbarMobile = () => {
    const classes = useStyles();

  return (
    <Box className={classes.cmpWrapper}>
        <Box>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/logo-mobile.svg"
                    }
                    alt=""
                  />
        </Box>
        <Box><Menu /></Box>
    </Box>
  )
}

export default TopbarMobile
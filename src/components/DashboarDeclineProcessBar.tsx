import React, { useState, useEffect } from 'react'
import Grid from "@mui/material/Grid";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    cmpWrap:{
        '& p':{
            color: '#09142F',
            fontSize: "15px",
            fontWeight: 500,
            margin: '6px 0px',
        }
    }
})

interface IDashboarDeclineProcessBar {
    barColor:string;
    barBgColor:string;
    value:number;
    barLabel:string;
  }

const DashboarDeclineProcessBar = (props:IDashboarDeclineProcessBar) => {
    const classes = useStyles();
    
const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
    //   backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    backgroundColor: props.barBgColor
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
    //   backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    backgroundColor: props.barColor
    },
  }));
  return (
    <>
    <Grid container spacing={2} className={classes.cmpWrap}>
      <Grid item xs={12} sm={5}>
        <Box>
          <p>{props.barLabel}</p>
        </Box>
      </Grid>
      <Grid item xs={12} sm={7} sx={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{fontSize: '12px', fontWeight: 500, color: '#09142F'}}>{props.value}%</span>
        <Box sx={{ width: "100%",}}>
        <BorderLinearProgress variant="determinate" value={props.value} />
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default DashboarDeclineProcessBar
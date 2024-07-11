import React from 'react'
import { makeStyles } from "@mui/styles";
import { Box } from '@mui/material';

const useStyles = makeStyles({
    cardWrapper:{
        minWidth: '210px',
        width: '100%',
        background: '#FFFFFF',
        padding: '16px',
        borderRadius: '4px',
        transition: 'all ease-in-out 0.3s',
        '&:hover':{
            boxShadow: '4px 8px 32px 0px #00000024',
        },
        '& h1':{
            fontSize: '26px',
            fontWeight: 600,
            color: '#454545',
            margin: '0px',
            marginBottom: '28px',
        },
        '& h4':{
            fontSize: '15px',
            fontWeight: 500,
            color: '#09142F',
            margin: '0px',
        },
        '& p':{
            fontSize: '11px',
            fontWeight: 600,
            color: '#2EA76D',
            margin: '0px',
        }
    }
})

interface IDashboardCard {
    mainHeading: string;
    subHeading: string;
    cardIcon: string;
    arrowIcon: string;
    showPercentage: string;
  }

const DashboardCard = (props:IDashboardCard) => {
    const classes = useStyles();
  return (
    <Box className={classes.cardWrapper}>
      <h1>{props.mainHeading}</h1>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <h4>{props.subHeading}</h4>
          <Box sx={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            <img src={props.arrowIcon} alt="" />
            <p>{props.showPercentage}</p>
          </Box>
        </Box>
        <Box>
        <img src={props.cardIcon} alt="" />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardCard
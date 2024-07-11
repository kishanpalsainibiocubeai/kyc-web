import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    logo:{
        position: 'fixed',
        left: '14px',
        top: '14px',
    },
    menuItemWrapper:{
        padding: '50px 0px',
        '& li':{
            listStyleType: 'none',
            padding: '16px 18px',
        }
    },
})

const Sidebar = () => {
    const classes = useStyles();
  return (
    <>
        <ul className={classes.menuItemWrapper}>
        <img className={classes.logo} src={process.env.PUBLIC_URL + "/assets/icons/logo.svg"} alt="" /> 
            <li>
                <Link  to="/">
                <img src={process.env.PUBLIC_URL + "/assets/icons/dashboard-icon.svg"} alt="" />
                </Link>
            </li>
            <li>
                <Link  to="/dashboard">
                <img src={process.env.PUBLIC_URL + "/assets/icons/users-icon.svg"} alt="" />
                </Link>
            </li>
            <li>
                <Link  to="/dashboard">
                <img src={process.env.PUBLIC_URL + "/assets/icons/credit-card.svg"} alt="" />
                </Link>
            </li>
            <li>
                <Link  to="/dashboard">
                <img src={process.env.PUBLIC_URL + "/assets/icons/combine.svg"} alt="" />
                </Link>
            </li>
            <li>
                <Link  to="/dashboard">
                <img src={process.env.PUBLIC_URL + "/assets/icons/bolt.svg"} alt="" />
                </Link>
            </li>
        </ul>
    </>
  )
}

export default Sidebar
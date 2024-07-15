import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  btnWrapper: {
    // "& button": {
      backgroundColor: "var(--take-action)",
      color: "var(--color-white)",
      border: "none",
      padding: "10px 15px",
      borderRadius: "34px",
      fontWeight: 600,
    // },
  },
});

type btnWidthFixed = "full" | "auto";

interface PrimaryButtonProps {
  btnText: string;
  handleAction: () => void;
  btnWidth?: btnWidthFixed;
  btnIcon?: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const classes = useStyles();
  return (
    <>
      
      <button
        style={{ width: `${props.btnWidth === "full" ? "100%" : "auto"}`, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
        onClick={props.handleAction}
        className={classes.btnWrapper}
      >
       {props.btnIcon ? (<img src={props.btnIcon} alt="" />) : ''} {props.btnText}
      </button>
    </>
  );
};

export default PrimaryButton;

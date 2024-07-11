import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  btnWrapper: {
    "& button": {
      backgroundColor: "var(--take-action)",
      color: "var(--color-white)",
      border: "none",
      padding: "10px 15px",
      borderRadius: "34px",
      fontWeight: 600,
    },
  },
});

type btnWidthFixed = "full" | "auto";

interface PrimaryButtonProps {
  btnText: string;
  handleAction: () => void;
  btnWidth?: btnWidthFixed;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.btnWrapper}>
      <button style={{width: `${props.btnWidth === 'full'? '100%' : 'auto'}`}}>{props.btnText}</button>
    </Box>
  );
};

export default PrimaryButton;

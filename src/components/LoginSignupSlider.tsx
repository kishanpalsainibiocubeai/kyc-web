import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@mui/styles";
import { Box, Typography, colors } from "@mui/material";
import { Opacity } from "@mui/icons-material";

const useStyles = makeStyles({
  slideWrapper: {
    position: "relative",
    "& .slick-dots": {
      bottom: "96px",
      zIndex: 1,
    },
    "& .slick-dots li, .slick-dots li button": {
      width: "90px",
    },
    "& .slick-dots li button:before": {
      content: "' '",
      height: "5px",
      width: "80px",
      borderRadius: "40px",
      backgroundColor: "#02091A",
    },
    "& .slick-dots li.slick-active button:before": {
      opacity: 1,
      background: "linear-gradient(to right, #000 80%, #c0c1c6 25%)",
    },
    '& .slick-prev, .slick-next':{
        display: 'none !important',
    }
  },
  singleSlide:{
    position: "relative",
  },
  imgWrap: {
    "& img": {
      margin: "auto",
    },
  },
  cardContent: {
    position: "absolute",
    bottom: "0px",
    left: "50%",
    transform: "translate(-50%, 10px)",
    background: "#fff",
    padding: "20px 30px",
    borderRadius: "14px",
    width: "65%",
    textAlign: "center",
    paddingTop: "50px",
    "& p": {
      fontSize: "14px",
      fontWeight: 500,
      color: "#383434",
    },
  },
});

const LoginSignupSlider = () => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className={classes.slideWrapper}>
      <Slider {...settings}>
        <Box className={classes.singleSlide}>
          <Box className={classes.imgWrap}>
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/login-slider-img-1.svg"
              }
              alt=""
            />
          </Box>
          <Box className={classes.cardContent}>
            <Typography component="h2">Face verification</Typography>
            <Typography component="p">
              Result in sec • 99% Accuracy • Account cloning detection
            </Typography>
          </Box>
        </Box>
        <Box className={classes.singleSlide}>
          <Box className={classes.imgWrap}>
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/login-slider-img-1.svg"
              }
              alt=""
            />
          </Box>
          <Box className={classes.cardContent}>
            <Typography component="h2">ID Verification</Typography>
            <Typography component="p">
              Result in sec • 99% Accuracy • Account cloning detection
            </Typography>
          </Box>
        </Box>
        <Box className={classes.singleSlide}>
          <Box className={classes.imgWrap}>
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/login-slider-img-1.svg"
              }
              alt=""
            />
          </Box>
          <Box className={classes.cardContent}>
            <Typography component="h2">ID Verification</Typography>
            <Typography component="p">
              Result in sec • 99% Accuracy • Account cloning detection
            </Typography>
          </Box>
        </Box>
      </Slider>
    </div>
  );
};

export default LoginSignupSlider;

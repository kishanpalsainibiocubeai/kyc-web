import React, { useState, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import PrimaryButton from "../components/PrimaryButton";
import { Divider } from "@mui/material";
import { Copy, Loader } from "lucide-react";
import Select from "react-select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import zIndex from "@mui/material/styles/zIndex";
import WebcamCapture from "../components/WebcamCapture";
import InputWithLabel from "../components/InputWithLabel";
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const enumKycSelected = {
  basic: "basic",
  detailed: "detailed",
};

const useStyles = makeStyles({
  kycNeedHelpBox: {
    backgroundColor: "#F6F8FF",
    marginTop: "-20px",
    // marginbottom: '-20px',
    marginLeft: "-24px",
    height: "calc(100% + 38px)",
    padding: "20px 24px",
    paddingTop: "60px",
    position: "relative",
    "& button": {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      color: "#1664FF",
      fontSize: "16px",
      fontWeight: 600,
      textTransform: "capitalize",
    },
    "@media (max-width:992px)": {
      display: "none",
    },
  },
  docIdentity:{
    display: "block !important",
    "@media (max-width:600px)": {
      display: "block !important",
      width: '100%',
      padding: '15px',
      margin: '0px',
      textAlign: 'center',
      height: 'auto',
      marginBottom: '15px',
      '& img':{
        width: '50%'
      },
      "& button": {
        display: 'none',
      },
    },
  },
  kycNeedBtn:{
    '&.MuiButtonBase-root':{
      display: 'none',
      "@media (max-width:600px)": {
      display: 'block',
        color: "#1664FF",
        fontSize: "16px",
        fontWeight: 600,
        textTransform: "capitalize",
        margin: 'auto',
      }
    }
  },
  flowHeadingWrapper: {
    "& h2": {
      fontSize: "24px",
      fontWeight: 600,
      color: "#000000",
      marginBottom: "0px",
      marginTop: "10px",
    "@media (max-width:600px)": {
      fontSize: "20px !important",
    },
    },
    "& p": {
      marginTop: "0px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#6C6C6C",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
  },
  docScanHeadingWrapper:{
    '& h2':{
      fontSize: "14px !important",
      position: 'relative',
      zIndex: 2,
      "@media (max-width:600px)": {
        display: 'flex',
      justifyContent: 'space-between',
      },
    },
    "@media (max-width:600px)": {
      paddingTop: '20px',
      '& h2::after':{
        content: "'Document back'",
        color: '#6C6C6C',
        opacity: '1',
      },
      '& h2::before':{
        content: "' '",
        position: 'absolute',
        left: '113px',
        right: '115px',
        top: '10px',
        border: '1px dashed #6C6C6C',
        zindex: '0',
      },
      '&::before':{
        content: "' '",
        border: '8px solid #F6F8FF',
        position: 'absolute',
        left: '0px',
        right: '0px',
        top: '50px',
      }
    },
    '& p':{
      fontWeight: 400,
      color: '#000000',
      "@media (max-width:600px)": { 
        color: '#6C6C6C',
        fontSize: '12px',
      }
    },
  },
  removeBeforeAfterProfile:{
    "@media (max-width:600px)": {
      paddingTop: '20px',
      '& h2::after':{
        // content: " ",
        display: 'none'
      },
      '& h2::before':{
        // content: "' '",
        display: 'none'
      },
      '&::before':{
        content: "' '",
        border: '8px solid #F6F8FF',
        position: 'absolute',
        left: '0px',
        right: '0px',
        top: '50px',
      }
    },
  },
  imgWrapper: {
    width: '100%',
  },
  barcodeWrapper: {
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#E6E9F6",
    textAlign: 'right',
  },
  selectKYCWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ADADAD",
    padding: "14px 18px",
    margin: "15px 0px",
    cursor: "pointer",
    borderRadius: "4px",
    "& h4": {
      margin: "0px",
    },
    "& span": {
      fontSize: "12px",
      color: "#000000",
    },
  },
  kycFlowBtnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "30px",
    marginTop: "25px",
    "& button": {
      textTransform: "capitalize",
      fontWeight: 600,
      textAlign: 'center',
      justifyContent: 'center',
  // kycNeedBtn:{
  //   '&.MuiButtonBase-root':{
  //     display: 'none',
  //     "@media (max-width:600px)": {
  //     display: 'block',
  //       color: "#1664FF",
  //       fontSize: "16px",
  //       fontWeight: 600,
  //       textTransform: "capitalize",
  //       margin: 'auto',
  //     }
  //   }
  // },
    },
    "@media (max-width:600px)": {
      flexDirection: 'column-reverse',
    }
    
  },
  divider: {
    fontSize: "14px",
    "&::before,&::after": {
      content: "' '",
      borderTop: "thin dashed rgba(0, 0, 0, 0.12) !important",
    },
  },
  copyToClipboard: {
    padding: "7px 10px",
    borderRadius: "5px",
    backgroundColor: "#F5F5F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& span": {
      fontSize: "12px",
      color: "#000000",
    },
    "& svg": {
      cursor: "pointer",
    },
  },
  selectDocRadio: {
    fontSize: "14px !important",
    color: "#000000 !important",
    fontWeight: "600 !important",
  },
  selectDocRadioWrapper: {
    "& span.MuiTypography-root": {
      fontSize: "12px !important",
      color: "#343434 !important",
    },
    "@media (max-width:600px)": {
      flexDirection: 'column !important',
      '& > label':{
        borderBottom: '1px solid #e6e6e6',
      }
    }
  },
  selectWrapper: {
    "& label": {
      color: "#343434",
      fontSize: "14px",
      marginBottom: "6px",
      display: "inline-block",
      "@media (max-width:600px)": {
        display: 'none',
      }
    },
  },
  flowStepper: {
    "& .stepLine":{
        position: 'relative',
    },
    "& .stepLine::before": {
      content: "' '",
      width: "35px",
      backgroundColor: "#2A3FDF",
      position: "absolute",
      height: "2px",
      right: "-35px",
    //   zIndex: 1,
    },
    "@media (max-width:600px)": {
      position: 'fixed',
      top: '0px',
      left: '0px',
      right: '0px',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '30px',
      backgroundColor:'#fff',
      padding: '8px',
      "& .stepLine":{
        borderRadius: '50%',
        width: '32px',
        height: '32px',
      },
    },
  },
  imgCaptureWrapper:{
    '& video':{
      borderRadius: '6px'
    }
  },
  detailsExtractFromWrapper:{
    '& label':{
      paddingBottom: '5px',
      color: '#343434',
      fontSize: '14px',
      fontWeight: 400,
    },
    '& fieldset':{
      borderRadius: '12px'
    },
    '& input::placeholder': {
      fontSize: '14px',
    }
  }
});

interface NewApplicantProps {
  handleClose: () => void;
  kycFlowTabPosition: number;
  handleKycFlowTabPosition: (val: number) => void;
  selectedKycFlow: (flow:string) => void;
}

interface ICountryType {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const chooseCountryStaticOptions: readonly ICountryType[] = [
  { value: "india", label: "India" },
  { value: "united-states", label: "United States" },
  { value: "Japan", label: "Japan" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Ireland", label: "Ireland" },
];
const NewApplicant = (props: NewApplicantProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [kycSelected, setKycSelected] = useState("");
  const [copyToClipboard, setCopyToClipboard] = useState(
    "https://in.biocube.com/websdk/p/sbx_JWpqoyyOhyl…"
  );
  const [chooseCountryOptions, setChooseCountryOptions] = useState([
    ...chooseCountryStaticOptions,
  ]);
  const [captureImage, setCaptureImage] = useState('')
  const childRef:any = useRef();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  //   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //     setValue(newValue);
  //   };
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleTabChange = (newValue: number) => {
    props.handleKycFlowTabPosition(newValue);
  };

  const handleSelectKyc = (selectedTab: number) => {
    handleTabChange(selectedTab);
  };

  const handleChooseDevice = (selectedTab: number) => {
    handleTabChange(selectedTab);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyToClipboard);
      alert("Text copied to clipboard!");
    } catch (err) {
      alert("Failed to copy text");
    }
  };

  const handleCapturePhoto = () => {
    // childRef?.current?.getAlert()
    childRef?.current?.captures()
  }

  const handleReCapture = () => {
    setCaptureImage('')
    childRef?.current?.reCapture()
  }

  const handleFirstNameChange = () => {

  }

  const handleChooseKycFlow = (kycFlow:string) => {
    props.selectedKycFlow(kycFlow)
    setKycSelected(kycFlow)
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box> */}
      <CustomTabPanel value={props.kycFlowTabPosition} index={0}>
        <Grid container>
          <Grid item md={3} sm={12}>
            <Box className={classes.kycNeedHelpBox}>
              <Box className={classes.imgWrapper}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/kyc-flow-img1.svg"
                  }
                  alt=""
                />
              </Box>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{ px: 4 }}>
              <Box className={classes.flowHeadingWrapper}>
                <h2>New Applicant</h2>
                <p>
                  You have two levels of verification: Basic-Level KYC and
                  Detailed-Level KYC.
                </p>
                <p>
                  Please select the appropriate type from the options below to
                  continue with customer identity verification.
                </p>
              </Box>
              <Box sx={{ my: "30px" }}>
                <Box
                  sx={{
                    border: `${
                      kycSelected === enumKycSelected.basic
                        ? "1px solid #1664FF"
                        : "1px solid #ADADAD"
                    }`,
                  }}
                  className={classes.selectKYCWrapper}
                  onClick={() => handleChooseKycFlow(enumKycSelected.basic)}
                >
                  <Box>
                    <h4>Basic-level-Kyc</h4>
                    <span>Identity document and photo verification</span>
                  </Box>

                  {kycSelected === enumKycSelected.basic ? (
                    <Box>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#17AF94"
                        className="size-2"
                        style={{ width: "24px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Box>
                  ) : null}
                </Box>
                <Box
                  sx={{
                    border: `${
                      kycSelected === enumKycSelected.detailed
                        ? "1px solid #1664FF"
                        : "1px solid #ADADAD"
                    }`,
                  }}
                  className={classes.selectKYCWrapper}
                  onClick={() => handleChooseKycFlow(enumKycSelected.detailed)}
                >
                  <Box>
                    <h4>Detailed-level-Kyc</h4>
                    <span>Identity document and photo verification</span>
                  </Box>
                  {kycSelected === enumKycSelected.detailed ? (
                    <Box>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#17AF94"
                        className="size-2"
                        style={{ width: "24px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Box>
                  ) : null}
                </Box>
              </Box>

              <Box className={classes.kycFlowBtnWrapper}>
                <Button variant="text" onClick={props.handleClose}>
                  Cancel
                </Button>
                <PrimaryButton
                  btnText={"Continue"}
                  handleAction={() => handleSelectKyc(1)}
                  //   btnWidth='auto'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={props.kycFlowTabPosition} index={1}>
        <Grid container>
          <Grid item md={3} sm={12}>
            <Box className={classes.kycNeedHelpBox}>
              <Box
                className={`${classes.imgWrapper} ${classes.barcodeWrapper}`}
              >
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/kyc-flow-barcode.svg"
                  }
                  alt=""
                />
                <svg
                  style={{
                    width: "15px",
                    marginRight: "-15px",
                    marginBottom: "-15px",
                    backgroundColor: '#fff',
                    borderRadius: '4px'
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#000000"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </Box>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12} style={{maxWidth: '100%'}}>
            <Box sx={{ px: [0,4] }}>
              <Box className={classes.flowHeadingWrapper}>
                <h2>For the best experience</h2>
                <p>Do you want to make verification through smartphone?</p>
                <p>
                  We recommend you to scan QR code with your mobile for quick
                  and smooth verification process.
                </p>
              </Box>

              <Divider
                className={classes.divider}
                sx={{ borderStyle: "dotted" }}
              >
                OR
              </Divider>

              <Box sx={{ mb: 3 }}>
                <h4 style={{ margin: "8px 0px" }}>
                  Send verification link to applicant
                </h4>
                <Box className={classes.copyToClipboard}>
                  <span style={{overflow: 'hidden'}}>{copyToClipboard}</span>
                  <Copy
                    width={17}
                    onClick={handleCopyToClipboard}
                    color="#6C6C6C"
                  />
                </Box>
              </Box>

              <Divider
                className={classes.divider}
                sx={{ borderStyle: "dotted" }}
              >
                OR
              </Divider>

              <Box sx={{ mb: "30px" }}>
                <Box
                  sx={{
                    border: `${
                      kycSelected === enumKycSelected.basic
                        ? "1px solid #1664FF"
                        : "1px solid #ADADAD"
                    }`,
                  }}
                  className={classes.selectKYCWrapper}
                  onClick={() => setKycSelected(enumKycSelected.basic)}
                >
                  <Box>
                    <h4>Resume with current device</h4>
                    <span>Complete the kyc using current device</span>
                  </Box>
                  <Box>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#17AF94"
                      className="size-2"
                      style={{ width: "24px" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Box>
                </Box>
              </Box>

              <Box className={classes.kycFlowBtnWrapper}>
                <Button variant="text" onClick={props.handleClose}>
                  Cancel
                </Button>
                <PrimaryButton
                  btnText={"Continue"}
                  handleAction={() => handleChooseDevice(2)}
                  //   btnWidth='auto'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={props.kycFlowTabPosition} index={2}>
        <Grid container>
          <Grid item md={3} sm={12} sx={{width: '100%',  pt: [4, 0] }}>
            <Box className={`${classes.kycNeedHelpBox} ${classes.docIdentity}`}>
              <Box className={`${classes.imgWrapper}`}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/kyc-flow-document-identification.svg"
                  }
                  alt=""
                />
              </Box>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{ px: [1, 4] }}>
              <Box className={classes.flowStepper}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${fullScreen ? 1 : "Document"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                    className="stepLine"
                  />
                  <Chip
                    label={`${fullScreen ? 2 : "Photo"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      marginLeft: "34px !important",
                      color: "#000000",
                    }}
                  />
                </Stack>
              </Box>

              <Box className={classes.flowHeadingWrapper}>
                <h2>Identity document</h2>
                <p>Choose your country and valid government issued document.</p>
              </Box>

              <Box className={classes.selectWrapper}>
                <label htmlFor="">Country<span style={{color: 'red'}}>*</span></label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={chooseCountryOptions[0]}
                  name="color"
                  options={chooseCountryOptions}
                />
              </Box>

              <FormControl sx={{ mt: 4, width: ['100%', 'auto'] }}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className={classes.selectDocRadio}
                >
                  Select document type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className={classes.selectDocRadioWrapper}
                >
                  <FormControlLabel
                    value="National ID "
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                    }
                    label="National ID "
                  />
                  <FormControlLabel
                    value="Passport"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                    }
                    label="Passport"
                  />
                  <FormControlLabel
                    value="Driving license"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                    }
                    label="Driving license"
                  />
                </RadioGroup>
              </FormControl>

              <Box className={classes.kycFlowBtnWrapper}>
                <Button sx={{ display: ['none', 'block']}} variant="text" onClick={props.handleClose}>
                  Cancel
                </Button>
                <PrimaryButton
                  btnText={"Continue"}
                  handleAction={() => handleChooseDevice(3)}
                  btnWidth={fullScreen ? 'full' : 'auto'}
                  //   btnWidth='auto'
                />
              </Box>
              <Button className={classes.kycNeedBtn} variant="text">Need Help?</Button>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={props.kycFlowTabPosition} index={3}>
        <Grid container>
          <Grid item md={3} sm={12}>
            <Box className={classes.kycNeedHelpBox}>
              <span style={{ fontSize: "12px", fontWeight: 600 }}>
                ID Front{" "}
                <Loader
                  color="#4258FF"
                  width={14}
                  style={{ paddingTop: "12px", marginLeft: "5px" }}
                />
              </span>
              <Box className={`${classes.imgWrapper}`}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/kyc-low-doc-verification.svg"
                  }
                  alt=""
                />
              </Box>
              <span style={{ fontSize: "12px" }}>ID Back</span>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{ px: [1, 4], pt: [4, 0] }}>
              <Box className={classes.flowStepper}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${fullScreen ? 1 : "Document"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                    className="stepLine"
                  />
                  <Chip
                    label={`${fullScreen ? 2 : "Photo"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      marginLeft: "34px !important",
                      color: "#000000",
                    }}
                  />
                </Stack>
              </Box>

              <Box
                className={`${classes.flowHeadingWrapper} ${classes.docScanHeadingWrapper}`}
              >
                <h2>Document front {`${fullScreen ? '' : "side"}`}</h2>
                <p>Please ensure the photo remains visible within the frame.</p>
              </Box>

              <Box className={classes.imgCaptureWrapper}>
                {captureImage === "" ? (
                  <WebcamCapture
                    setCaptureImage={setCaptureImage}
                    ref={childRef}
                  />
                ) : (
                  <Box className={`${classes.imgWrapper}`}>
                    <img className="img-fluid" src={captureImage} alt="" />
                  </Box>
                )}
              </Box>

              <Box className={classes.kycFlowBtnWrapper}>
                <Button
                  variant="text"
                  onClick={() =>
                    captureImage === ""
                      ? handleCapturePhoto()
                      : handleReCapture()
                  }
                >
                  {captureImage === "" ? "Capture" : "Re-capture"}
                </Button>
                <PrimaryButton
                  btnText={"Continue"}
                  handleAction={() => handleChooseDevice(4)}
                  //   btnWidth='auto'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={props.kycFlowTabPosition} index={4}>
        <Grid container>
          <Grid item md={3} sm={12}>
            <Box className={classes.kycNeedHelpBox}>
              <span style={{ fontSize: "12px", fontWeight: 600 }}>
                ID Front{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  style={{
                    width: "15px",
                    color: "#4258FF",
                    verticalAlign: "sub",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <Box className={`${classes.imgWrapper}`}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/kyc-flow-document-identification-back.svg"
                  }
                  alt=""
                />
              </Box>
              <span style={{ fontSize: "12px" }}>
                ID Back{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  style={{
                    width: "15px",
                    color: "#4258FF",
                    verticalAlign: "sub",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{ px: [1, 4], pt: [4, 0]  }}>
              <Box className={classes.flowStepper}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${fullScreen ? 1 : "Document"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                    className="stepLine"
                  />
                  <Chip
                    label={`${fullScreen ? 2 : "Photo"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      marginLeft: "34px !important",
                      color: "#000000",
                    }}
                  />
                </Stack>
              </Box>

              <Box
                className={`${classes.flowHeadingWrapper} ${classes.docScanHeadingWrapper}`}
              >
                <h2>Document {`${fullScreen ? 'front' : "back side"}`}</h2>
                <p>Please ensure the photo remains visible within the frame.</p>
              </Box>

              <Box className={classes.imgCaptureWrapper}>
                {captureImage === "" ? (
                  <WebcamCapture
                    setCaptureImage={setCaptureImage}
                    ref={childRef}
                  />
                ) : (
                  <Box className={`${classes.imgWrapper}`}>
                    <img className="img-fluid" src={captureImage} alt="" />
                  </Box>
                )}
              </Box>

              <Box className={classes.kycFlowBtnWrapper}>
                <Button
                  variant="text"
                  onClick={() =>
                    captureImage === ""
                      ? handleCapturePhoto()
                      : handleReCapture()
                  }
                >
                  {captureImage === "" ? "Capture" : "Re-capture"}
                </Button>
                <PrimaryButton
                  btnText={"Continue"}
                  handleAction={() => handleChooseDevice(5)}
                  //   btnWidth='auto'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={props.kycFlowTabPosition} index={5}>
        <Grid container>
          <Grid item md={3} sm={12} sx={{width: '100%',  pt: [4, 0] }}>
            <Box className={`${classes.kycNeedHelpBox} ${classes.docIdentity}`}>
              <Box className={`${classes.imgWrapper}`}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/extracted-details.svg"
                  }
                  alt=""
                />
              </Box>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{px: [1, 4], pt: [0, 0]}}>
              <Box className={classes.flowStepper}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${fullScreen ? 1 : "Document"}`}
                    onClick={handleClick}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                        style={{
                          width: "16px",
                          color: "#fff",
                          verticalAlign: "sub",
                          display: `${fullScreen ? "none" : "block"}`,
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#1664FF",
                      color: "#fff",
                    }}
                    className="stepLine"
                  />
                  <Chip
                    label={`${fullScreen ? 2 : "Photo"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      marginLeft: "34px !important",
                      color: "#000000",
                    }}
                  />
                </Stack>
              </Box>

              <Box className={classes.flowHeadingWrapper}>
                <h2>Review extracted details</h2>
                <p>
                  Please review extracted detail of the applicant and edit if
                  necessary
                </p>
              </Box>

              <Box className={classes.detailsExtractFromWrapper}>
                <Box>
                  <InputWithLabel
                    labelText="First name"
                    placeholderText="First name"
                    inputOnChange={handleFirstNameChange}
                  />
                </Box>
                <Box>
                  <InputWithLabel
                    labelText="Last name"
                    placeholderText="Last name"
                    inputOnChange={handleFirstNameChange}
                  />
                </Box>
                <Box>
                  <InputWithLabel
                    labelText="Date of Birth"
                    placeholderText="Date of Birth"
                    inputOnChange={handleFirstNameChange}
                  />
                </Box>
              </Box>

              <Box className={classes.kycFlowBtnWrapper}>
                <Button sx={{display: `${fullScreen ? "none" : "block"}`}} variant="text" onClick={props.handleClose}>
                  Cancel
                </Button>
                <PrimaryButton
                  btnText={"Next"}
                  handleAction={() => handleChooseDevice(6)}
                  //   btnWidth='auto'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={props.kycFlowTabPosition} index={6}>
        <Grid container>
          <Grid item md={3} sm={12}>
            <Box className={classes.kycNeedHelpBox}>
              <Box className={`${classes.imgWrapper}`}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/kyc-photo-verify.svg"
                  }
                  alt=""
                />
              </Box>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{ px: [1, 4], pt: [4, 0]  }}>
              <Box className={classes.flowStepper}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${fullScreen ? 1 : "Document"}`}
                    onClick={handleClick}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                        style={{
                          width: "16px",
                          color: "#fff",
                          verticalAlign: "sub",
                          display: `${fullScreen ? "none" : "block"}`,
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#1664FF",
                      color: "#fff",
                    }}
                    className="stepLine"
                  />
                  <Chip
                    label={`${fullScreen ? 2 : "Photo"}`}
                    onClick={handleClick}
                    // icon={<DoneIcon />}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      marginLeft: "34px !important",
                      color: "#000000",
                    }}
                  />
                </Stack>
              </Box>
              
              <Box
                className={`${classes.flowHeadingWrapper} ${classes.docScanHeadingWrapper} ${classes.removeBeforeAfterProfile}`}
              >
                <h2>Photo  {`${fullScreen ? '(Selfie)' : ""}`}</h2>
                <p>Please ensure the photo clearly visible within the frame.</p>
              </Box>

              <Box className={classes.imgCaptureWrapper}>
                {captureImage === "" ? (
                  <WebcamCapture
                    setCaptureImage={setCaptureImage}
                    ref={childRef}
                  />
                ) : (
                  <Box className={`${classes.imgWrapper}`}>
                    <img className="img-fluid" src={captureImage} alt="" />
                  </Box>
                )}
              </Box>

              <Box className={classes.kycFlowBtnWrapper}>
                <Button
                  variant="text"
                  onClick={() =>
                    captureImage === ""
                      ? handleCapturePhoto()
                      : handleReCapture()
                  }
                >
                  {captureImage === "" ? "Capture" : "Re-capture"}
                </Button>
                <PrimaryButton
                  btnText={"Continue"}
                  handleAction={() => handleChooseDevice(7)}
                  //   btnWidth='auto'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={props.kycFlowTabPosition} index={7}>
        <Grid container>
          <Grid item md={3} sm={12} sx={{width: '100%',  pt: [4, 0] }}>
            <Box className={`${classes.kycNeedHelpBox} ${classes.docIdentity}`}>
              <Box className={`${classes.imgWrapper}`}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/kyc-flow-done.svg"
                  }
                  alt=""
                />
              </Box>

              <Button variant="text">Need Help?</Button>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{px: [1, 4], pt: [0, 0] }}>
              <Box className={classes.flowStepper}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${fullScreen ? 1 : "Document"}`}
                    onClick={handleClick}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                        style={{
                          width: "16px",
                          color: "#fff",
                          verticalAlign: "sub",
                          display: `${fullScreen ? "none" : "block"}`,
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#1664FF",
                      color: "#fff",
                    }}
                    className="stepLine"
                  />
                  <Chip
                    label={`${fullScreen ? 2 : "Photo"}`}
                    onClick={handleClick}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                        style={{
                          width: "16px",
                          color: "#fff",
                          verticalAlign: "sub",
                          display: `${fullScreen ? "none" : "block"}`,
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#1664FF",
                      color: "#fff",
                      marginLeft: "34px !important",
                    }}
                  />
                </Stack>
              </Box>

              <Box className={classes.flowHeadingWrapper}>
                <h2 style={{ marginBottom: "10px", marginTop: "20px" }}>
                  KYC process done!
                </h2>
                <p>Thank you for completing the kyc process.</p>
                <p>Your verification results are pending approval.</p>
                <p>
                  You can view the report{" "}
                  <Link style={{ color: "#1664FF" }} to="#">
                    here
                  </Link>
                </p>
              </Box>

              <Box className={classes.kycFlowBtnWrapper}>
                {/* <Button variant="text" onClick={props.handleClose}>
                  Cancel
                </Button> */}
                <PrimaryButton
                  btnText={"Done"}
                  handleAction={() => {
                    handleChooseDevice(0);
                    props.handleClose();
                  }}
                  //   btnWidth='auto'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
};

export default NewApplicant;

import React, {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import PrimaryButton from "../components/PrimaryButton";
import { Divider } from "@mui/material";
import { Copy } from "lucide-react";
import Select from "react-select";

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
    basic: 'basic',
    detailed: 'detailed'
}

const useStyles = makeStyles({
  kycNeedHelpBox: {
    backgroundColor: "#F6F8FF",
    marginTop: "-20px",
    // marginbottom: '-20px',
    marginLeft: "-24px",
    height: "calc(100% + 38px)",
    padding: "20px 24px",
    paddingTop: "80px",
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
  flowHeadingWrapper: {
    "& h2": {
      fontSize: "24px",
      fontWeight: 600,
      color: "#000000",
      marginBottom: "0px",
      marginTop: "10px",
    },
    "& p": {
      marginTop: "0px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#6C6C6C",
    },
  },
  imgWrapper: {},
  barcodeWrapper:{
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: '#E6E9F6',
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
    marginTop: '25px',
    '& button':{
        textTransform: "capitalize",
        fontWeight: 600,
    }
  },
  divider:{
    fontSize: '14px',
    '&::before,&::after':{
        content: "' '",
        borderTop: 'thin dashed rgba(0, 0, 0, 0.12) !important',
    },
  },
  copyToClipboard:{
    padding: '7px 10px',
    borderRadius: '5px',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& span':{
        fontSize: "12px",
        color: "#000000",
    },
    '& svg':{
        cursor: 'pointer',
    }
  }
});

interface NewApplicantProps {
    handleClose: () => void;
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
const NewApplicant = (props:NewApplicantProps) => {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [kycSelected, setKycSelected] = useState('')
  const [copyToClipboard, setCopyToClipboard] = useState('https://in.biocube.com/websdk/p/sbx_JWpqoyyOhyl…')
  const [chooseCountryOptions, setChooseCountryOptions] = useState([
    ...chooseCountryStaticOptions,
  ]);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };
  const handleTabChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleSelectKyc = (selectedTab:number) => {
    handleTabChange(selectedTab)
  }

  const handleChooseDevice = (selectedTab:number) => {
    handleTabChange(selectedTab)
  }

  const handleCopyToClipboard = async  () => {
    try {
        await navigator.clipboard.writeText(copyToClipboard);
        alert('Text copied to clipboard!');
      } catch (err) {
        alert('Failed to copy text');
      }
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
      <CustomTabPanel value={value} index={0}>
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
                  onClick={() => setKycSelected(enumKycSelected.basic)}
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
                  onClick={() => setKycSelected(enumKycSelected.detailed)}
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

      <CustomTabPanel value={value} index={1}>
        <Grid container>
          <Grid item md={3} sm={12}>
            <Box className={classes.kycNeedHelpBox}>
              <Box className={`${classes.imgWrapper} ${classes.barcodeWrapper}`}>
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/kyc-flow-barcode.svg"
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

              <Box sx={{mb: 3}}>
                <h4 style={{margin:'8px 0px'}}>Send verification link to applicant</h4>
                <Box className={classes.copyToClipboard}>
                  <span>{copyToClipboard}</span>
                  <Copy width={17} onClick={handleCopyToClipboard} color="#6C6C6C" />
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
      <CustomTabPanel value={value} index={2}>
        <Grid container>
          <Grid item md={3} sm={12}>
            <Box className={classes.kycNeedHelpBox}>
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
            <Box sx={{ px: 4 }}>
              <Box className={classes.flowHeadingWrapper}>
                <h2>Identity document</h2>
                <p>Choose your country and valid government issued 
                document.</p>
              </Box>

                  <Box>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={chooseCountryOptions[0]}
              name="color"
              options={chooseCountryOptions}
            />
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
      <CustomTabPanel value={value} index={3}>
        Item Four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Five
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Item Six
      </CustomTabPanel>
    </Box>
  );
};

export default NewApplicant;

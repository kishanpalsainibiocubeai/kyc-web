import React, {useState} from 'react'
import { Box, Button, CircularProgress, colors, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowDownToLine, Ban, Chrome, CircleX, Copy, Expand, Flag, Laptop, Link, MapPinned, SquareUser } from 'lucide-react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';


const useStyles = makeStyles({
    reportWrapper:{
        position: 'fixed',
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
        background: '#fff',
        zIndex: '5',
        overflow: 'auto',
    },
    reportTopbar:{
        backgroundColor: '#FAFAFA',
        padding: '0px 15px',
        paddingTop: '30px',
        borderBottom: '1px solid #e5e5e5',
    },
    topbarActionWrap:{
        display: 'flex',
        color: '#465679',
        alignItems: 'center',
        gap: '30px',
        justifyContent: 'flex-end',

        '& p':{
          margin: '0px',
          fontSize: '15px',
        },
        '& svg':{
          width: '18px',
        }
    },
    topbarIconBox:{

    },
    stepperWrapper:{
      backgroundColor: '#F2F2F2',
      boxShadow: '1px 0px 0px 0px #E8E8E8',
      height: '100%',
      '& .MuiStepConnector-line':{
        borderLeftWidth: '2px',
      },
      '& .Mui-active':{
        color: '#1664FF !important',
        fontWeight: '600 !important',
        
      '& svg':{
        '& text':{
          fill: '#fff !important'
        }
      }
      },
      '& .MuiStepLabel-label':{
        color: '#3E3E3E',
        fontWeight: '500',
      },
      '& svg':{
        color: '#E3E3E3',
        '& text':{
          fill: '#465679',
          fontWeight: 500,
          fontSize: '13px',
        }
      }
    },
    profileContainer:{
      padding: '15px',
      boxShadow: '0px 1px 0px 0px #E2E7F1',
    },
    reportStatus:{
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      '&>div':{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        '& p':{
          color: '#1B1B1C',
          fontSize: '14px',
        }
      }
    },
    statusIcon:{
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      '& svg':{
        width: '22px',
      }
    },
    statusIconColorCode:{
      backgroundColor: '#FA6A7A1A',
      color: '#F85563',
    },
    statusLabel:{
      padding: '8px 14px',
      borderRadius: '100px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      '& svg':{
        width: '12px',
      }
    },
    statusLabelColorCode:{
      backgroundColor: '#FFCADA',
      color: '#710022',
    },
    userProfileWrapper:{
      display: 'flex',
      marginTop: '12px',
      gap: '12px',
      flexWrap: 'wrap-reverse'
    },
    userDetailWrapper:{
      padding: '15px',
      flexGrow: '1',
    },
    reportBoxBorder:{
      border: '1px solid #e5e5e5',    
      borderRadius: '6px',
    },
    copyToClipboard:{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      '& span':{
        color: '#6C6C6C',
        fontSize: '15px',
        fontWeight: 500,
      }
    },
    userBasicDetail:{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      color: '#6C6C6C',
      flexWrap: 'wrap',
      '& b':{
        fontSize: '14px',
        fontWeight: 600,
      },
      '& span':{
        fontSize: '15px',
        fontWeight: 500,
      }
    },
    verificationServiceBox:{
      marginTop:'10px',
      '& span':{
        fontWeight: 400,
      }
    },
    userDetailFooter:{
      color: '#6C6C6C',
      borderTop: '2px solid #e5e5e5',  
      marginTop: '20px',
      paddingTop: '20px',
      '& b':{
        fontSize: '14px',
        fontWeight: 600,
      },
      '& span':{
        fontSize: '15px',
        fontWeight: 400,
      },
      '& svg':{
        verticalAlign: 'bottom',
        width: '15px',
        color: '#000000',
        marginRight: '5px',
      },
      '& > div':{
      flexWrap: 'wrap',
      }
    },
    userPhoto:{
      padding: '15px',
      '& span':{
        fontSize: '14px',
        fontWeight: 600,
        color: '#1B1B1C',
        marginBottom: '10px',
        display: 'inline-block',
      },
      '& svg':{
        width: '15px',
        color: '#6C6C6C',
        margin: 'auto',
        display: 'block',
      }
    },
    reportContainer:{
      padding: '15px',
      backgroundColor: '#fafafa',
    },
    reportCard:{
      backgroundColor: '#fff',
      boxShadow: '0px 1px 0px 0px #E2E7F1',
      padding: '18px',
      borderRadius: '8px',
      '& h3':{
        marginTop: '0px',
      }
    },
    docVerificationWrapper:{
      
      '& span':{
        fontSize: '14px',
        fontWeight: 400,
        color: '#1B1B1C',
        // marginBottom: '10px',
        // display: 'inline-block',
      },
    },
    extractedPersonalInfo:{
      marginTop: '15px',
    },
    extractedInfoValues:{
      '& p':{
        fontSize: '14px',
        fontWeight: 500,
        color: '#6C6C6C',
        marginBottom: '6px',
      },
      '& span':{
        fontSize: '14px',
        fontWeight: 500,
        color: '#1B1B1C',
      }
    },
    extractedInfoCol:{
      borderRight: '1px solid #cccccc',
      paddingLeft: '15px',
    },
    personalInfoDoc:{
      borderTop: '1px solid #cccccc',
      paddingTop: '15px',
      marginTop: '15px',
      '& .MuiGrid-root':{
        gap: '20px',
      }
    },
    personalDocsWrapper:{

      '& h3':{
        fontSize: '18px',
        fontWeight: 600,
        color: '#1B1B1C',
        margin: '10px 0px',
      },
      '& p':{
        fontSize: '15px',
        fontWeight: 500,
        color: '#1B1B1C',
        margin: '0px'
      }
    },
    personalInfoDocImage:{
      backgroundColor: '#EFF1F5',
      padding: '15px',
    },
    personalDocsName:{
      display:'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& svg':{
        width: '15px',
        color: '#6C6C6C',
      }
    },
    vedioRecordingWrapper:{
      marginTop: '15px',
    },
    vedioWrapper:{

    },
    vediosContainer:{
      paddingLeft: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      '& .img-fluid':{
        verticalAlign: 'middle',
      },
      '& > div':{
        width: '32%',
      }
    },
    faceMatchScore:{
      marginTop: '15px',
    },
    faceScoreID:{
      '& img':{
        width: '100%',
        verticalAlign: 'middle',
      }
    },
    faceScoreBarWrapper:{
      marginBottom: '15px',
    }
})

const steps = [
  {
    label: 'Applicant information',
    description: ``,
  },
  {
    label: 'Document',
    description:
      '',
  },
  {
    label: 'Selfie',
    description: ` `,
  },
  {
    label: 'Face match',
    description: ` `,
  },
];

const docvarificationOptions= [
  {label: 'Document originality', error: true},
  {label: 'Document Visibility', error: false},
  {label: 'Document not expired', error: false},
  {label: 'Document Proof', error: true},
  {label: 'Document Selected Type', error: false},
  {label: 'Selfie On Document Matched', error: true},
  {label: 'Document Name', error: false},
  {label: 'Document Date of Birth', error: true},
  {label: 'Document Address', error: false},
  {label: 'Document Front', error: true},
  {label: 'Document Back', error: true},
]


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#F85563' : '#D9D9D9',
  },
}));

const Report = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [copyToClipboard, setCopyToClipboard] = useState(
      "ID:  98932be8f3889807003h3"
    );
    const [docVerificationOptions, setDocVerificationOptions] = useState([...docvarificationOptions])



    const handleCopyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(copyToClipboard);
        alert("Text copied to clipboard!");
      } catch (err) {
        alert("Failed to copy text");
      }
    };
    

  
  return (
    <Box className={classes.reportWrapper}>
      <Box className={classes.reportTopbar}>
        <Grid container>
          <Grid item md={4} xs={12}>
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
          <Grid
            item
            md={8}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
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
      <Box>
        <Grid container>
          <Grid item md={3} xs={12}>
            <Box className={classes.stepperWrapper} sx={{pl: [1,4], pt: [2,7]}}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      {step.label}
                    </StepLabel>
                    {/* <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
                      </Box>
                    </StepContent> */}
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item md={9} xs={12}>
            <Box className={classes.profileContainer}>
              <Box
                className={`${classes.reportStatus} ${classes.reportBoxBorder}`}
              >
                <Box>
                  <Box
                    className={`${classes.statusIcon} ${classes.statusIconColorCode}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Box>
                  <Typography component={"p"}>
                    {" "}
                    Face on the document does not match with the camera{" "}
                  </Typography>
                </Box>
                <Box>
                  <MoreVertIcon />
                  <Box
                    className={`${classes.statusLabel} ${classes.statusLabelColorCode}`}
                  >
                    {" "}
                    <Ban /> Rejected{" "}
                  </Box>
                </Box>
              </Box>

              <Box className={classes.userProfileWrapper}>
                <Box
                  className={`${classes.userDetailWrapper} ${classes.reportBoxBorder}`}
                >
                  <Box className={classes.copyToClipboard}>
                    <span>{copyToClipboard}</span>
                    <Copy
                      width={17}
                      onClick={handleCopyToClipboard}
                      color="#6C6C6C"
                    />
                  </Box>
                  <h1>Apllicant Detail: Andrew Smith</h1>
                  <Box className={classes.userBasicDetail}>
                    <Box>
                      <b>Level:</b> <span>Basic-KYC</span>
                    </Box>
                    <Box>
                      <b>Date:</b> <span> June 26, 2024</span>
                    </Box>
                    <Box>
                      <b>Time:</b> <span> 3:32 PM (GM +5:30)</span>
                    </Box>
                  </Box>

                  <Box
                    className={`${classes.userBasicDetail} ${classes.verificationServiceBox}`}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <b>Verification service:</b>
                      <span>
                        <svg
                          style={{
                            width: "20px",
                            verticalAlign: "sub",
                            marginRight: "5px",
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                          />
                        </svg>
                        Identity card
                      </span>
                      <span>
                        <SquareUser
                          style={{ width: "18px", verticalAlign: "bottom" }}
                        />{" "}
                        Face
                      </span>
                    </Box>
                  </Box>

                  <Box className={classes.userDetailFooter}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "30px",
                      }}
                    >
                      <b>Device Details:</b>
                      <span>
                        <MapPinned /> 227.242.43.210
                      </span>
                      <span>
                        <Flag
                          style={{ width: "18px", verticalAlign: "bottom" }}
                        />{" "}
                        India
                      </span>
                      <span>
                        <Laptop /> India
                      </span>
                      <span>
                        <Chrome /> Chrome 125.0.0.0
                      </span>
                    </Box>
                  </Box>
                </Box>

                <Box
                  className={`${classes.userPhoto} ${classes.reportBoxBorder}`}
                >
                  <span>Selfie</span>
                  {/* report-profile */}
                  <Box>
                    <img
                      className="img-fluid"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/report-profile.svg"
                      }
                      alt=""
                    />
                  </Box>
                  <Expand />
                </Box>
              </Box>
            </Box>

            <Box className={classes.reportContainer}>
              <Box
                className={`${classes.docVerificationWrapper} ${classes.reportCard}`}
              >
                <h3>Document Verifucation</h3>
                <Grid container>
                  {docVerificationOptions.map((item) => (
                    <Grid item md={4} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        {item.error ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                            style={{ color: "#F85563", width: "18px" }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            style={{ color: "#2EA76D", width: "18px" }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}

                        <span>{item.label}</span>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box
                className={`${classes.reportCard} ${classes.extractedPersonalInfo}`}
              >
                <h3>Extracted Personal Information</h3>

                <Grid container>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    className={classes.extractedInfoCol}
                  >
                    <Box className={classes.extractedInfoValues}>
                      <p>First name</p>
                      <span>Andrew</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Middle name</p>
                      <span>-</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Last name</p>
                      <span>Smith</span>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    className={classes.extractedInfoCol}
                  >
                    <Box className={classes.extractedInfoValues}>
                      <p>Date of birth</p>
                      <span>1992-12-12 (31 y)</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Country</p>
                      <span>India</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Country of Birth</p>
                      <span>India</span>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    className={classes.extractedInfoCol}
                  >
                    <Box className={classes.extractedInfoValues}>
                      <p>State of birth</p>
                      <span>Anderson</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Place of birth</p>
                      <span>-</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Phone</p>
                      <span>-</span>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={3}
                    xs={12}
                    className={classes.extractedInfoCol}
                    sx={{ border: "none" }}
                  >
                    <Box className={classes.extractedInfoValues}>
                      <p>SSN</p>
                      <span>-</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Gender</p>
                      <span>-</span>
                    </Box>
                    <Box className={classes.extractedInfoValues}>
                      <p>Nationality</p>
                      <span>Indian</span>
                    </Box>
                  </Grid>
                </Grid>

                <Box className={classes.personalInfoDoc}>
                  <Grid container>
                    <Grid item md={4} xs={12}>
                      <Box className={classes.personalDocsWrapper}>
                        <Box className={`${classes.personalInfoDocImage}`}>
                          <img
                            className="img-fluid"
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/personal-info-doc-front.svg"
                            }
                            alt=""
                          />
                        </Box>
                        <Box className={classes.personalDocsName}>
                          <h3>Document Front</h3>
                          <Expand />
                        </Box>
                        <p>
                          Live picture taken from Macbook 28-06-2024 06:06:03
                          (UST+08:00)
                        </p>
                      </Box>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <Box className={classes.personalDocsWrapper}>
                        <Box className={`${classes.personalInfoDocImage}`}>
                          <img
                            className="img-fluid"
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/personal-info-doc-back.svg"
                            }
                            alt=""
                          />
                        </Box>
                        <Box className={classes.personalDocsName}>
                          <h3>Document Back</h3>
                          <Expand />
                        </Box>
                        <p>
                          Live picture taken from Macbook 28-06-2024 06:06:03
                          (UST+08:00)
                        </p>
                      </Box>
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-profile.svg"
                          }
                          alt=""
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box
                className={`${classes.reportCard} ${classes.vedioRecordingWrapper}`}
              >
                <h3>Video recording</h3>

                <Grid container sx={{ justifyContent: "space-between" }}>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.vedioWrapper}>
                      <iframe
                        width="480"
                        height="300"
                        style={{ maxWidth: "100%" }}
                        src="https://www.youtube.com/embed/MfCHOSL5PgI"
                        title="3 Steps for KYC Verification Process - Meeting KYC &amp; AML Compliance Obligations"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                    </Box>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Box className={classes.vediosContainer}>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                      <Box>
                        <img
                          className="img-fluid"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/report-demo-vedio-img.svg"
                          }
                          alt=""
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                className={`${classes.reportCard} ${classes.faceMatchScore}`}
              >
                <h3 style={{marginBottom: '15px'}}>Face match score</h3>
                  <Box className={classes.faceScoreBarWrapper}>
      <BorderLinearProgress variant="determinate" value={10} />
                  </Box>
                <Grid container>
                  <Grid item md={6} xs={12} sx={{pr: 2}}>
                    <Box className={`${classes.personalInfoDocImage} ${classes.faceScoreID}`}>
                      <img
                        className="img-fluid"
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/personal-info-doc-front.svg"
                        }
                        alt=""
                      />
                    </Box>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Box>
                      <img
                        className="img-fluid"
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/report-face-score.svg"
                        }
                        alt=""
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Report
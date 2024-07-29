import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import PrimaryButton from "../components/PrimaryButton";
import Chip from "@mui/material/Chip";
import DashboardCard from "../components/DashboardCard";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { components } from "react-select";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DashboarDeclineProcessBar from "../components/DashboarDeclineProcessBar";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar, DateRangePicker } from 'react-date-range';
import {Select as MuiSelect} from '@mui/material';
import { addDays } from "date-fns";
import { Padding } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import { transform } from "typescript";
import { Calendar as LucideCalendar} from "lucide-react";



const useStyles = makeStyles({
  dashboardWrapper: {
    backgroundColor: "var(--bg-secondary)",
  },
  headerLeft: {
    display: "flex",
    flexWrap: "wrap",
    padding: "48px",
    paddingBottom: "0px",
    background: "#E3EDFF",
    "& h1": {
      margin: "13px 0px",
      lineHeight: 1,
      fontWeight: 600,
    },
    "& p": {
      margin: "0px",
      color: "#09142F",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: '22px',
      // lineHeight: '20px',
    },
  },
  headerRight: {
    background: "#ffffff",
    padding: "28px 15px",
    "& p": {
      fontSize: "15px",
      fontWeight: 500,
      margin: "0px",
    },
  },
  btnWrapper: {
    "& button": {
      fontSize: "14px",
      fontWeight: 500,
      color: "#FFFFFF",
    },
  },
  headerImgWrapper:{
    marginBottom: "-6px", 
    paddingTop: "28px",
    '@media (max-width: 600px)': {
      display: 'none',
    }
  },

  // overviewWrapper
  overviewWrapper: {
    padding: "20px",
  },
  overviewTopSection: {
    display: "flex",
    justifyContent: "space-between",   
    alignItems: 'center',
    gap: '10px',
    "& h3": {
      fontSize: "18px",
      fontWeight: 600,
      color: "#000000",
    },
  },
  overviewCardWrapper:{
    display: "flex",
    gap: "20px",
    justifyContent: "space-between",
    '@media (max-width: 900px)': {
      flexWrap: 'wrap'
    }
  },
  dashboardFooterWrapper: {
    "& h3": {
      fontSize: "18px",
      fontWeight: 600,
      color: "#000000",
    },
  },
  serviceTableSection: {
    '@media (max-width: 600px)': {
      '& table':{
        minWidth: '100%',
      },
    },
    '& thead':{
      backgroundColor: '#E3EDFF80',
      '& th':{
        color: '#5075C2',
        fontSize: "16px",
        fontWeight: 600,
      }
    },
    '& tbody':{
      '& th,td':{
        color: '#09142F',
        fontSize: "15px",
        fontWeight: 500,
      },
    }
  },
  
  popularDecline:{

  },
  declineTableWrapper:{
    borderRadius: '4px',
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#FFFFFF',
  },
  declineTableHead:{
    backgroundColor: '#E3EDFF80',
    padding: '16px',
    // border: '0.4px soild #E3EDFF80',
    // borderRadius: '4px, 4px, 0px,  0px',
    '& h4':{
      margin: '0px',
      color: '#5075C2',
      fontSize: "16px",
      fontWeight: 600,
    }
  },
  calenderWrapper:{
    fontSize: '14px',
    color: '#4F4E59',
    position: 'relative',
    backgroundColor: '#fff',
    '& .lable':{
      position: 'absolute',
      zIndex: 1,
      left: '12px',
      top: '50%',
      transform: 'translate(0px, -50%)',
      fontWeight: 500,
    },
    '& #select-calender-wraper':{
      height: '38px',
      padding: '0px',
      backgroundColor: '#fff',
    },
    '& svg':{
      width: '18px',
      color: '#4F4E59',
      marginRight: '8px',
      display: 'inline-block',
      backgroundColor: '#fff',
    }
  },
  zoneSelect:{
    "& > div":{
      fontSize: '14px',
      color: '#4F4E59',
      fontWeight: 500,
    }
  },
  selectAndCalenderWrapper:{
    '@media (max-width: 600px)': {
      display: 'none !important',
    }
  }
});

interface ICardType {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

interface ICalenderType {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const cardTypeStaticOptions: readonly ICardType[] = [
  { value: "all", label: "All", color: "#00B8D9" },
  { value: "verified", label: "Verified", color: "#0052CC" },
  { value: "in-progress", label: "In Progress", color: "#5243AA" },
  { value: "reviewed", label: "Reviewed", color: "#00B8D9" },
  { value: "pending", label: "Pending", color: "#00B8D9" },
];
const calenderStaticOptions: readonly ICalenderType[] = [
  { value: "all-time", label: "All " },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last-seven-days", label: "Last 7 Days" },
  { value: "last-thirty-days", label: "Last 30 Days" },
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "last Month" },
  { value: "custom-range", label: "Custom Range" },
];

function createData(
  iconUrl: string,
  serviceName: string,
  varified: number,
  declined: number,
  total: number,
) {
  return { iconUrl, serviceName, varified, declined, total };
}

const rows = [
  createData(`${process.env.PUBLIC_URL}/assets/icons/dashboard-service-face.svg`, "Face", 20, 8, 28),
  createData(`${process.env.PUBLIC_URL}/assets/icons/dashboard-service-id-card.svg`, "ID Card", 15, 2, 17),
];

const Dashboard = () => {
  const classes = useStyles();
  const [cardType, setCardType] = useState("All");
  const [cardTypeOptions, setCardTypeOptions] = useState([
    ...cardTypeStaticOptions,
  ]);
  const [calenderOptions, setCalenderOptions] = useState([
    ...calenderStaticOptions,
  ]);
  const [serviceTable, setServiceTable] = useState([...rows]);
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  useEffect(() => {
   console.log("dateRange :", dateRange)
  }, [dateRange])
  

  const handleViewDemo = () => {};
  const [age, setAge] = React.useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value as string);
  };

  const handleSelectDateRange = (date:any) => {
    console.log(date); // native Date object
  }

  // const handleCardTypeChange = (event: SelectChangeEvent) => {
  //   setCardType(event.target.value as string);
  // };
  const CustomOption = ({ innerProps, isDisabled }:any) => (
    // !isDisabled ? (
      <Box>
        <div {...innerProps}>your component internals</div>
      {/* <Calendar
        date={new Date()}
        onChange={handleSelectDateRange}
      /> */}
      </Box>
    // ) : null;
    )

  return (
    <Box className={classes.dashboardWrapper}>
      <Grid container spacing={2}>
        <Grid item lg={8} md={7} sm={12} style={{ paddingLeft: "0px" }}>
          <Box className={classes.headerLeft}>
            <Grid container spacing={2}>
              <Grid item lg={7} sm={12}>
                <Box sx={{ mb: 3 }}>
                  <h1>Hi, Madison Tucker</h1>
                  <p>
                    Conduct KYC (Know Your Customer) checks on users worldwide
                    to minimize the risk of fraud, improve risk management
                    strategies, and enhance overall security.
                  </p>
                  <Box sx={{ mt: 5 }} className={classes.btnWrapper}>
                    <PrimaryButton
                      btnText="View Demo"
                      handleAction={handleViewDemo}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={5} sm={12}>
                <Box className={classes.headerImgWrapper}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/dashboard-header.svg"
                    }
                    alt=""
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={4} md={5} sm={12} sx={{ backgroundColor: "#ffffff" }}>
          <Box className={classes.headerRight}>
            <Box>
              <Chip
                label="Start"
                sx={{
                  background: "#E3EDFF",
                  color: "#3761AC",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              />
              <Chip
                label="<Embed>"
                sx={{
                  background: "#CFF1E8",
                  mx: 2,
                  color: "#376357",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              />
              <Box>
                <h2
                  style={{
                    fontWeight: 500,
                    color: "#000",
                    fontStyle: "italic",
                    margin: "0px",
                    marginTop: "20px",
                  }}
                >
                  Start with the Basic KYC flow
                </h2>
                <p style={{ color: "#6E6E6E" }}>
                  Try out the default verification level covering common KYC
                  requirements
                </p>
              </Box>
              <Box
                sx={{ display: "flex", gap: "24px", mt: 2, flexWrap: "wrap" }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/icons/dashboard-verification-icon.svg"
                    }
                    alt=""
                  />
                  <p style={{ color: "#09142F" }}>ID Verification</p>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/icons/scan-face.svg"}
                    alt=""
                  />
                  <p style={{ color: "#09142F" }}>Face Verification</p>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }} className={classes.btnWrapper}>
                <PrimaryButton
                  btnText="Test flow"
                  handleAction={handleViewDemo}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* overView Section */}
      <Box className={classes.overviewWrapper}>
        <Box className={classes.overviewTopSection}>
          <Box>
            <h3>Overview</h3>
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }} className={classes.selectAndCalenderWrapper}>
            <Box sx={{minWidth: '100px', width: 'auto'}} className={classes.zoneSelect}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={calenderOptions[0]}
              name="color"
              options={calenderOptions}
              
            />
            </Box>
            {/* <Select
              className="basic-single"
              classNamePrefix="select"
              // defaultValue={calenderOptions[0]}
              // name="color"
              // options={calenderOptions}
              // options={CustomOption}
              components={{ Option: CustomOption }}
            /> */}
            <Box sx={{minWidth: '120px'}}>
            <FormControl fullWidth className={classes.calenderWrapper}>
              {/* <InputLabel id="demo-simple-select-label">This month</InputLabel> */}
              <label htmlFor="" className="lable">This month</label>
              <MuiSelect
                labelId="demo-simple-select-label"
                id="select-calender-wraper"
                value="This month"
                // label="This month"
                onChange={handleChange}
                IconComponent={(props) => (<LucideCalendar />)}
              >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
                <DateRangePicker
                  onChange={(item) => setDateRange([item.selection])}
                  // showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={dateRange}
                  direction="horizontal"
                  preventSnapRefocus={true}
                  calendarFocus="backwards"
                />
              </MuiSelect>
            </FormControl>
            </Box>
          </Box>
        </Box>
        <Box className={classes.overviewCardWrapper}>
          <DashboardCard
            mainHeading="11,000"
            subHeading="Total Verifications"
            arrowIcon={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-right.svg`}
            cardIcon={`${process.env.PUBLIC_URL}/assets/icons/dashboard-card-verified.svg`}
            showPercentage="100%"
          />
          <DashboardCard
            mainHeading="250"
            subHeading="declined"
            arrowIcon={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-right.svg`}
            cardIcon={`${process.env.PUBLIC_URL}/assets/icons/dashboard-card-decline.svg`}
            showPercentage="100%"
          />
          <DashboardCard
            mainHeading="20"
            subHeading="In Progress"
            arrowIcon={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-right.svg`}
            cardIcon={`${process.env.PUBLIC_URL}/assets/icons/dashboard-card-process.svg`}
            showPercentage="100%"
          />
          <DashboardCard
            mainHeading="20"
            subHeading="Reviewed"
            arrowIcon={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-right.svg`}
            cardIcon={`${process.env.PUBLIC_URL}/assets/icons/dashboard-card-reviewed.svg`}
            showPercentage="100%"
          />
          <DashboardCard
            mainHeading="20"
            subHeading="Pending"
            arrowIcon={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-right.svg`}
            cardIcon={`${process.env.PUBLIC_URL}/assets/icons/dashboard-card-pending.svg`}
            showPercentage="100%"
          />
        </Box>

        <Box className={classes.dashboardFooterWrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Box className={classes.serviceTableSection}>
                <Box>
                  <h3>Services used</h3>
                </Box>
                <Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Service Name</TableCell>
                          <TableCell align="right">Verified</TableCell>
                          <TableCell align="right">Declined</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {serviceTable.map((row) => (
                          <TableRow
                            key={row.serviceName}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <img src={row.iconUrl} alt="" />
                              {row.serviceName}
                            </TableCell>
                            <TableCell align="right">{row.varified}</TableCell>
                            <TableCell align="right">{row.declined}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className={classes.popularDecline}>
                <Box>
                  <h3>Most popular declined reasons </h3>
                </Box>
                <Box className={classes.declineTableWrapper}>
                  <Box className={classes.declineTableHead}>
                    <h4>Reason</h4>
                  </Box>
                  <Box
                    sx={{
                      padding: "0px 16px",
                      paddingTop: "10px",
                    }}
                  >
                    <DashboarDeclineProcessBar
                      barColor="#7793CB"
                      barBgColor="#CFDFFF"
                      value={70}
                      barLabel="Blurred photos"
                    />
                    <DashboarDeclineProcessBar
                      barColor="#E5662F"
                      barBgColor="#FFE9E0"
                      value={10}
                      barLabel="Incorrect side"
                    />
                    <DashboarDeclineProcessBar
                      barColor="#9255C1"
                      barBgColor="#F1E0FF"
                      value={15}
                      barLabel="Cut-off document"
                    />
                    <DashboarDeclineProcessBar
                      barColor="#613400"
                      barBgColor="#EDEAE7"
                      value={20}
                      barLabel="Glare on a photo"
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

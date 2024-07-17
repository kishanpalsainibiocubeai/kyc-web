import React, { useState, useMemo } from "react";
import { Avatar, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import PrimaryButton from "../components/PrimaryButton";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Clock, EllipsisVertical, SquareUserRound } from "lucide-react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import NewApplicant from "./NewApplicant";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#4281FF",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#4281FF",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const useStyles = makeStyles({
  applicantsWrapper: {
    padding: "18px",
  },
  filtersAndSearchWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& input::placeholder": {
      // color: 'red'
    },
  },
  filtersWrapper: {
    display: "flex",
    paddingLeft: "18px",
    gap: "20px",
    "& b": {
      color: "#000000",
      fontSize: "16px",
      fontWeight: 600,
    },
    "& .select__control": {
      border: "none",
      "& *": {
        padding: "0px",
        margin: "0px",
      },
      "& .select__indicator-separator": {
        display: "none",
      },
      "& .select__single-value": {
        color: "#000000",
        fontSize: "16px",
        fontWeight: 400,
      },
      "& .select__indicators": {
        "& svg": {
          fontSize: "8px",
          color: "#9FA9BE",
        },
      },
    },
  },
  searchWrapper: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnWrapper: {},
  tableWrapper: {
    paddingTop: "16px",
    "& thead > tr": {
      border: "1px solid #D9D9D9",
      //   borderRadius: "4px",
    },
  },
  tableRow: {
    "& td > p": {
      margin: "0px",
      color: "#9DA1AC",
    },
    "& td > span": {
      color: "#000000",
      fontSize: "14px",
      fontWeight: 400,
    },
  },
  paginationWrap: {
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationAvatar: {
    backgroundColor: "#fff !important",
    border: "1px solid #F1F1F1",
    color: "#000000 !important",
    fontSize: "12px !important",
    width: "28px !important",
    height: "28px !important",
  },
  paginationAvatarActive: {
    backgroundColor: "#DFDFDF !important",
    fontWeight: 600,
  },
  requiredDocumentWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "5px",
    "& .id-card": {
      width: "28px",
      // height: '28px',
    },
  },
  dialogWrapper:{
    maxWidth: '100%',
    '& .MuiDialog-root':{
    }
  }
});

interface IFiltersType {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const periodFilterStaticOptions: readonly IFiltersType[] = [
  { value: "all-time", label: "All Time" },
  // { value: "verified", label: "Verified" },
  // { value: "in-progress", label: "In Progress" },
  // { value: "reviewed", label: "Reviewed" },
  // { value: "pending", label: "Pending" },
];

const documentTypeFilterStaticOptions: readonly IFiltersType[] = [
  { value: "all", label: "All" },
];

const countryFilterStaticOptions: readonly IFiltersType[] = [
  { value: "all", label: "All" },
];

const statusFilterStaticOptions: readonly IFiltersType[] = [
  { value: "all", label: "All" },
];


interface Data {
  id: number;
  name: string;
  status: number;
  requiredDocument: number;
  action: string;
}

function createData(
  id: number,
  name: string,
  requiredDocument: number,
  status: number,
  action: string
): Data {
  return {
    id,
    name,
    requiredDocument,
    status,
    action,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, "open"),
  createData(2, "Donut", 452, 25.0, "open"),
  createData(3, "Eclair", 262, 16.0, "open"),
  createData(4, "Frozen yoghurt", 159, 6.0, "open"),
  createData(5, "Gingerbread", 356, 16.0, "open"),
  createData(6, "Honeycomb", 408, 3.2, "open"),
];

const Applicants = () => {
  const classes = useStyles();
  const [periodFilter, setPeriodFilter] = useState([
    ...periodFilterStaticOptions,
  ]);
  const [documentTypeFilter, setDocumentTypeFilter] = useState([
    ...documentTypeFilterStaticOptions,
  ]);
  const [countryFilter, setcountryFilter] = useState([
    ...countryFilterStaticOptions,
  ]);
  const [statusFilter, setstatusFilter] = useState([
    ...statusFilterStaticOptions,
  ]);

  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [applicantDialog, setApplicantDialog] = React.useState(false);
  const [kycFlowTabPosition, setKycFlowTabPosition] = useState(0)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log("fullScreen :", fullScreen)

  const handleApplicantDialogOpen = () => {
    setApplicantDialog(true);
  };

  const handleApplicantDialogClose = () => {
    setApplicantDialog(false);
  };

  const handleNewApplicant = () => {
    setApplicantDialog(true);
  };

  const handleKycFlowTabPosition = (val:number) => {
    setKycFlowTabPosition(val)
  }


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#f7f7f7",
      color: "#000",
      fontWeight: 600,
      padding: "5px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box className={classes.applicantsWrapper}>
      {/* <Box className={classes.filtersAndSearchWrapper}> */}

      <Grid container spacing={2}>
        <Grid item md={7} sm={12} style={{ paddingLeft: "0px" }}>
          <Box className={classes.filtersWrapper}>
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <b>Period:</b>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={periodFilter[0]}
                name="color"
                options={periodFilter}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <b>Document type:</b>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={documentTypeFilter[0]}
                name="color"
                options={documentTypeFilter}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <b>Country:</b>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={countryFilter[0]}
                name="color"
                options={countryFilter}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <b>Status:</b>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={statusFilter[0]}
                name="color"
                options={statusFilter}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={5} sm={12} style={{ paddingLeft: "0px" }}>
          <Box className={classes.searchWrapper}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box className={classes.btnWrapper}>
              <PrimaryButton
                btnText="New applicant"
                handleAction={handleNewApplicant}
                btnIcon={`${process.env.PUBLIC_URL + "/assets/icons/plus.svg"}`}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </Box> */}

      <Box className={classes.tableWrapper}>
        <Box sx={{ width: "100%" }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              // size={dense ? 'small' : 'medium'}
            >
              <TableHead>
                <TableRow sx={{ borderRadius: "20px" }}>
                  <StyledTableCell>
                    <Checkbox
                      color="primary"
                      checked={false}
                      // inputProps={{
                      //   "aria-labelledby": labelId,
                      // }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">
                    Required document
                  </StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any, index: number) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                      className={classes.tableRow}
                    >
                      <TableCell
                        padding="checkbox"
                        sx={{ verticalAlign: "top", paddingTop: "8px" }}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        //   component="th"
                        id={labelId}
                        //   scope="row"
                      >
                        {/* {row.name} */}
                        <b>[Applicant Name] </b> <br />
                        <b>ID: 98932be8f3889807003h3</b> <br />
                        <p>India</p>
                        <p>Created : June 26, 2024 , 3:32 PM (GM +5:30)</p>
                      </TableCell>
                      <TableCell align="left">
                        {/* {row.name} */}
                        <Box className={classes.requiredDocumentWrapper}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#E1B002"
                            className="size-6 id-card"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                            />
                          </svg>

                          {/* <IdentificationIcon
                            color="#E1B002"
                            width="18px"
                            className="size-1 text-blue-500"
                            style={{ fontSize: "20px", width: "25px" }}
                          /> */}
                          <SquareUserRound color="#23B589" />
                        </Box>
                        <b>Level:</b> <span>Basic -kyc-level</span>
                      </TableCell>
                      <TableCell align="left">
                        {/* {row.requiredDocument} */}
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "#BDEFFF",
                            padding: "7px 12px",
                            borderRadius: "100px",
                            marginBottom: "7px",
                          }}
                        >
                          <Clock style={{ color: "#06495F" }} width="14px" />{" "}
                          <h4
                            style={{
                              color: "#06495F",
                              fontWeight: 600,
                              fontSize: "14px",
                              margin: "0px",
                            }}
                          >
                            Document requested
                          </h4>
                        </Box>

                        <p>Checked : June 26, 2024 , 3:32 PM (GM +5:30)</p>
                      </TableCell>

                      <TableCell align="left">
                        {/* {row.status} */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: 500,
                              color: "var(--take-action)",
                            }}
                          >
                            Open
                          </span>
                          <EllipsisVertical color="#465679" />
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}

          <Box className={classes.paginationWrap}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <b
                style={{ fontSize: "14px", fontWeight: 600, color: "#09142F" }}
              >
                Show
              </b>
              <Avatar
                className={`${classes.paginationAvatar} ${classes.paginationAvatarActive}`}
              >
                5
              </Avatar>
              <Avatar className={classes.paginationAvatar}>10</Avatar>
              <Avatar className={classes.paginationAvatar}>20</Avatar>
            </Stack>

            <Stack spacing={2}>
              <Pagination
                count={8}
                variant="outlined"
                color="primary"
                style={{ color: "#1664FF" }}
              />
            </Stack>
          </Box>
        </Box>
      </Box>


      
      <Dialog
        open={applicantDialog}
        // onClose={handleApplicantDialogClose}
        maxWidth='md'
        style={{width: '707px', margin: 'auto'}}
        fullScreen={fullScreen}
        className={classes.dialogWrapper}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries((formData as any).entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleApplicantDialogClose();
        //   },
        // }}
      >
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <NewApplicant
          kycFlowTabPosition={kycFlowTabPosition}
          handleKycFlowTabPosition={handleKycFlowTabPosition}
        handleClose={handleApplicantDialogClose}
         />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleApplicantDialogClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default Applicants;

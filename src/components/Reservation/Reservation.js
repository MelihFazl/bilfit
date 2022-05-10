import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import './Reservation.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {Button} from "../Navbar/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { Sort } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { set } from 'date-fns';
import { render } from 'react-dom';
import Input from '../Controls/Input.js';
import { stableSort, getComparator } from '../SearchAndSortMethods/SearchAndSort.js';
import { InputAdornment, TableFooter, TableSortLabel } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Search from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TablePagination from '@mui/material/TablePagination';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Button positions will be fixed
// Right side of the table will be fixed
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F05454',
    color: theme.palette.common.white,
    fontSize: 13
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Reservation() {
  //variables

  const userType = (localStorage.getItem("usertype") == "staff") ? 1 : 0;
  const pages = [5, 10, 15];
  const [reservations, setReservations] = useState([]);
  const [memberResults, setMemberResults] = useState([]);
  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users
  const [showInfo2, setInfo2] = useState(() => userType ? 1 : 0); //visibility setting for staff
  //SORTING FOR USERS
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [searchSelection, setSearchSelection] = useState();
  //SORTING FOR STAFF
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(pages[page2]);
  const [order2, setOrder2] = useState();
  const [orderBy2, setOrderBy2] = useState();
  const [filterFn2, setFilterFn2] = useState({ fn: items => { return items; } });
  const [searchSelection2, setSearchSelection2] = useState();
  //FOR GYM STAFF DELETING 
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);

  const [sportCenters, setSportCenters] = useState([]);
  const [sportActivities, setSportActivities] = useState([]);
  const [sportFields, setSportFields] = useState([]);

  const [currentIndex, setCurrentIndex] = useState("");
  const [newSportCenter, setNewSportCenter] = useState("");
  const [newSportActivity, setNewSportActivity] = useState("");
  const [newSportField, setNewSportField] = useState("");
  const [newDateFirst, setNewDateFirst] = useState("");
  const [newDateSecond, setNewDateSecond] = useState("");
  const [newTimeSlots, setNewTimeSlots] = useState("");
  const [newTimes, setNewTimes] = useState([]);


 
  const handleClose8 = () => {
    setOpen8(false);
  };

  const handleClickOpen8 = () => {
    setOpen8(true);
  };

  const handleClose7 = () => {
    setOpen7(false);
  };

  const handleClickOpen7 = () => {
    setOpen7(true);
  };

  //methods
  const handleClose5 = () => {
    setOpen5(false);
  };

  const handleClickOpen5 = () => {
    setOpen5(true);
  };

  const handleClose6 = () => {
    setOpen6(false);
  }

  const handleClickOpen6 = () => {
    setOpen6(true);
  }

  const handleData = () =>
  {
    if (userType === 1) {
    fetch('http://localhost:8080/reservation/')
      .then((res) => res.json())
      .then((result) => {
        setReservations(result);
        handleSportCenterData();
      });
  }
  else if (userType === 0) {
    fetch('http://localhost:8080/reservation/getByUserID/' + localStorage.getItem("userid"))
      .then((res) => res.json())
      .then((result) => {
        setReservations(result);
        
      });
  }
  }

  const handleSportCenterData = () => {
    fetch("http://localhost:8080/reservation/sportCenter").then((res) => res.json()).then((result) => {
      setSportCenters(result)
      console.log(result);
    })
  }

  useEffect(() => {
    handleSportCenterData()
    handleData();
    
  }, []);

  //Table actions for the gym member
  const headCells1 = [
    { id: 'reservationDate', label: 'Date' },
    { id: 'resTime', label: 'Time' },
    { id: 'resActivity', label: 'Activity' },
    { id: 'resLocation', label: 'Location' },
    { id: 'resSportsCenter', label: 'Sports Center' },
    { id: 'resStatus', label: 'Reservation Status' },
    { id: 'resButton1', label: '', disableSorting: true },
    { id: 'resButton2', label: '', disableSorting: true },
    { id: 'resButton3', label: '', disableSorting: true },
  ]

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          switch (searchSelection) {
            case "reservationDate": return items.filter(x => x.reservationDate.includes(target.value));
            case "resTime": return items.filter(x => x.reservedTimeInterval.includes(target.value));
            case "resActivity": return items.filter(x => x.reservationActivity.activity.includes(target.value));
            case "resLocation": return items.filter(x => x.reservationField.name.includes(target.value));
            case "resSportsCenter": return items.filter(x => x.reservationPlace.name.includes(target.value));
            case "resStatus": return items.filter(x => x.status.includes(target.value));
            default: return items.filter(x => x.reservationActivity.activity.includes(target.value));
          }
      }
    })
  }

  const reservationsAfterSortingAndPaging = () => {
    return stableSort(filterFn.fn(reservations), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }

  const handleSortRequest = cellId => {
    const isAscending = orderBy === cellId && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(cellId);
  }

  const handleSearchSelection = (event) => {
    setSearchSelection(event.target.value);
  };


  //Table actions for the gym staff
  const headCells2 = [
    { id: 'reservationDate', label: 'Date' },
    { id: 'reservedTimeInterval', label: 'Time' },
    { id: 'reservationActivity-activity', label: 'Activity' },//?
    { id: 'resSportsCenter', label: 'Sports Center' },
    { id: 'resLocation', label: 'Location' },
    { id: 'reserverName', label: 'Reserver Name' },
    { id: 'reserverPhone', label: 'Reserver Phone' },
    { id: 'reserverID', label: 'Reserver ID' },
    { id: 'resStatus', label: 'Status' },
    { id: 'resButton1', label: '', disableSorting: true },
    { id: 'resButton2', label: '', disableSorting: true },
  ]

  const handlePageChange2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleRowsPerPageChange2 = event => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };
  const handleSubmitDateTime = () =>
  {
    
    if(newDateFirst >= newDateSecond)
    {
      alert("First date cannot be after the second one!")
      return;
    }
    let strArray = newTimeSlots.replace(/\s/g, '').split(",");

    fetch("http://localhost:8080/reservation/dateTimeSet?sportCenterID=" 
    + newSportCenter.id + "&sportActivityID=" + newSportActivity.id 
    + "&fieldID=" + newSportField.id + "&begin=" + new Date(newDateFirst).toISOString().split('T')[0] 
    + "&end=" + new Date(newDateSecond).toISOString().split('T')[0] + "&strings=" + strArray, {
      method:"POST"
    }).then((result) => {
      result.text().then((actualResult) => {
        handleClose7()
        setNewTimeSlots("")
      })
    })
  }
  const handleSearch2 = e => {
    let target = e.target;
    setFilterFn2({
      fn: items => {
        if (target.value == "")
          return items;
        else
          switch (searchSelection2) {
            case "reservationDate": return items.filter(x => x.reservationDate.includes(target.value));
            case "reservedTimeInterval": return items.filter(x => x.reservedTimeInterval.includes(target.value));
            case "activity": return items.filter(x => x.reservationActivity.activity.includes(target.value));
            case "resLocation": return items.filter(x => x.reservationField.name.includes(target.value));
            case "resSportsCenter": return items.filter(x => x.reservationPlace.name.includes(target.value));
            case "resStatus": return items.filter(x => x.status.includes(target.value));
            case "resStatus": return items.filter(x => x.status.includes(target.value));
            case "resStatus": return items.filter(x => x.status.includes(target.value));
            case "resStatus": return items.filter(x => x.status.includes(target.value));
            default: return items.filter(x => x.reservationActivity.activity.includes(target.value));
          }
      }
    })
  }

  const reservationsAfterSortingAndPaging2 = () => {
    return stableSort(filterFn2.fn(reservations), getComparator(order2, orderBy2)).slice(page2 * rowsPerPage2, (page2 + 1) * rowsPerPage2);
  }

  const handleSortRequest2 = cellId => {
    const isAscending = orderBy2 === cellId && order2 === "asc";
    setOrder2(isAscending ? "desc" : "asc");
    setOrderBy2(cellId);
  }

  const handleSearchSelection2 = (event) => {
    setSearchSelection2(event.target.value);
  };

  function handleCancelReservation(reservation){
    if(reservation.status === "Not_Attended")
    {
    fetch("http://localhost:8080/reservation/cancel/" + reservation.id, {
      method:"POST"
    }).then(result => {
      result.text().then((actualResult) => {
          alert(actualResult)
          handleData()
          
      })
    })
  }
  else
  {
    alert("Cannot cancel that reservation 🤔");
  }
  }
  function handleAttendStatus(reservation) {
      if(reservation.status === "Not_Attended")
      {
      fetch("http://localhost:8080/reservation/attend/" + reservation.id, {
        method:"POST"
      }).then(result => {
        result.text().then((actualResult) => {
            alert(actualResult)
            handleData()
            
        })
      })
    }
    else
    {
      alert("Cannot mark this reservation as attended!");
    }
  }

  function handleCancelStatus(reservation) {
    if(reservation.status === "Not_Attended")
    {
    fetch("http://localhost:8080/reservation/cancel/" + reservation.id, {
      method:"POST"
    }).then(result => {
      result.text().then((actualResult) => {
          alert(actualResult)
          handleData()
          
      })
    })
  }
  else
  {
    alert("Cannot cancel that reservation 🤔");
  }
}

  


  /**
 * Below variables are for icons of buttons (importing the icon)
 */
  const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
    const { icon } = props;

    const {
      icon: [width, height, , , svgPathData],
    } = icon;

    return (
      <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
        {typeof svgPathData === 'string' ? (
          <path d={svgPathData} />
        ) : (

          svgPathData.map((d, i) => (
            <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
          ))
        )}
      </SvgIcon>
    );
  });

  FontAwesomeSvgIcon.propTypes = {
    icon: PropTypes.any.isRequired,
  };

  //This page will be for gym members
  if (userType === 0) {
    return (
      <>
        <Stack className='mainStackUser' direction="column"
          spacing={3} alignItems="center" style={{ display: showInfo1 ? "block" : "none" }}    >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header' >My Reservations</h1> </div>
          <Stack className='mainStack' direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={6}>
             
            <div className="ReservationContainer">

              {/*For searching and sorting of user*/}
              <Stack className='selectionStack' direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={6}>
                <Toolbar>
                  <Input label="Search Reservations" InputProps={{
                    startAdornment: (<InputAdornment position='start'><Search /></InputAdornment>)
                  }} onChange={handleSearch} />
                </Toolbar>
                <Box width='12rem'>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={searchSelection}
                      label="Search By"
                      onChange={handleSearchSelection}
                    >
                      {headCells1.map(headCell => (
                        !headCell.disableSorting && <MenuItem value={headCell.id}>{headCell.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              <TableContainer component={Paper} >
                <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table" >
                  <TableHead>
                    <TableRow>
                      {headCells1.map(headCell => (
                        <StyledTableCell key={headCell.id} >
                          {headCell.disableSorting ? headCell.label :
                            <TableSortLabel onClick={() => { handleSortRequest(headCell.id) }}
                              direction={(orderBy === headCell.id) ? order : 'asc'} active={orderBy == headCell.id}>
                              {headCell.label}
                            </TableSortLabel>}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {reservationsAfterSortingAndPaging().map((reservation, index) => (
                      <StyledTableRow key={reservation.id} component="th" scope="row"  >
                        <StyledTableCell className='cellItem' >
                          {reservation.reservationDate}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.reservedTimeInterval}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' value={reservation.reservationActivity.activity}>
                          {reservation.reservationActivity.activity}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'  >
                          {reservation.reservationField.name}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'>
                          {reservation.reservationPlace.name}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.status}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          <Stack className='mainStack' direction="row"  // This stack is for delete and cancel reservation buttons
                            justifyContent="start"
                            alignItems="start"
                            spacing={0}>
                            <Box className='button1'
                              sx={{
                                '& > :not(style)': {
                                  m: 1,
                                },
                              }}
                            >
                              <IconButton aria-label="Example" onClick={() => { handleClickOpen8();setCurrentIndex(reservation)}}>  
                                <FontAwesomeIcon icon={faXmark}/>
                              </IconButton>
                              <Dialog
                                open={open8}
                                onClose={handleClose8}
                                aria-labelledby="Warning"
                                aria-describedby="Warning"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Warning 🤒"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    You are cancelling the reservation. Are you sure?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose8}>Cancel</Button>
                                  <Button onClick={() => {
                                    setOpen8(false);
                                    handleCancelReservation(currentIndex);
                                  }} autoFocus>
                                    I am Sure.
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </Box>
                              
                           
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>

                </Table>
                <TablePagination component='div' page={page} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage}
                  count={reservations.length} onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }}>
                </TablePagination>
              </TableContainer>
            </div>
          </Stack>
        </Stack>
      </>
    );
  }
  //This page will be for gym staff
  else if (userType === 1) {
    return (
      <>
        <Stack className='mainStackStaff' direction="column"
          spacing={3} alignItems="center" justifyContent="center" style={{ display: showInfo2 ? "block" : "none" }}    >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'>Total Reservations</h1> </div>
          <Button onClick={() => setOpen7(true)}>Set Date and Time Slots</Button>
          <Dialog open={open7} onClose={handleClose7}> 
          <DialogTitle>Set Time</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the necessary information of the new user.
            </DialogContentText>
            <Stack direction="column">  
            <TextField
              className="newUser"
              autoFocus
              id="newUserGender"
              margin="dense"
              select
              label="Select Sport Center"
              required={true}
              defaultValue={sportCenters[0] && sportCenters[0].name }
              color="secondary"
              onChange={(event) => {
                setNewSportCenter(event.target.value)
                setSportActivities(event.target.value.availableActivities)
                console.log(event.target.value.availableActivities)
              }}
              focused
            >
              {sportCenters.map((option) => (
                <MenuItem key={option.name} value={option}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className="newUser"
              autoFocus
              id="newUserGender"
              margin="dense"
              select
              label="Select Sport Activity"
              required={true}
              color="secondary"
              defaultValue={sportActivities[0] && sportActivities[0].activity}
              onChange={(event) => {
                setNewSportActivity(event.target.value);
                setSportFields(event.target.value.fields)
              }}
              focused
            >
              {sportActivities.map((option) => (
                <MenuItem key={option.activity} value={option}>
                  {option.activity}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className="newUser"
              autoFocus
              id="newUserGender"
              margin="dense"
              select
              label="Select Sport Place"
              required={true}
              color="secondary"
              defaultValue={sportFields[0] && sportFields[0].name}
              onChange={(event) => {
                setNewSportField(event.target.value);
              }}
              focused
            >
              {sportFields.map((option) => (
                <MenuItem key={option.name} value={option}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            </Stack>
            <TextField
              className="newUser"   
              autoFocus
              margin="dense"
              id="newUserBirthDate"
              label="Start Date"
              required={true}
              color="secondary"
              type="date"
              fullWidth
              variant="standard"
              focused
              onChange={(event) => setNewDateFirst(event.target.value)}
            />
              <TextField
              className="newUser"   
              autoFocus
              margin="dense"
              id="newUserBirthDate"
              label="End Date"
              required={true}
              color="secondary"
              type="date"
              fullWidth
              variant="standard"
              focused
              onChange={(event) => setNewDateSecond(event.target.value)}
            /> 
             <TextField
              className="newUser"   
              autoFocus
              multiline
              margin="dense"
              id="newUserBirthDate"
              label="Time Slots"
              required={true}
              color="secondary"
              type="text"
              fullWidth
              helperText="Enter Time Slots in comma seperated list (eg. 15.00-17.00, 17.00-19.00)"
              variant="standard"
              focused
              onChange={(event) => setNewTimeSlots(event.target.value)}
            />       
            <Button className='submitButton' variant="contained" color="secondary" size='large' onClick={() => 
              (newSportCenter === "" || newSportActivity === ""  
              || newSportField === "" || newDateFirst === "" 
              || newDateSecond === "" 
              || newTimeSlots === "") 
              ? alert("Please fill all fields😯")
              : handleSubmitDateTime() }
             > Submit Dates and Times</Button>

    
          </DialogContent>
          </Dialog>

          

          <Stack className='mainStack' direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={6}>
            <div className="ReservationContainer">
              {/*Searching and sorting for gym member*/}
              <Stack className='selectionStack' direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={6}>
                <Toolbar>
                  <Input label="Search Reservations" InputProps={{
                    startAdornment: (<InputAdornment position='start'><Search /></InputAdornment>)
                  }} onChange={handleSearch2} />
                </Toolbar>
                <Box width='12rem'>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={searchSelection2}
                      label="Search By"
                      onChange={handleSearchSelection2}
                    >
                      {headCells2.map(headCell => (
                        !headCell.disableSorting && <MenuItem value={headCell.id}>{headCell.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 800, width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                  <TableHead>
                    <TableRow>
                    {headCells2.map(headCell => (
                        <StyledTableCell key={headCell.id} >
                          {headCell.disableSorting ? headCell.label :
                            <TableSortLabel onClick={() => { handleSortRequest2(headCell.id) }}
                              direction={(orderBy2 === headCell.id) ? order2 : 'asc'} active={orderBy2 == headCell.id}>
                              {headCell.label}
                            </TableSortLabel>}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {reservationsAfterSortingAndPaging2().map((reservation, index) =>
                    (
                      <StyledTableRow key={reservation.id} component="th" scope="row"  >
                        <StyledTableCell className='cellItem' >
                        {reservation.reservationDate}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'>
                        {reservation.reservedTimeInterval}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.reservationActivity.activity}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'  >
                          {reservation.reservationPlace.name}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'>
                          {reservation.reservationField.name}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.reserver.name}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.reserver.phoneNumber}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.reserver.id}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.status}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          <Stack className='mainStack' direction="row"  // This stack is for delete and cancel reservation buttons
                            justifyContent="start"
                            alignItems="start"
                            spacing={0}>
                            <Box className='button1'
                              sx={{
                                '& > :not(style)': {
                                  m: 1,
                                },
                              }}
                            >
                              <IconButton aria-label="Example" onClick={() => { /* it will be modified according to array that comes from backend */
                                handleClickOpen6();
                                setCurrentIndex(reservation)
                                console.log(reservation.id);
                              }}>
                                <FontAwesomeIcon icon={faXmark} />
                              </IconButton>
                              <Dialog
                                open={open6}
                                onClose={handleClose6}
                                aria-labelledby="Warning"
                                aria-describedby="Warning"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Warning 😨"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    You are going to cancel the reservation. Are you sure?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose6}>Cancel</Button>
                                  <Button onClick={() => {
                                    setOpen6(false);
                                    handleCancelStatus(currentIndex);
                                  }} autoFocus>
                                    I am Sure.
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              </Box>
                            {/*Added for setting the attend user option*/}
                            <Box className='button2'
                              sx={{
                                '& > :not(style)': {
                                  m: 1,
                                },
                              }}
                            >
                              <IconButton aria-label="Example" onClick={() => {
                                handleClickOpen5();
                                setCurrentIndex(reservation);
                                console.log(reservation.id); /* it will be modified according to array that comes from backend */
                              }}>
                                <FontAwesomeIcon icon={faCheck} />
                              </IconButton>
                              <Dialog
                                open={open5}
                                onClose={handleClose5}
                                aria-labelledby="Warning"
                                aria-describedby="Warning"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Warning 🤒"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    You are going to change the attend status of the reservation. Are you sure?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose5}>Cancel</Button>
                                  <Button onClick={() => {
                                    setOpen5(false);
                                    handleAttendStatus(currentIndex);
                                  }} autoFocus>
                                    I am Sure.
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </Box>

                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                    }
                  </TableBody>
                </Table>
                <TablePagination component='div' page={page2} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage2}
                  count={reservations.length} onPageChange={handlePageChange2}
                  onRowsPerPageChange={handleRowsPerPageChange2}
                  sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }}>
                </TablePagination>
              </TableContainer>
            </div>
          </Stack>
        </Stack>
      </>
    )
  };

}

export default Reservation;
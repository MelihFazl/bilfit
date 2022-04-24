import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import './Reservation.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

// Button positions will be fixed
// Right side of the table will be fixed
//slide down can be added to the table


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
function createData(resDate, resTimeSlot, resActivity, resPlace, resLocation, resStatus, cancelButton, deleteButton) { // I am not sure for the last two parameters for now 
  return { resDate, resTimeSlot, resActivity, resPlace, resLocation, resStatus };
}
const rows = [
  createData('March 19, 2022', '11.30-12.45', 'Fitness', 'Dormitories', 'Ground Floor', 'Attended', "", ""),
  createData('March 25, 2022', '14.30-15.45', 'Basketball', 'Main Campus', 'Ground Floor', 'Upcoming', "", ""),

];


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function Reservation() {
  const userType = 1; // if its type is 0  => regular user 1=> staff
  const [reservations, setReservations] = useState([]);
  const [checkedState, setCheckedState] = useState(new Array(rows.length).fill(false));
  const [checkedUsers, setCheckedUsers] = useState();
  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users
  const [showInfo2, setInfo2] = useState(() => userType ? 1 : 0); //visibility setting for staff

   useEffect(() => {
    fetch('http://localhost:3000/reservations')
      .then((res) => res.json())
      .then((result) => {
        setReservations(result);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/users/id')
      .then((res) => res.json())
      .then((result) => {
        setCheckedUsers(result);
      });
  }, []);


  const handleOnChange = (position, number) => { // It will be modified according to array that comes from backend
    if (number == 1) {
      const updateAllStates = checkedState.fill(false);
      setCheckedState(updateAllStates);
      const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
      setCheckedState(updatedCheckedState);
    }

  };
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
 
  return (
    <>
      <Stack className='mainStackUser' direction="column"
        spacing={3} alignItems="center"   style={{display: showInfo1  ? "block" : "none" }}    >
        <div> <h1 className='header'>My Reservations</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="ReservationContainer">
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 800, width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Reservation Date</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Time</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Activity</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Location</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Sport Center</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Status</StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {reservations.map((reservation) => (
                    <StyledTableRow key={reservation.id} component="th" scope="row"  >
                      <StyledTableCell className='cellItem'>
                        {reservation.resDate}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.timeSlot}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.activity}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'  >
                        {reservation.location}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {reservation.campus}
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
                            <IconButton aria-label="Example" onClick={() => { alert("I am clicked But1")  /* it will be modified according to array that comes from backend */ }}>
                              <FontAwesomeIcon icon={faXmark} />
                            </IconButton></Box>
                          <Box className='button2'
                            sx={{
                              '& > :not(style)': {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton aria-label="Example">
                              <FontAwesomeIcon icon={faTrashCan} onClick={() => { alert("I am clicked But2")  /* it will be modified according to array that comes from backend */ }} />
                            </IconButton></Box>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >

                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Stack>
      </Stack>
      <Stack className='mainStackStaff' direction="column"
        spacing={3} alignItems="center"   justifyContent="center" style={{ display: showInfo2 ? "block" : "none" }}    >
        <div> <h1 className='header'>Total Reservations</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="ReservationContainer">
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 800, width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='right'>Reservation Date</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Time</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Activity</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Sport Center</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Location</StyledTableCell>
                    <StyledTableCell align='right'>Reserver Name</StyledTableCell>
                    <StyledTableCell align='right'>Reserver Phone</StyledTableCell>
                    <StyledTableCell align='right'>Reserver ID</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Status</StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {reservations.map((reservation) => (
                    <StyledTableRow key={reservation.id} component="th" scope="row"  >
                      <StyledTableCell className='cellItem'>
                        {reservation.resDate}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.timeSlot}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.activity}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'  >
                        {reservation.campus}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {reservation.location}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.reserverName}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.reserverPhone}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.reserverID}
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
                            <IconButton aria-label="Example" onClick={() => { alert("I am clicked But1")  /* it will be modified according to array that comes from backend */ }}>
                              <FontAwesomeIcon icon={faXmark} />
                            </IconButton></Box>
                          <Box className='button2'
                            sx={{
                              '& > :not(style)': {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton aria-label="Example">
                              <FontAwesomeIcon icon={faPenToSquare} onClick={() => { alert("I am clicked But2")  /* it will be modified according to array that comes from backend */ }} />
                            </IconButton></Box>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Stack>
      </Stack>
    </>
  );
}
export default Reservation;
import * as React from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '../Navbar/Button'
import {useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './MakeReservation.css';
import { set } from 'date-fns';
import { format } from "date-fns";


const theme = createTheme({
  palette: {
    secondary: {
      main: '#121212',
      contrastText: "#fff",
    }
  }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F05454',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function createData(name) {
  return { name };
}


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

function MakeReservation() {
  const { reservationId } = useParams();
  const [sportsCenters, setSportsCenters] = useState([]);
  const [sportActivity, setSportActivity] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [newDate, setNewDate] = useState(new Date());

  //Below are for keep new reservstion info
  const [reservation, setReservation] = useState([]);
  const [resSportCenter, setResSportCenter] = useState([]);
  const [resLocation, setResLocation] = useState([]);
  const [resActivity, setResActivity] = useState([]);
  const [resTimeSlot, setResTimeSlot] = useState([]);

  const [date, setDate] = React.useState(new Date());
  const [size, setSize] = React.useState(sportsCenters.length);
  const currentDate = new Date();
  const blue = "#5584AC";
  const white = "#F5F5F5";

  useEffect(() => {
    fetch('http://localhost:8080/reservation/sportCenter')
      .then((res) => res.json())
      .then((result) => {
        setSportsCenters(result);
      });

  }, []);

  const myHistory = useHistory();
  const [checkedState, setCheckedState] = useState(new Array(3).fill(false));
  const [checkedState2, setCheckedState2] = useState(new Array(50).fill(false));
  const [checkedState3, setCheckedState3] = useState(new Array(50).fill(false));

  function handleReservation()
  {
    console.log(resSportCenter);
    console.log("--------")
    console.log(resActivity);
    console.log("--------")
    console.log(resLocation);
    console.log("--------")
    console.log(resTimeSlot);
    console.log("--------")
    console.log(reservation)
    console.log("--------")
    console.log(date)
    fetch('http://localhost:8080/reservation/make?fieldID=' + resLocation.id + "&activityID=" + resActivity.id + "&sportCenterID=" + resSportCenter.id + "&reserverID=" + localStorage.getItem("userid"), {
      method:"POST",
      headers:{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        "reservedTimeInterval": resTimeSlot,
        "reservationDate": date.toISOString().split('T')[0]
      })
    }).then((result) => {
      result.text().then((actualResult) => {
          alert(actualResult)
          if(actualResult.includes("successfully"))
            myHistory.push("/my-reservations")
      })
    })
     
  }
  
  const handleOnChange = (position, number) => {
    if (number == 1) {
      const updateAllStates = checkedState.fill(false);
      setCheckedState(updateAllStates);
      const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
      setCheckedState(updatedCheckedState);
    }
    if (number == 2) {
      const updateAllStates = checkedState2.fill(false);
      setCheckedState2(updateAllStates);
      const updatedCheckedState = checkedState2.map((item, index) => index === position ? !item : item);
      setCheckedState2(updatedCheckedState);
    }

    if (number == 3 ){
      const updateAllStates = checkedState3.fill(false);
      setCheckedState3(updateAllStates);
      const updatedCheckedState = checkedState3.map((item, index) => index === position ? !item : item);
      setCheckedState3(updatedCheckedState);
    }
  };

  const displayActivities = (sportsCenter, index) => {
    console.log("girdik")
    const data = []
    if (resSportCenter.name === sportsCenter.name) {
      sportsCenter.availableActivities.map((activity, index) => (
        data.push(<StyledTableRow key={sportActivity}>
          <StyledTableCell className='cellItem' component="th" scope="row" style={{ backgroundColor: checkedState3.at(index) ? blue : white }} key={"button" + index} onClick={() => { handleOnChange(index, 3); setResActivity(activity) }} >
            {activity.activity}
          </StyledTableCell>
        </StyledTableRow>)));
    }
    return data;
  }

  const displayTimeSlots = (sportsCenter, activity, field, timeSlotsinDay) => {
    const data = [];
    let dbDate = new Date(timeSlotsinDay.date);

    if (sportsCenter.name === resSportCenter.name && activity.activity === resActivity.activity && field.name === resLocation.name && (dbDate.getDay() === date.getDay()) && dbDate.getMonth() === date.getMonth() && dbDate.getFullYear() === dbDate.getFullYear()) {
      timeSlotsinDay.timeSlotList.map((timeSlot, index) => (

        data.push(<FormControlLabel value={timeSlot.timeSlot} control={<Radio />} label={timeSlot.timeSlot} onChange={(event) => setResTimeSlot(event.target.value)} />)))
    }
  
    return data;
  }
  const displayLocation = (sportsCenter, activity) => {
    const data = []
    if (sportsCenter.name === resSportCenter.name && activity.activity === resActivity.activity) {
      data.push(activity.fields.map((field, index) => (
        <StyledTableRow key={index} className={checkedState2.at(index) ? "rowTrue" : "rowFalse"}>
          <StyledTableCell className='cellItem' component="th" scope="row" style={{ backgroundColor: checkedState2.at(index) ? blue : white }} key={"button" + index} onClick={() => { handleOnChange(index, 2); setResLocation(field) }} >
            {field.name}
          </StyledTableCell>
        </StyledTableRow>)));
    }
    return data;
  }

  return (
    <>
      <Stack className='mainStack' direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={8}>
        <Stack direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={8}>
          <div className="centerContainer">
            <TableContainer component={Paper} >
              <Table sx={{ width: '100%', backgroundColor: '#F5F5F5' }} aria-label="customized table"  >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sports Center</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {sportsCenters.map((sportsCenter, index) => (
                    <StyledTableRow key={sportsCenter.id} className={checkedState.at(index) ? "rowTrue" : "rowFalse"} >
                      <StyledTableCell className='cellItem' component="th" scope="row" style={{ backgroundColor: checkedState.at(index) ? blue : white }} key={"button" + index} onClick={() => { handleOnChange(index, 1); setResSportCenter(sportsCenter) }} >
                        {sportsCenter.name}

                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="activityContainer">
            <TableContainer component={Paper}>
              <Table sx={{ width: '100%', backgroundColor: '#F5F5F5' }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sports Activity</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sportsCenters.map((sportsCenter, index) =>
                    displayActivities(sportsCenter, index)
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="fieldContainer">
            <TableContainer component={Paper}>
              <Table sx={{ width: '100%', backgroundColor: '#F5F5F5' }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sports Activity Location</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sportsCenters.map((sportsCenter, index) => (sportsCenter.availableActivities.map((activity, index) =>
                    displayLocation(sportsCenter, activity)
                  )

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={3} >
                <Grid item xs={12} md={6} >

                  <CalendarPicker date={date} onChange={(newDate) => { { if (newDate.getDate() <= (currentDate.getDate() + 2) && newDate.getDate() >= currentDate.getDate() && currentDate.getMonth() == newDate.getMonth() && currentDate.getFullYear() == newDate.getFullYear()) { setDate(newDate); } else { alert("Invalid date (Only next 2 days can be picked)") } } }} />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </div>

          <div className="timeContainer">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Select Time Slot</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                //defaultValue={timeSlots.at(0)}
                name="radio-buttons-group" >
                {sportsCenters.map((sportsCenter, index) => (sportsCenter.availableActivities.map((activity, index) =>
                (activity.fields.map((field, index) => (field.occupiableTimeSlotsOnDay.map((timeSlots, index) =>
                  displayTimeSlots(sportsCenter, activity, field, timeSlots)))
                )))
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </Stack>
        <Stack justifyContent="center"
          alignItems="center">
          <ThemeProvider theme={theme}>
            <Button className='submitButton' variant="contained" color="secondary" size='large' onClick={() => {
              handleReservation()
            }} > Make Reservation</Button>
          </ThemeProvider>


        </Stack>
      </Stack>
    </>

  );

}

export default MakeReservation;

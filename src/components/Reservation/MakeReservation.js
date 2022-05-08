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
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './MakeReservation.css';
import { set } from 'date-fns';



const theme = createTheme({
  palette: {
    secondary: {
      main: '#121212',
      contrastText: "#fff",
    }
    }});

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
  const[sportCenters, setSportCenters] = useState([]);
  const[sportActivity, setSportActivity] = useState([]);
  const[timeSlots, setTimeSlots] = useState([]);

  //Below are for keep new reservstion info
  const[resSportCenter, setResSportCenter] = useState([]);
  const[resActivity, setResActivity] = useState([]);
  const[resDate, setResDate] = useState([]);
  const[resTimeSlot, setResTimeSlot] = useState([]);

  const [date, setDate] = React.useState(new Date());
  const [size, setSize] = React.useState(sportCenters.length);
  const currentDate = new Date();
  const blue = "#5584AC";
  const white = "#F5F5F5";

  useEffect(() => {
    fetch('http://localhost:3000/sportCenters')
      .then((res) => res.json())
      .then((result) => {
        setSportCenters(result);

      });
      
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/activity')
      .then((res) => res.json())
      .then((result) => {
        setSportActivity(result);
        setSize(sportActivity.length);
      });
  }, []);

  
  const [checkedState, setCheckedState] = useState(new Array(3).fill(false));
  const [checkedState2, setCheckedState2] = useState(new Array(50).fill(false));
 
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
  };

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
                  {sportCenters.map((row, index) => (
                    <StyledTableRow key={row.id} className={checkedState.at(index) ? "rowTrue" : "rowFalse"} >
                      <StyledTableCell className='cellItem' component="th" scope="row" style={{ backgroundColor: checkedState.at(index) ? blue : white }} key={"button" + row.id} onClick={() => { handleOnChange(index, 1); setResSportCenter(row.center) }} >
                        {row.center}
                        {checkedState.length.toString()}
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
                  {sportActivity.map((row, index) => (
                    <StyledTableRow key={row.id} className={checkedState2.at(index) ? "rowTrue" : "rowFalse"}>
                      <StyledTableCell className='cellItem' component="th" scope="row" style={{ backgroundColor: checkedState2.at(index) ? blue : white }} key={"button" + row.id} onClick={() => { handleOnChange(index, 2); setResActivity(row.activity)  }} >
                        {row.activity}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={3} >
                <Grid item xs={12} md={6} >
                  <CalendarPicker date={date} onChange={(newDate) => {{ if (newDate.getDate() <= (currentDate.getDate() + 2) && newDate.getDate() >= currentDate.getDate() && currentDate.getMonth() == newDate.getMonth() && currentDate.getFullYear() == newDate.getFullYear()) { setDate(newDate) } else { alert("Invalid date (Only next 2 days can be picked)") }  }}} />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </div>
          <div className="timeContainer">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Select Time Slot</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={timeSlots.at(0)}
                name="radio-buttons-group" >
                {timeSlots.map((row, index) => (
                  <FormControlLabel value={row} control={<Radio />} label={row}  />))}

              </RadioGroup>
            </FormControl>
          </div>
        </Stack>
        <Stack justifyContent="center"
          alignItems="center">
          <ThemeProvider theme={theme}>
            <Button className='submitButton' variant="contained" color="secondary" size='large' onClick={() => {
    alert('clicked');
  }} > Make Reservation</Button>
          </ThemeProvider>
        </Stack>
      </Stack>
    </>
  );

}

export default MakeReservation;

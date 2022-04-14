
import * as React from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
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
import { color } from '@mui/system';
import './Reservation.css';



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
const rows = [
  createData('Main Campus'),
  createData('Dorm'),
  createData('East Campus'),

];
const rows2 = [
  createData('Archery Poligon'),
  createData('Basketball'),
  createData('Volleyball'),
  createData('Fitness'),
  createData('Squash'),
  createData('Martial Arts'),
  createData('Swimming'),
  createData('Table Tennis'),

];
const rows3 = [
  createData('13:30-15:30'),
  createData('16:30-18:30'),
  createData('19:30-21:30'),

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
const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

function Reservation() {
  const { reservationId } = useParams();
  const [checkedState, setCheckedState] = useState(new Array(rows.length).fill(false));
  const [checkedState2, setCheckedState2] = useState(new Array(rows2.length).fill(false));
  const [date, setDate] = React.useState(new Date());
  const currentDate = new Date();
  const blue = "#5584AC";
  const white = "#F5F5F5";

  

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
              {rows.map((row, index) => (
                <StyledTableRow key={row.name}  className= {checkedState.at(index) ? "rowTrue" : "rowFalse"} >
                  <StyledTableCell  className = 'cellItem'component="th" scope="row" style= {{backgroundColor: checkedState.at(index) ? blue : white }} key={"button" + row.key} onClick={() => { handleOnChange(index, 1)}} >
                    {row.name}
                    {checkedState[index].toString()}
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
              {rows2.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell className='cellItem' component="th" scope="row" style= {{backgroundColor: checkedState2.at(index) ? blue : white }} key={"button" + row.key} onClick={() => { handleOnChange(index, 2) }} >
                    {row.name}
                    {checkedState2[index].toString()}
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
              <CalendarPicker date={date} onChange={(newDate) => {if(newDate.getDate() <= (currentDate.getDate() + 2) &&  newDate.getDate() >= currentDate.getDate()  && currentDate.getMonth == newDate.getMonth && currentDate.getFullYear == newDate.getFullYear){setDate(newDate) } else {alert("Invalid date (Only next 2 days can be picked)")}}} />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </div>
      <div className="timeContainer">
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Select Time Slot</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue= {rows3.at(0).name}
        name="radio-buttons-group" > 
        {rows3.map((row, index) => (
        <FormControlLabel value= {row.name} control={<Radio />} label= {row.name} />))}
        
      </RadioGroup>
    </FormControl>
      </div>
    </Stack>

  );

}

export default Reservation;

import * as React from 'react';
import { useEffect } from 'react';
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
import PropTypes from 'prop-types';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faFilePen } from '@fortawesome/free-solid-svg-icons/faFilePen';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


//ToDos: Button's on click functions can be added
//seperating staff and user (not sure)
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F05454',
      color: theme.palette.common.white,
      fontSize: 15
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    
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

function SportsCourses(){
const userType = 0; // if its type is 0  => regular user 1=> staff
  const [courses, setCourses] = useState([]);
  //variables for unique button states 
  const [checkedState1, setCheckedState1] = useState(new Array().fill(false));
  const [checkedState2, setCheckedState2] = useState(new Array().fill(false));
  const [checkedState3, setCheckedState3] = useState(new Array().fill(false));
  const [checkedState4, setCheckedState4] = useState(new Array().fill(false));
  const [checkedState5, setCheckedState5] = useState(new Array().fill(false));
  const [checkedState6, setCheckedState6] = useState(new Array().fill(false));
  const [checkedState7, setCheckedState7] = useState(new Array().fill(false));
  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users and staff
  const [open1, setOpen1] = React.useState(false);



  useEffect(() => {
    fetch('http://localhost:3000/reservations')
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      });
  }, []);

  
  /**
   * This function changes the situation of the buttons when the are clicked
   * @param {it is the position of the row} position 
   * @param {it shows which button is clicked } number 
   */
  const handleOnChange = (position, number) => { // It will be modified according to array that comes from backend
    if(number == 1){
      const updateAllStates = checkedState1.fill(false);
      setCheckedState1(updateAllStates);
      const updatedCheckedState = checkedState1.map((item, index) => index === position ? !item : item);
      setCheckedState1(updatedCheckedState);
    }
    if(number == 2){
      const updateAllStates = checkedState2.fill(false);
      setCheckedState2(updateAllStates);
      const updatedCheckedState = checkedState2.map((item, index) => index === position ? !item : item);
      setCheckedState2(updatedCheckedState);
    }
    if(number == 3){
      const updateAllStates = checkedState3.fill(false);
      setCheckedState3(updateAllStates);
      const updatedCheckedState = checkedState3.map((item, index) => index === position ? !item : item);
      setCheckedState3(updatedCheckedState);
    }
    if(number == 4){
      const updateAllStates = checkedState4.fill(false);
      setCheckedState4(updateAllStates);
      const updatedCheckedState = checkedState4.map((item, index) => index === position ? !item : item);
      setCheckedState4(updatedCheckedState);
    }
    if(number == 5){
      const updateAllStates = checkedState5.fill(false);
      setCheckedState5(updateAllStates);
      const updatedCheckedState = checkedState5.map((item, index) => index === position ? !item : item);
      setCheckedState5(updatedCheckedState);
    }
    if(number == 6){
      const updateAllStates = checkedState6.fill(false);
      setCheckedState6(updateAllStates);
      const updatedCheckedState = checkedState6.map((item, index) => index === position ? !item : item);
      setCheckedState6(updatedCheckedState);
    }
    if(number == 7){
      const updateAllStates = checkedState7.fill(false);
      setCheckedState7(updateAllStates);
      const updatedCheckedState = checkedState7.map((item, index) => index === position ? !item : item);
      setCheckedState7(updatedCheckedState);
    }
    

  };

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

    return(
        <>
        <Stack className='mainStackUser' direction="column" 
          spacing={3} alignItems="center" style={{ display: showInfo1 ? "block" : "none" }}    >
           <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> <h1 className='header'> Available Sports Courses</h1> </div>
          <Stack className='mainStack' direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={6}>
            <div className="CoursesContainer">
              <TableContainer   component={Paper} >
                <Table sx={{   width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                  <TableHead>
                    <TableRow hover="false">
                      <StyledTableCell>Activity</StyledTableCell>
                      <StyledTableCell align='right'> Program</StyledTableCell>
                      <StyledTableCell align='right'>Sport Center </StyledTableCell>
                      <StyledTableCell align='right'> Location</StyledTableCell>
                      <StyledTableCell align='right'> Last Registration</StyledTableCell>
                      <StyledTableCell align='right'> Available Quota</StyledTableCell>
                      <StyledTableCell align='right'></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody  hover="false">
                    {courses.map((course,index) => (
                      <StyledTableRow key={courses.id} component="th" scope="row"  >
                        <StyledTableCell  className='cellItem'>
                        {course.activity}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                        <Table  size="small" aria-label="a dense table">
                                <TableRow><StyledTableCell > {course.timeSlot1 }</StyledTableCell></TableRow>
                                <TableRow><StyledTableCell> {course.timeSlot2 }</StyledTableCell></TableRow>
                          </Table>
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'  >
                          {course.campus}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'>
                          {course.location}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'>
                          {course.status}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'>
                          {course.totalNumber}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          <Stack className='mainStack' direction="row"  // This stack is for enroll reservation button
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
                              <IconButton aria-label="Example">
                                <FontAwesomeIcon icon={faFilePen} onClick={() => { handleOnChange(index,1); alert(index)  /* it will be modified according to array that comes from backend */ }} />
                              </IconButton></Box>
                          </Stack>
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
    )
}
export default SportsCourses;
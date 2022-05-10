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
import { Button } from '../Navbar/Button'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';




//ToDos: Button's on click functions can be added
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



const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const week = [
  {
    value: 'Monday',
    label: 'Monday',
  },
  {
    value: 'Tuesday',
    label: 'Tuesday',
  },
  {
    value: 'Wednesday',
    label: 'Wednesday',
  },
  {
    value: 'Thursday',
    label: 'Thursday',
  },
  {
    value: 'Friday',
    label: 'Friday',
  },
  {
    value: 'Saturday',
    label: 'Saturday',
  },
  {
    value: 'Sunday',
    label: 'Sunday',
  }
]

const sportCenters = [
  {
    value: '1',
    label: 'Main Sport Center',
  },
  {
    value: '2',
    label: 'Dormitory Sport Center',
  },
  {
    value: '3',
    label: 'East Sport Center',
  },
];
function EnrollSportsCourses() {
  const userType = (localStorage.getItem("usertype") == "staff") ? 1 : 0;
  const [courses, setCourses] = useState([]);
  //variables for unique button states 
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users and staff
  const [open1, setOpen1] = React.useState(false); // these are for dialogs
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);


  //Below are new course data when staff added
  const [newCourseDay1, setNewCourseDay1] = useState('');
  const [newCourseTime1, setNewCourseTime1] = useState('');
  const [newCourseDay2, setNewCourseDay2] = useState('');
  const [newCourseTime2, setNewCourseTime2] = useState('');
  const [newCourseDay3, setNewCourseDay3] = useState('');
  const [newCourseTime3, setNewCourseTime3] = useState('');
  const [newCourseDay4, setNewCourseDay4] = useState('');
  const [newCourseTime4, setNewCourseTime4] = useState('');
  const [newCourseActivity, setNewCourseActivity] = useState('');
  const [newCourseLocation, setNewCourseLocation] = useState('');
  const [newCourseSportCenter, setNewCourseSportCenter] = useState('');
  const [newCourseLastRegDate, setNewCourseLastRegDate] = useState('');
  const [newCourseTotalQuota, setNewCourseTotalQuota] = useState('');
  const [newCourseStartDate, setNewCourseStartDate] = useState('');
  const [newCourseFinishDate, setNewCourseFinishDate] = useState('');
  const [newCourseWeeklyCount, setNewCourseWeeklyCount] = useState(0);
  const [weekProgram, setWeekProgram] = useState([]);
  const [weekTimeProgram, setWeekTimeProgram] = useState([]);

  const updatedCheckedState = [];
  /* */

  /*const handleOnChange = (number, text) => {
    if (number === 0) {
      weekProgram.push(text);
      //setWeekProgram(updatedCheckedState);
      console.log(text);
    }
    if (number === 1) {
      weekTimeProgram.push(text);
    }
  };

  const render = (count) => {
    const items = [];
    for (var i = 0; i < count; i++) {
      items.push(
        <>
          <TextField className="newCourse" style={{ marginRight: '0.25rem', marginLeft: '0.25rem', marginTop: '0.25rem', marginBottom: '0.25rem' }} onChange={event => { setNewCourseDay(event.target.value); handleOnChange(0, event.target.value) }}
            autoFocus
            id="Course Day"
            select
            label="Course Day"
            required
            color='secondary'
            helperText="Please select Course Day"
            focused
          >
            {week.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField className="newCourse" onChange={event => { setNewCourseTime(event.target.value); handleOnChange(1, event.target.value) }}
            autoFocus
            id="newCourseTime"
            label="Course Time"
            type="time"
            color='secondary'
            required

            variant="standard"
            focused
          />
        </>
      )
    }
    return items;
  }*/

  const deleteCourse = (courseID) => {
    fetch('http://localhost:8080/course/delete/' + courseID, { method: 'DELETE' })
      .then((result) => {
        result.text().then((resultStr) => {
          alert(resultStr);
        })
      });
  }

  useEffect(() => {
    fetch('http://localhost:8080/course')
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      });
  }, [courses]);

  const enrollNewCourse = (courseID) => {
    fetch('http://localhost:8080/course/enroll/' + courseID + '/participant/' + localStorage.getItem("userid"), { method: 'POST' })
      .then((result) => {
        result.text().then((resultStr) => {
          alert(resultStr);
        })
      });
  }

  const cancelNewResInfo = () => {
    setNewCourseDay1('');
    setNewCourseTime1('');
    setNewCourseDay2('');
    setNewCourseTime2('');
    setNewCourseDay3('');
    setNewCourseTime3('');
    setNewCourseDay4('');
    setNewCourseTime4('');
    setNewCourseActivity('');
    setNewCourseLocation('');
    setNewCourseActivity('');
    setNewCourseLastRegDate('');
    setNewCourseTotalQuota('');
    setNewCourseStartDate('');
    setNewCourseFinishDate('');
  }

  const addNewSportsCourse = () => {
    if (newCourseDay1 === '' || newCourseTime1 === '' || newCourseActivity === '' || newCourseLocation === '' || newCourseActivity === '' || newCourseLastRegDate === '' || newCourseTotalQuota === '' || newCourseStartDate === '' || newCourseFinishDate === '') {
      alert("You have empty required fields");
    }
    else {
      let request = "http://localhost:8080/course/add?";
      if (newCourseDay1 !== '' && newCourseTime1 !== '')
        request = request + "courseDays=" + newCourseDay1 + " " + newCourseTime1 + "&";
      if (newCourseDay2 !== '' && newCourseTime2 !== '')
        request = request + "courseDays=" +  newCourseDay2 + " " + newCourseTime2 + "&";
      if (newCourseDay3 !== '' && newCourseTime3 !== '')
        request = request + "courseDays=" +  newCourseDay3 + " " + newCourseTime3 + "&";
      if (newCourseDay4 !== '' && newCourseTime4 !== '')
        request = request + "courseDays=" +  newCourseDay4 + " " + newCourseTime4 + "&";

      console.log(request + "sportCenterID=" + newCourseSportCenter);
      fetch(request + "sportCenterID=" + newCourseSportCenter, {
        method: "POST",
        Accept: "/",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        headers: {
          Accept: "application/json",
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          type: newCourseActivity,
          startingDate: newCourseStartDate, 
          endingDate: newCourseFinishDate,
          field: newCourseLocation,
          maxQuota: newCourseTotalQuota,
          lastRegistrationDate: newCourseLastRegDate
        })
      }).then((result) => {
        result.text().then((actualResult) => {
          alert(actualResult)
        })
      })
      setOpen3(false); cancelNewResInfo();
    }
    /*console.log(newCourseActivity);
    console.log(newCourseFinishDate);
    console.log(newCourseLastRegDate);
    console.log(newCourseStartDate);
    console.log(newCourseLocation);
    console.log(newCourseSportCenter);
    console.log(newCourseTotalQuota);
    console.log(newCourseDay1);*/
  }
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
      <div style={{ display: showInfo1 ? "none" : "block", justifyContent: 'right', alignItems: 'center', marginRight: '5rem', marginTop: '2rem' }}>
        <Button onClick={() => setOpen3(true)} > Add New Sports Course </Button>
        <Dialog open={open3} onClose={() => setOpen3(true)}  >
          <DialogTitle>Add a Sports Course </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the necessary information of a new sports course.
            </DialogContentText>
            <TextField className="newCourse" onChange={event => setNewCourseActivity(event.target.value)}
              autoFocus
              margin="dense"
              id="newCourseActivity"
              label="Course Activity"
              color='secondary'
              type="text"
              fullWidth
              variant="standard"
              required

              focused
            />
            <TextField className="newCourse" onChange={event => setNewCourseStartDate(event.target.value)}
              autoFocus
              margin="dense"
              id={"newCourseStartDate"}
              label="Course Start Date"
              color='secondary'
              type="date"
              required

              fullWidth
              variant="standard"
              focused
            />
            <TextField className="newCourse" onChange={event => setNewCourseFinishDate(event.target.value)}
              autoFocus
              margin="dense"
              id={"newCourseFinishDate"}
              required

              color='secondary'

              label="Course Finish Date"
              type="date"
              fullWidth
              variant="standard"
              focused
            />
            <TextField className="newCourse" style={{ marginRight: '0.25rem', marginLeft: '0.25rem', marginTop: '0.25rem', marginBottom: '0.25rem' }} onChange={event => { setNewCourseDay1(event.target.value) }}
              autoFocus
              id="Course Day"
              select
              label="Course Day"
              type="date"
              required
              color='secondary'
              helperText="Please select Course Day"
              focused
            >
              {week.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField className="newCourse" onChange={event => { setNewCourseTime1(event.target.value) }}
              autoFocus
              id="newCourseTime"
              label="Course Time"
              type="time"
              color='secondary'
              required
              variant="standard"
              focused
            />
            <TextField className="newCourse" style={{ marginRight: '0.25rem', marginLeft: '0.25rem', marginTop: '0.25rem', marginBottom: '0.25rem' }} onChange={event => { setNewCourseDay2(event.target.value) }}
              autoFocus
              id="Course Day"
              select
              label="Course Day"
              type="date"
              color='secondary'
              helperText="Please select Course Day"
              focused
            >
              {week.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField className="newCourse" onChange={event => { setNewCourseTime2(event.target.value) }}
              autoFocus
              id="newCourseTime"
              label="Course Time"
              type="time"
              color='secondary'
              variant="standard"
              focused
            />
            <TextField className="newCourse" style={{ marginRight: '0.25rem', marginLeft: '0.25rem', marginTop: '0.25rem', marginBottom: '0.25rem' }} onChange={event => { setNewCourseDay3(event.target.value) }}
              autoFocus
              id="Course Day"
              select
              label="Course Day"
              type="date"
              color='secondary'
              helperText="Please select Course Day"
              focused
            >
              {week.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField className="newCourse" onChange={event => { setNewCourseTime3(event.target.value) }}
              autoFocus
              id="newCourseTime"
              label="Course Time"
              type="time"
              color='secondary'

              variant="standard"
              focused
            />
            <TextField className="newCourse" style={{ marginRight: '0.25rem', marginLeft: '0.25rem', marginTop: '0.25rem', marginBottom: '0.25rem' }} onChange={event => { setNewCourseDay4(event.target.value) }}
              autoFocus
              id="Course Day"
              select
              label="Course Day"
              type="date"
              color='secondary'
              helperText="Please select Course Day"
              focused
            >
              {week.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField className="newCourse" onChange={event => { setNewCourseTime4(event.target.value) }}
              autoFocus
              id="newCourseTime"
              label="Course Time"
              type="time"
              color='secondary'
              variant="standard"
              focused
            />
            <TextField className="newCourse" onChange={event => setNewCourseLastRegDate(event.target.value)} style={{ marginBottom: '0.5rem' }}
              autoFocus
              margin="dense"
              id="newCourseLastRegDate"
              color='secondary'
              label="Course Last Registration Date"
              type="date"
              required

              fullWidth
              variant="standard"
              focused
            />
            <TextField className="newCourse" onChange={event => setNewCourseSportCenter(event.target.value)}
              autoFocus
              id="newCourseSportsCenter"
              required

              select
              label="Course Sports Center"
              color='secondary'
              helperText="Please select Course Sports Center"
              value={newCourseSportCenter}
              focused
            >
              {sportCenters.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField className="newCourse" onChange={event => setNewCourseLocation(event.target.value)}
              autoFocus
              margin="dense"
              id="newCourseLocation"
              color='secondary'
              required

              label="Course Location"
              type="text"
              fullWidth
              variant="standard"
              focused
            />
            <TextField className="newCourse" onChange={event => setNewCourseTotalQuota(event.target.value)}
              autoFocus
              margin="dense"
              id="newCourseTotalQuota"
              label="Course Total Quota"
              required

              type="number"
              color='secondary'

              fullWidth
              variant="standard"
              focused
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpen3(false); cancelNewResInfo();
            }} >Cancel </Button>
            <Button onClick={() => {
              addNewSportsCourse();
            }}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>

      <Stack className='mainStackUser' direction="column"
        spacing={3} alignItems="center"    >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'> Available Sports Courses</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="CoursesContainer">
            <TableContainer component={Paper} >
              <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                <TableHead>
                  <TableRow hover="false">
                    <StyledTableCell>Activity</StyledTableCell>
                    <StyledTableCell align='right'> Weekly Course Program</StyledTableCell>
                    <StyledTableCell align='right'> Start- Finish Date </StyledTableCell>
                    <StyledTableCell align='right'>Sports Center</StyledTableCell>
                    <StyledTableCell align='right'> Location</StyledTableCell>
                    <StyledTableCell align='right'> Last Registration</StyledTableCell>
                    <StyledTableCell align='right'> Available Quota</StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody hover="false">
                  {courses.map((course, index) => (
                    <StyledTableRow key={courses.id} component="th" scope="row"  >
                      <StyledTableCell className='cellItem'>
                        {course.type}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Table size="small" aria-label="a dense table">
                          {course.courseDays.map(day => (
                            <TableRow><StyledTableCell >{day}</StyledTableCell></TableRow>
                          ))}
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Table size="small" aria-label="a dense table">
                          <TableRow><StyledTableCell > {course.startingDate}</StyledTableCell></TableRow>
                          <TableRow><StyledTableCell> {course.endingDate}</StyledTableCell></TableRow>
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'  >
                        {course.location.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {course.field}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {course.lastRegistrationDate}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {course.availableQuota}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Stack className='mainStack' direction="row"  // This stack is for enroll reservation button
                          justifyContent="start"
                          alignItems="start"
                          spacing={0}>

                          <Box className='button1' style={{ display: showInfo1 ? "block" : "none" }}
                            sx={{
                              '& > :not(style)': {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton aria-label="Example">
                              <FontAwesomeIcon icon={faFilePen} onClick={() => { setOpen1(true); setCurrentIndex(course.id) }} /* it will be modified according to array that comes from backend */ />
                            </IconButton></Box>

                          <Box className='button2' style={{ display: showInfo1 ? "none" : "block" }}
                            sx={{
                              '& > :not(style)': {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton aria-label="Example">
                              <FontAwesomeIcon icon={faXmark} onClick={() => { setOpen2(true); setCurrentIndex(course.id) }} /* it will be modified according to array that comes from backend */ />
                            </IconButton></Box>
                          <Dialog
                            open={open1}
                            onClose={() => setOpen1(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {""}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                You should attend the classes regularly. Are you sure to enroll the course?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button color='secondary' onClick={() => setOpen1(false)}>Cancel</Button>
                              <Button color='secondary' onClick={() => { setOpen1(false); enrollNewCourse(currentIndex) }} autoFocus>
                                Enroll
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <Dialog
                            open={open2}
                            onClose={() => setOpen2(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {""}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                If you click "Delete" button, you will delete all enrollments about this course. Are you sure to delete this course?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button color='secondary' onClick={() => setOpen2(false)}>Cancel</Button>
                              <Button color='secondary' onClick={() => { setOpen2(false); deleteCourse(currentIndex) }} autoFocus>
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
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
export default EnrollSportsCourses;
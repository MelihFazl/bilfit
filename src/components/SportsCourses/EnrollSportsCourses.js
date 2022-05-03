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
import Button from '@mui/material/Button';
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
      value: 'Main',
      label: 'Main Sport Center',
  },
  {
      value: 'Dorm',
      label: 'Dormitory Sport Center',
  },
  {
      value: 'East',
      label: 'East Sport Center',
  },
];
function EnrollSportsCourses() {
  const userType = 1; // if its type is 0  => regular user 1=> staff
  const [courses, setCourses] = useState([]);
  //variables for unique button states 

  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users and staff
  const [open1, setOpen1] = React.useState(false); // these are for dialogs
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);


  //Below are new course data when staff added
  const [newCourseDate, setNewCourseDate] = useState('');
  const [newCourseTime, setNewCourseTime] = useState('');
  const [newCourseActivity, setNewCourseActivity] = useState('');
  const [newCourseLocation, setNewCourseLocation] = useState('');
  const [newCourseSportCenter, setNewCourseSportCenter] = useState('');
  const [newCourseLastRegDate, setNewCourseLastRegDate] = useState('');
  const [newCourseTotalNumber, setNewCourseTotalQuota] = useState('');
  const [newCourseStartDate, setNewCourseStartDate] = useState('');
  const [newCourseFinishDate, setNewCourseFinishDate] = useState('');
  const [newCourseWeeklyCount, setNewCourseWeeklyCount] = useState(0);

/* */
  const render = (count) => {
    const items = [];
    for (var i = 0; i < count; i++) {
      items.push(
        <>
          <TextField className="newCourse" style = {{marginRight: '0.25rem', marginLeft: '0.25rem',  marginTop: '0.25rem',  marginBottom: '0.25rem'}} onChange={event => setNewCourseTime(event.target.value)}
            autoFocus
            id="Course Date"
            select
            label="Course Date"
            required
            color='secondary'
            helperText="Please select Course Date"
            focused
          >
            {week.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField className="newCourse" onChange={event => setNewCourseFinishDate(event.target.value)/*bilmiyorum*/}
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
  }

  useEffect(() => {
    fetch('http://localhost:3000/reservations')
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      });
  }, []);

  const enrollNewCourse = (courseID) => {
    // This function will take the chosen course id and sends to the database
  }

  const deleteCourse = (courseID) => {
    // This function will take the chosen course id and delete it from the database
  }


  const addNewSportsCourse = () => {
    // This function will add the new course to the database

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
              id={"newTournamentStartDate"}
              label="Tournament Start Date"
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
              id={"newTournamentFinishDate"}
              required

              color='secondary'

              label="Tournament Finish Date"
              type="date"
              fullWidth
              variant="standard"
              focused
            />
            <TextField className="newCourse" onChange={event => setNewCourseWeeklyCount(event.target.value)} 
              autoFocus
              margin="dense"
              id="newCourseWeeklyCount"
              label="Course Program Weekly Count"
              required

              type="number"
              color='secondary'

              fullWidth
              variant="standard"
              focused
            />
            {render(newCourseWeeklyCount)}

            <TextField className="newCourse" onChange={event => setNewCourseLastRegDate(event.target.value)} style={{marginBottom: '0.5rem'}}
              autoFocus
              margin="dense"
              id="newCourseLastRegDate"
              color='secondary'
              label="Course Last Registration Date"
              type="text"
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
          <TextField className="newCourse" onChange={event => setNewCourseLocation(event.target.value)} style={{marginLeft: '0.5rem'}}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpen3(false);
            }} >Cancel </Button>
            <Button onClick={() => {
              setOpen3(false); addNewSportsCourse();
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
                        {course.activity}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Table size="small" aria-label="a dense table">
                          <TableRow><StyledTableCell > {course.timeSlot1/*This will change the type of data*/}</StyledTableCell></TableRow>
                          <TableRow><StyledTableCell> {course.timeSlot2/*This will change the type of data*/}</StyledTableCell></TableRow>
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Table size="small" aria-label="a dense table">
                          <TableRow><StyledTableCell > {course.startDate}</StyledTableCell></TableRow>
                          <TableRow><StyledTableCell> {course.finishDate}</StyledTableCell></TableRow>
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

                          <Box className='button1' style={{ display: showInfo1 ? "block" : "none" }}
                            sx={{
                              '& > :not(style)': {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton aria-label="Example">
                              <FontAwesomeIcon icon={faFilePen} onClick={() => setOpen1(true)} /* it will be modified according to array that comes from backend */ />
                            </IconButton></Box>

                          <Box className='button2' style={{ display: showInfo1 ? "none" : "block" }}
                            sx={{
                              '& > :not(style)': {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton aria-label="Example">
                              <FontAwesomeIcon icon={faXmark} onClick={() => setOpen2(true)} /* it will be modified according to array that comes from backend */ />
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
                              <Button color='secondary' onClick={() => { setOpen1(false); enrollNewCourse(course.id) }} autoFocus>
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
                              <Button color='secondary' onClick={() => { setOpen2(false); deleteCourse(course.id) }} autoFocus>
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
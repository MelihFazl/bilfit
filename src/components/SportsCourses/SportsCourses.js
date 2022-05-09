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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


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


function SportsCourses() {
    const userType = (localStorage.getItem("usertype") == "staff") ? 1 : 0;
    const [courses, setCourses] = useState([]);
    //variables for unique button states 

    useEffect(() => {
        if (userType == 1) {
            fetch('http://localhost:8080/course')
                .then((res) => res.json())
                .then((result) => {
                    setCourses(result);
                });
        }
        else if (userType == 0) {
            fetch('http://localhost:8080/course/participant/' + localStorage.getItem("userid"))
                .then((res) => res.json())
                .then((result) => {
                    setCourses(result);
                });
        }
    }, [courses]);

    const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users and staff
    const [open1, setOpen1] = React.useState(false); // these are for dialogs
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const leaveCourse = (courseID) => {
        if (userType == 1) {
            fetch('http://localhost:8080/course/delete/' + courseID, { method: 'DELETE' })
                .then((result) => {
                    result.text().then((resultStr) => {
                        alert(resultStr);
                    })
                });
        }
        else if (userType == 0) {
            fetch('http://localhost:8080/course/remove/' + courseID + '/participant/' + localStorage.getItem("userid"), { method: 'POST' })
                .then((result) => {
                    result.text().then((resultStr) => {
                        alert(resultStr);
                    })
                });

        }
    }

    return (
        <>
            <Stack className='mainStackUser' direction="column" style={{ display: showInfo1 ? "block" : "none" }}
                spacing={3} alignItems="center"    >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'> My Sports Courses</h1> </div>
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
                                            <StyledTableCell className='cellItem' >
                                                <Stack className='mainStack' direction="row"  // This stack is for enroll course button
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
                                                            <FontAwesomeIcon icon={faXmark} onClick={() => { setOpen1(true);; setCurrentIndex(course.id) }} /* it will be modified according to array that comes from backend */ />
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
                                                                If you click "Leave" button, you cannot attend the course anymore. Are you sure to leave the course?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button color='secondary' onClick={() => setOpen1(false)}>Cancel</Button>
                                                            <Button color='secondary' onClick={() => { setOpen1(false); leaveCourse(currentIndex) }} autoFocus>
                                                                Leave
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
            <Stack className='mainStackUser' direction="column" style={{ display: showInfo1 ? "none" : "block" }}
                spacing={3} alignItems="center"    >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'> Enrolled Courses</h1> </div>
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
                                        <StyledTableCell align='right'> Last Registration Date</StyledTableCell>
                                        <StyledTableCell align='right'> Enrolled Gym Members</StyledTableCell>
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
                                            <StyledTableCell>
                                                <Table size="small" aria-label="a dense table">
                                                    {course.participants.map(participant => (
                                                        <TableRow><StyledTableCell >{participant.name}</StyledTableCell></TableRow>

                                                    ))}
                                                </Table>
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                <Stack className='mainStack' direction="row"  // This stack is for enroll course button
                                                    justifyContent="start"
                                                    alignItems="start"
                                                    spacing={0}>

                                                    <Box className='button2'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton aria-label="Example">
                                                            <FontAwesomeIcon icon={faXmark} onClick={() => { setOpen2(true);; setCurrentIndex(course.id) }} /* it will be modified according to array that comes from backend */ />
                                                        </IconButton></Box>

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
                                                            <Button color='secondary' onClick={() => { setOpen2(false); leaveCourse(currentIndex) }} autoFocus>
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
export default SportsCourses;
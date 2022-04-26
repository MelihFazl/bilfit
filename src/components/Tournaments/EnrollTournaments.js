import * as React from 'react';
import './EnrollTournaments.css';
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
import { faFilePen } from '@fortawesome/free-solid-svg-icons/faFilePen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//TODOS :
// add action to submit button
//it may be needed unique text inputs
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


function EnrollTournaments() {
    const userType = 0;
    const [checkedState1, setCheckedState1] = useState(new Array().fill(false)); //array of unique buttons
    const [tournaments, setTournaments] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [studentID, setStudentID] = useState('');
    const[checkStudentID, setCheckStudentID] = useState(true); //trying
    const[teammates, setTeammates] = useState(new Array(3).fill('')); //it will change according to a value that comes from database


    const handleOnChange = (position, number) => { // It will be modified according to array that comes from backend
        if (number == 1) {
            const updateAllStates = checkedState1.fill(false);
            setCheckedState1(updateAllStates);
            const updatedCheckedState = checkedState1.map((item, index) => index === position ? !item : item);
            setCheckedState1(updatedCheckedState);
          
        }
    }

    const handleSetTeammates = (value , position) =>{
        const updatedCheckedState = teammates.map((item, index) => index === position ? item = value : item);
        setTeammates(updatedCheckedState);
    }

    const handleClickOpen = (position) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //fetching data from restAPI
    useEffect(() => {
        fetch('http://localhost:3000/reservations')
            .then((res) => res.json())
            .then((result) => {
                setTournaments(result);
            });
    }, []);

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
                spacing={3} alignItems="center"    >
                <div> <h1 className='header'>Available Tournaments</h1> </div>
                <Stack className='mainStack' direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}>
                    <div className="TournamentsContainer">
                        <TableContainer component={Paper} >
                            <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tournaments Date</StyledTableCell>
                                        <StyledTableCell align='right'>Tournaments Time</StyledTableCell>
                                        <StyledTableCell align='right'>Tournaments Activity</StyledTableCell>
                                        <StyledTableCell align='right'>Tournaments Location</StyledTableCell>
                                        <StyledTableCell align='right'>Sport Center</StyledTableCell>
                                        <StyledTableCell align='right'>Last Registration Date</StyledTableCell>
                                        <StyledTableCell align='right'></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {tournaments.map((tournament) => (
                                        <StyledTableRow key={tournament.id} component="th" scope="row"  >
                                            <StyledTableCell className='cellItem'>
                                                {tournament.resDate}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {tournament.timeSlot}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {tournament.activity}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'  >
                                                {tournament.location}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'>
                                                {tournament.campus}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {tournament.status} {studentID}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                <Stack className='mainStack' direction="row"  // This stack is for delete and cancel reservation buttons
                                                    justifyContent="start"
                                                    alignItems="start"
                                                    spacing={0}>
                                                    <Box className='enrollButton'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton aria-label="Example" onClick={handleClickOpen} >
                                                            <FontAwesomeIcon icon={faFilePen} />
                                                        </IconButton>
                                                    </Box>
                                                    <Dialog open={open} onClose={handleClose}>
                                                        <DialogTitle>Enroll the Tournament</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Please enter your teammates student IDs if you have.
                                                            </DialogContentText>
                                                            {teammates.map((teammate, index) => (
                                                            <TextField className={"teammate" + index} onChange={event => handleSetTeammates((event.target.value), index)}
                                                                autoFocus
                                                                margin="dense"
                                                                id={"studentID" + index} 
                                                                label="Student ID"
                                                                type="number"
                                                                fullWidth
                                                                variant="standard"
                                                                color= {checkStudentID ? "secondary": "warning"} //it will be assigning according to whether the input is true or not
                                                                focused
                                                            />))}
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleClose}>Cancel</Button>
                                                            <Button onClick={handleClose}>Enroll</Button> 
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
    );

}
export default EnrollTournaments;
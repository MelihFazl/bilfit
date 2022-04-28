import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import './Tournaments.css';
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
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

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


function TournamentRequests() {
    const [tournaments, setTournaments] = useState([]);
    const [checkedState1, setCheckedState1] = useState(new Array().fill(false));
    const [checkedState2, setCheckedState2] = useState(new Array().fill(false));
    const [checkedState3, setCheckedState3] = useState(new Array().fill(false));
    const [checkedState4, setCheckedState4] = useState(new Array().fill(false));
    const[teammates, setTeammates] = useState(new Array().fill('3')); //it will change according to a value that comes from database


    const handleOnChange = (position, number) => { // It will be modified according to array that comes from backend
        if (number == 1) {
            const updateAllStates = checkedState1.fill(false);
            setCheckedState1(updateAllStates);
            const updatedCheckedState = checkedState1.map((item, index) => index === position ? !item : item);
            setCheckedState1(updatedCheckedState);
        }
        if (number == 2) {
            const updateAllStates = checkedState2.fill(false);
            setCheckedState2(updateAllStates);
            const updatedCheckedState = checkedState2.map((item, index) => index === position ? !item : item);
            setCheckedState2(updatedCheckedState);
        }
        if (number == 3) {
            const updateAllStates = checkedState3.fill(false);
            setCheckedState3(updateAllStates);
            const updatedCheckedState = checkedState3.map((item, index) => index === position ? !item : item);
            setCheckedState3(updatedCheckedState);
        }
        if (number == 4) {
            const updateAllStates = checkedState4.fill(false);
            setCheckedState4(updateAllStates);
            const updatedCheckedState = checkedState4.map((item, index) => index === position ? !item : item);
            setCheckedState4(updatedCheckedState);
        }
    };

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
                spacing={3} alignItems="center" justifyContent="center" >
                <div> <h1 className='header' alignItems="center">My Pending Requests</h1> </div>
                <Stack className='mainStack' direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}>
                    <div className="TournamentContainer">
                        <TableContainer component={Paper} >
                            <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell> Requester </StyledTableCell>
                                        <StyledTableCell align='right'>Date</StyledTableCell>
                                        <StyledTableCell align='right'>Time</StyledTableCell>
                                        <StyledTableCell align='right'>Activity</StyledTableCell>
                                        <StyledTableCell align='right'>Location</StyledTableCell>
                                        <StyledTableCell align='right'>Sport Center</StyledTableCell>
                                        <StyledTableCell align='right'>Team Members</StyledTableCell>
                                        <StyledTableCell align='right'>Tournament Status</StyledTableCell>
                                        <StyledTableCell align='right'></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {tournaments.map((tournament, index) => (
                                        <StyledTableRow key={"row" + tournament.id} component="th" scope="row"  >
                                            <StyledTableCell className='cellItem'>
                                                {tournament.requester}
                                            </StyledTableCell>
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
                                            <StyledTableCell className='cellItem'>
                                                <Table size="small" aria-label="a dense table">
                                                    <TableRow><StyledTableCell > {tournament.teammates1 /* When we can take teammates as array I can map it as array format*/}</StyledTableCell></TableRow>
                                                    <TableRow><StyledTableCell> {tournament.teammates2}</StyledTableCell></TableRow>
                                                    <TableRow><StyledTableCell> {tournament.teammates3}</StyledTableCell></TableRow>
                                                </Table>
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {tournament.status}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                <Stack className='mainStack' direction="row"  // This stack is for delete and cancel reservation buttons
                                                    justifyContent="start"
                                                    alignItems="start"
                                                    spacing={0}>
                                                    <Box className={"button" + index}
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton key={"button" + index} aria-label="Example" onClick={() => { handleOnChange(index, 1); alert(index) /* it will be modified according to array that comes from backend */ }} >
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </IconButton> </Box>
                                                    <Box className='button2'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton aria-label="Example">
                                                            <FontAwesomeIcon icon={faXmark} onClick={() => { handleOnChange(index, 2); alert(index)  /* it will be modified according to array that comes from backend */ }} />
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
            <Stack className='mainStackUser' direction="column"
                spacing={3} alignItems="center" justifyContent="center"     >
                <div> <h1 className='header' alignItems="center">My Sent Requests</h1> </div>
                <Stack className='mainStack' direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}>
                    <div className="TournamentContainer">
                        <TableContainer component={Paper} >
                            <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell> Team Members </StyledTableCell>
                                        <StyledTableCell align='right'> Date</StyledTableCell>
                                        <StyledTableCell align='right'> Time</StyledTableCell>
                                        <StyledTableCell align='right'> Activity</StyledTableCell>
                                        <StyledTableCell align='right'> Location</StyledTableCell>
                                        <StyledTableCell align='right'> Sport Center</StyledTableCell>
                                        <StyledTableCell align='right'> Status</StyledTableCell>
                                        <StyledTableCell align='right'></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {tournaments.map((tournament, index) => (
                                        <StyledTableRow key={"row" + tournament.id} component="th" scope="row"  >
                                            <StyledTableCell className='cellItem'>
                                                <Table size="small" aria-label="a dense table">
                                                    <TableRow><StyledTableCell > {tournament.teammates1}</StyledTableCell></TableRow>
                                                    <TableRow><StyledTableCell> {tournament.teammates2}</StyledTableCell></TableRow>
                                                    <TableRow><StyledTableCell> {tournament.teammates3}</StyledTableCell></TableRow>
                                                </Table>
                                            </StyledTableCell>
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
                                                {tournament.status} ({/*newTournamentTotalNumber*/})
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                <Stack className='mainStack' direction="row"  // This stack is for delete and cancel reservation buttons
                                                    justifyContent="start"
                                                    alignItems="start"
                                                    spacing={0}>
                                                    <Box className={"button" + index}
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton key={"button" + index} aria-label="Example" onClick={() => { handleOnChange(index, 3); alert(index) /* it will be modified according to array that comes from backend */ }} >
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </IconButton> </Box>
                                                    <Box className='button2'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton aria-label="Example">
                                                            <FontAwesomeIcon icon={faXmark} onClick={() => { handleOnChange(index, 4); alert(index)  /* it will be modified according to array that comes from backend */ }} />
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

    );
}
export default TournamentRequests;
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
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Navbar/Button'
import MenuItem from '@mui/material/MenuItem';
import { color } from '@mui/system';


//TODOS :
// add action to submit button
//it may be needed unique text inputs
// tournament group member can be add but also it can come from activity i am not sure
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
function EnrollTournaments() {
    const userType = (localStorage.getItem("usertype") == "staff") ? 1 : 0;
    const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users and staff
    const [checkedState1, setCheckedState1] = useState(new Array().fill(false)); //array of unique buttons
    const [tournaments, setTournaments] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [studentID, setStudentID] = useState(''); //student id will be checked if it is not true, text dialog will be red color
    const [checkStudentID, setCheckStudentID] = useState(true); //trying
    const [teammates, setTeammates] = useState(''); //it will change according to a value that comes from database
    const [sportCenter, setSportCenter] = React.useState('');
    //Below are new tournaments ddata when staff added
    const [newTournamentStartDate, setNewTournamentStartDate] = useState('');
    const [newTournamentEndDate, setNewTournamentEndDate] = useState('');
    const [newTournamentActivity, setNewTournamentActivity] = useState('');
    const [newTournamentField, setNewTournamentField] = useState('');
    const [newTournamentSportCenter, setNewTournamentSportCenter] = useState('');
    const [newTournamentLastRegDate, setNewTournamentLastRegDate] = useState('');
    const [newTournamentTotalNum, setNewTournamentTotalNum] = useState('');
    const [newTournamentMaxTeamNumber, setNewTournamentMaxTeamNumber] = useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);//currentIndex


    const cancelNewTournament = () => {
        setNewTournamentStartDate('')
        setNewTournamentEndDate('');
        setNewTournamentActivity('');
        setNewTournamentField('');
        setNewTournamentSportCenter('');
        setNewTournamentLastRegDate('');
        setNewTournamentTotalNum('');
        setNewTournamentMaxTeamNumber('');
        setSportCenter('');
    };

    const cancelNewRegistration = () => { setTeammates('') }

    const handleChange = (event) => {
        setSportCenter(event.target.value);
    };

    const handleOnChange = (position, number) => { // It will be modified according to array that comes from backend
        if (number == 1) {
            const updateAllStates = checkedState1.fill(false);
            setCheckedState1(updateAllStates);
            const updatedCheckedState = checkedState1.map((item, index) => index === position ? !item : item);
            setCheckedState1(updatedCheckedState);

        }
    }

    const handleSetTeammates = (value, position) => {
        const updatedCheckedState = teammates.map((item, index) => index === position ? item = value : item);
        setTeammates(updatedCheckedState);
    }

    const handleClickOpen = (position) => {
        setOpen(true);
    };

    const handleClickOpen2 = (position) => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleClose = () => {
        setOpen(false);
        cancelNewRegistration();
    };
    //fetching data from restAPI
    useEffect(() => {
        fetch('http://localhost:8080/tournaments')
            .then((res) => res.json())
            .then((result) => {
                setTournaments(result);
            });
    }, [tournaments]);

    const removeTournament = (index) => {
        fetch('http://localhost:8080/tournaments/delete/' + tournaments[index].id, { method: 'DELETE' })
            .then((result) => {
                result.text().then((resultStr) => {
                    alert(resultStr);
                })
            });
    }

    const addNewTournament = () => {
        if (newTournamentStartDate === '' || newTournamentEndDate === '' || newTournamentActivity === '' || newTournamentField === '' || newTournamentSportCenter === '' || newTournamentLastRegDate === '' || newTournamentTotalNum === '' || newTournamentMaxTeamNumber === '') {
            alert("You have empty required fields");
        }
        else {
            let request = "http://localhost:8080/tournaments/add?";

            console.log(request + "sportCenterID=" + newTournamentSportCenter);
            fetch(request + "sportCenterID=" + newTournamentSportCenter, {
                method: "POST",
                Accept: "/",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    name: newTournamentActivity,
                    startingDate: newTournamentStartDate,
                    endingDate: newTournamentEndDate,
                    maxTeams: newTournamentTotalNum,
                    deadline: newTournamentLastRegDate,
                    numberOfRegistrations: 0,
                    field: newTournamentField,
                    maxNumberOfTeamMembers: newTournamentMaxTeamNumber
                })
            }).then((result) => {
                result.text().then((actualResult) => {
                    alert(actualResult)
                })
            })

            handleClose2();
        }
    }

    const addNewRegistration = (index) => {
        if (teammates === '') {
            alert("You have enter a value for teammate's IDs.");
        }
        else {
            let strArray = teammates.replace(/\s/g, '').split(",");
            let request = "http://localhost:8080/tournaments/" + index + "/registration/add?";
            for (var i = 0; i < strArray.length; i++) {
                request = request + "teamID=" + strArray[i];
                if (i != strArray.length - 1)
                    request = request + "&"
            }
            console.log(request);
            fetch(request, {
                method: "POST",
                Accept: "/",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({

                })
            }).then((result) => {
                result.text().then((actualResult) => {
                    alert(actualResult)
                })
            })
            cancelNewRegistration();
            handleClose();
        }
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
                <Button onClick={handleClickOpen2} > Add Tournament </Button>
                <Dialog open={open2} onClose={handleClose2}  >
                    <DialogTitle>Add a Tournament </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the necessary information of tournament.
                        </DialogContentText>
                        <TextField className="newTournament" onChange={event => setNewTournamentStartDate(event.target.value)}
                            autoFocus
                            margin="dense"
                            id={"newTournamentStartDate"}
                            label="Tournament Start Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                            focused
                        />
                        <TextField className="newTournament" onChange={event => setNewTournamentEndDate(event.target.value)}
                            autoFocus
                            margin="dense"
                            id={"newTournamentEndDate"}
                            label="Tournament End Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                            focused
                        />
                        <TextField className="newTournament" onChange={event => setNewTournamentActivity(event.target.value)}
                            autoFocus
                            margin="dense"
                            id={"newTournamentActivity"}
                            label="Tournament Activity"
                            type="text"
                            fullWidth
                            variant="standard"
                            color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                            focused
                        />
                        <TextField className="newTournament" onChange={event => setNewTournamentField(event.target.value)}
                            autoFocus
                            margin="dense"
                            id={"newTournamentField"}
                            label="Tournament Field"
                            type="text"
                            fullWidth
                            variant="standard"
                            color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                            focused
                        />
                        <TextField className="newTournament"
                            autoFocus
                            id="outlined-select-currency"
                            margin="dense"
                            select
                            label="Select Sport Center"
                            value={sportCenter}
                            color="secondary"
                            onChange={event => {
                                setSportCenter(event.target.value);
                                setNewTournamentSportCenter(event.target.value)
                            }}
                            helperText="Please select your currency"
                            focused
                        >
                            {sportCenters.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField className="newTournament" onChange={event => setNewTournamentLastRegDate(event.target.value)}
                            autoFocus
                            margin="dense"
                            id={"newTournamentLastRegDate"}
                            label="Last Registration Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                            focused
                        />
                        <TextField className="newTournament" onChange={event => setNewTournamentTotalNum(event.target.value)}
                            autoFocus
                            margin="dense"
                            id={"newTournamentTotalNum"}
                            label="Tournament Max Team or Person"
                            type="number"
                            fullWidth
                            variant="standard"
                            color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                            focused
                        />
                        <TextField className="newTournament" onChange={event => setNewTournamentMaxTeamNumber(event.target.value)}
                            autoFocus
                            margin="dense"
                            id={"newTournamentMaxTeamNumber"}
                            label="Tournament Max Number of Members in a Team"
                            type="number"
                            fullWidth
                            variant="standard"
                            color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                            focused
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpen2(false); cancelNewTournament()
                        }} >Cancel </Button>
                        <Button onClick={addNewTournament}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Stack className='mainStackUser' direction="column"
                spacing={3} alignItems="center">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'>Available Tournaments</h1> </div>
                <Stack className='mainStack' direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}>

                    <div className="TournamentsContainer">
                        <TableContainer component={Paper} >
                            <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Activity</StyledTableCell>
                                        <StyledTableCell>Start-Finish Date</StyledTableCell>
                                        <StyledTableCell>Sports Center</StyledTableCell>
                                        <StyledTableCell align='center'>Location</StyledTableCell>
                                        <StyledTableCell>Last Registration Date</StyledTableCell>
                                        <StyledTableCell>Available Quota</StyledTableCell>
                                        <StyledTableCell>Number of Persons in a Team</StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {tournaments.map((tournament, index) => (
                                        <StyledTableRow key={tournament.id} component="th" scope="row"  >
                                            <StyledTableCell className='cellItem'>
                                                {tournament.name}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                <Table size="small" aria-label="a dense table">
                                                    <TableRow><StyledTableCell > {tournament.startingDate}</StyledTableCell></TableRow>
                                                    <TableRow><StyledTableCell> {tournament.endingDate}</StyledTableCell></TableRow>
                                                </Table>
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {tournament.sportCenter.name}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'  >
                                                {tournament.field}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'>
                                                {tournament.deadline}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {tournament.maxTeams - tournament.numberOfRegistrations}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {tournament.maxNumberOfTeamMembers}
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
                                                        }} style={{ display: showInfo1 ? "block" : "none" }}
                                                    >
                                                        <IconButton aria-label="Example" >
                                                            <FontAwesomeIcon icon={faFilePen} onClick={() => { setOpen3(true); setCurrentIndex(tournament.id) }}/>
                                                        </IconButton>
                                                    </Box>
                                                    <Dialog open={open3} onClose={() => setOpen3(false)}>
                                                        <DialogTitle>Enroll the Tournament</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                {"Please enter your ID and teammates student IDs as a comma seperated list (ex: 21901831, 21901940)."}
                                                            </DialogContentText>
                                                            <TextField className="newTournament" onChange={event => setTeammates(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id={"teammates"}
                                                                label="Teamates"
                                                                type="text"
                                                                fullWidth
                                                                variant="standard"
                                                                color={checkStudentID ? "secondary" : "warning"} //it will be assigning according to whether the input is true or not
                                                                focused
                                                            />
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => setOpen3(false)}>Cancel</Button>
                                                            <Button  onClick={() => {setOpen3(false); addNewRegistration(currentIndex) }}>Enroll</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    <Box className='deleteButton'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }} style={{ display: showInfo1 ? "none" : "block" }}
                                                    >
                                                        <IconButton aria-label="Example" onClick={() => { handleOnChange(index, 1); removeTournament(index) }} >
                                                            <FontAwesomeIcon icon={faXmark} />
                                                        </IconButton>
                                                    </Box>
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
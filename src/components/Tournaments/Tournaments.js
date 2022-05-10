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
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';


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

function Tournaments() {
  const userType = (localStorage.getItem("usertype") == "staff") ? 1 : 0;
  const [tournamentRegistrations, setTournamentRegistrations] = useState([]);
  //variables for unique button states 
  const [checkedState1, setCheckedState1] = useState(new Array().fill(false));
  const [checkedState2, setCheckedState2] = useState(new Array().fill(false));
  const [checkedState3, setCheckedState3] = useState(new Array().fill(false));
  const [checkedState4, setCheckedState4] = useState(new Array().fill(false));
  const [checkedState5, setCheckedState5] = useState(new Array().fill(false));
  const [checkedState6, setCheckedState6] = useState(new Array().fill(false));
  const [checkedState7, setCheckedState7] = useState(new Array().fill(false));
  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users and staff




  useEffect(() => {
    if (userType == 0) {
      fetch('http://localhost:8080/tournaments/registration/teamMember/' + localStorage.getItem("userid"))
        .then((res) => res.json())
        .then((result) => {
          setTournamentRegistrations(result);
        });
    }
    else {
      fetch('http://localhost:8080/tournaments/registration')
      .then((res) => res.json())
      .then((result) => {
        setTournamentRegistrations(result);
      });
    }
  }, [tournamentRegistrations]);

  const leaveTournament = (index) => {
    fetch('http://localhost:8080/tournaments/'+ tournamentRegistrations[index].tournament.id +'/registration/delete/' + tournamentRegistrations[index].id, { method: 'DELETE' })
        .then((result) => {
            result.text().then((resultStr) => {
                alert(resultStr);
            })
        });
}

  /**
   * This function changes the situation of the buttons when the are clicked
   * @param {it is the position of the row} position 
   * @param {it shows which button is clicked } number 
   */
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
    if (number == 5) {
      const updateAllStates = checkedState5.fill(false);
      setCheckedState5(updateAllStates);
      const updatedCheckedState = checkedState5.map((item, index) => index === position ? !item : item);
      setCheckedState5(updatedCheckedState);
    }
    if (number == 6) {
      const updateAllStates = checkedState6.fill(false);
      setCheckedState6(updateAllStates);
      const updatedCheckedState = checkedState6.map((item, index) => index === position ? !item : item);
      setCheckedState6(updatedCheckedState);
    }
    if (number == 7) {
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

  return (
    <>
      {/*The first stack will will be displayed for users*/}
      <Stack className='mainStackUser' direction="column"
        spacing={3} alignItems="center" style={{ display: showInfo1 ? "block" : "none" }}    >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'>My Tournaments</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="TournamentContainer">
            <TableContainer component={Paper} >
              <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                <TableHead>
                  <TableRow hover="false">
                    <StyledTableCell>Activity</StyledTableCell>
                    <StyledTableCell>Start-Finish Date</StyledTableCell>
                    <StyledTableCell>Sports Center</StyledTableCell>
                    <StyledTableCell align='center'>Location</StyledTableCell>
                    <StyledTableCell>Team Members</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody hover="false">
                  {tournamentRegistrations.map((registration, index) => (
                    <StyledTableRow key={registration.id} component="th" scope="row"  >
                      <StyledTableCell className='cellItem'>
                        {registration.tournament.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Table size="small" aria-label="a dense table">
                          <TableRow><StyledTableCell > {registration.tournament.startingDate}</StyledTableCell></TableRow>
                          <TableRow><StyledTableCell> {registration.tournament.endingDate}</StyledTableCell></TableRow>
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {registration.tournament.sportCenter.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'  >
                          {registration.tournament.field}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        <Table size="small" aria-label="a dense table">
                          {registration.teamMembers.map(member => (
                            <TableRow><StyledTableCell >{member.name}</StyledTableCell></TableRow>
                          ))}
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Stack className='mainStack' direction="row"  // This stack is for delete and cancel reservation buttons
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
                            <IconButton aria-label="Example" onClick={() => { handleOnChange(index, 1); leaveTournament(index)  /* it will be modified according to array that comes from backend */ }}>
                              <FontAwesomeIcon icon={faXmark} />
                            </IconButton></Box>
                          <Box className='button2'
                            sx={{
                              '& > :not(style)': {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton aria-label="Example">
                              <FontAwesomeIcon icon={faTrashCan} onClick={() => { handleOnChange(index, 2); leaveTournament(index)  /* it will be modified according to array that comes from backend */ }} />
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
      {/*The second stack will be displayed to staff*/}
      <Stack className='mainStackStaff' direction="column"
        spacing={3} alignItems="center" justifyContent="center" style={{ display: showInfo1 ? "none" : "block" }}    >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header' >Enrolled Tournaments</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="TournamentContainer">
            <TableContainer component={Paper} >
              <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                <TableHead>
                  <TableRow hover="false">
                    <StyledTableCell>Activity</StyledTableCell>
                    <StyledTableCell>Start-Finish Date</StyledTableCell>
                    <StyledTableCell>Sports Center</StyledTableCell>
                    <StyledTableCell align='center'>Location</StyledTableCell>
                    <StyledTableCell>Team Members</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody hover="false">
                  {tournamentRegistrations.map((registration, index) => (
                    <StyledTableRow key={registration.id} component="th" scope="row"  >
                      <StyledTableCell className='cellItem'>
                        {registration.tournament.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        <Table size="small" aria-label="a dense table">
                          <TableRow><StyledTableCell > {registration.tournament.startingDate}</StyledTableCell></TableRow>
                          <TableRow><StyledTableCell> {registration.tournament.endingDate}</StyledTableCell></TableRow>
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {registration.tournament.sportCenter.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                          {registration.tournament.field}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        <Table size="small" aria-label="a dense table">
                          {registration.teamMembers.map(member => (
                            <TableRow><StyledTableCell >{member.name}</StyledTableCell></TableRow>
                          ))}
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >

                        <Box className='button1'
                          sx={{
                            '& > :not(style)': {
                              m: 1,
                            },
                          }}
                        >
                          <IconButton aria-label="Example" onClick={() => { handleOnChange(index, 7); leaveTournament(index)  /* it will be modified according to array that comes from backend */ }}>
                            <FontAwesomeIcon icon={faXmark} />
                          </IconButton></Box>

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
export default Tournaments;
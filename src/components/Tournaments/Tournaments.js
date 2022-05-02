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
import Input from '../Controls/Input.js';
import { stableSort, getComparator } from '../SearchAndSortMethods/SearchAndSort.js';
import { InputAdornment, TableFooter, TableSortLabel } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Search from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TablePagination from '@mui/material/TablePagination';



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
  const userType = 0; // if its type is 0  => regular user 1=> staff
  const [tournaments, setTournaments] = useState([]);
  //variables for unique button states 
  const [checkedState1, setCheckedState1] = useState(new Array().fill(false));
  const [checkedState2, setCheckedState2] = useState(new Array().fill(false));
  const [checkedState3, setCheckedState3] = useState(new Array().fill(false));
  const [checkedState4, setCheckedState4] = useState(new Array().fill(false));
  const [checkedState5, setCheckedState5] = useState(new Array().fill(false));
  const [checkedState6, setCheckedState6] = useState(new Array().fill(false));
  const [checkedState7, setCheckedState7] = useState(new Array().fill(false));
  const [checkedUsers, setCheckedUsers] = useState();
  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users and staff
  const pages = [5, 10, 15];

  const headCells1 = [
    { id: 'resDate', label: 'Date' },
    { id: 'resTime', label: 'Time' },
    { id: 'resActivity', label: 'Activity' },
    { id: 'resLocation', label: 'Location' },
    { id: 'resSportsCenter', label: 'Sports Center' },
    { id: 'resTeamMembers', label: 'Team Members' },
    { id: 'resStatus', label: 'Reservation Status' },
    { id: 'resButton1', label: '', disableSorting: true },
  ]
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [searchSelection, setSearchSelection] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/tournaments')
      .then((res) => res.json())
      .then((result) => {
        setTournaments(result);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/users/id')
      .then((res) => res.json())
      .then((result) => {
        setCheckedUsers(result);
      });
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          switch (searchSelection) {
            case "resDate": return items.filter(x => x.resDate.includes(target.value));
            case "resTime": return items.filter(x => x.resTime.includes(target.value));
            case "resActivity": return items.filter(x => x.resActivity.includes(target.value));
            case "resLocation": return items.filter(x => x.resLocation.includes(target.value));
            case "resSportsCenter": return items.filter(x => x.resSportsCenter.includes(target.value));
            //case "resTeamMembers": return items.filter( x => x.team) May be problematic and may be disabled for search
            case "resStatus": return items.filter(x => x.resStatus.includes(target.value));
            default: return items.filter(x => x.resActivity.includes(target.value));
          }
      }
    })
  };

  const tournamentsAfterSortingAndPaging = () => {
    return stableSort(filterFn.fn(tournaments), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }

  const handleSortRequest = cellId => {
    const isAscending = orderBy === cellId && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(cellId);
  }

  const handleSearchSelection = (event) => {
    setSearchSelection(event.target.value);
  };

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
      <Stack className='mainStackUser' direction="column"
        spacing={3} alignItems="center" style={{ display: showInfo1 ? "block" : "none" }}    >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'> My Tournaments</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="TournamentContainer">
            <Stack className='selectionStack' direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={6}>
              <Toolbar>
                <Input label="Search Reservations" InputProps={{
                  startAdornment: (<InputAdornment position='start'><Search /></InputAdornment>)
                }} onChange={handleSearch} />
              </Toolbar>
              <Box width='12rem'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchSelection}
                    label="Search By"
                    onChange={handleSearchSelection}
                  >
                    {headCells1.map(headCell => (
                      !headCell.disableSorting && <MenuItem value={headCell.id}>{headCell.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <TableContainer component={Paper} >
              <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                <TableHead>
                  <TableRow hover="false">
                    {headCells1.map(headCell => (
                      <StyledTableCell key={headCell.id} >
                        {headCell.disableSorting ? headCell.label :
                          <TableSortLabel onClick={() => { handleSortRequest(headCell.id) }}
                            direction={(orderBy === headCell.id) ? order : 'asc'} active={orderBy == headCell.id}>
                            {headCell.label}
                          </TableSortLabel>}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody hover="false">
                  {tournamentsAfterSortingAndPaging().map((tournament, index) => (
                    <StyledTableRow key={tournament.id} component="th" scope="row"  >
                      <StyledTableCell className='cellItem'>
                        {tournament.resDate}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {tournament.resTime}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {tournament.resActivity}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'  >
                        {tournament.resLocation}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {tournament.resSportsCenter}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        <Table size="small" aria-label="a dense table">
                          {tournament.teammates.map(teammate => (
                            <TableRow><StyledTableCell >{teammate.name}</StyledTableCell></TableRow>

                          ))}
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {tournament.resStatus}
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
                            <IconButton aria-label="Example" onClick={() => { handleOnChange(index, 1); alert(index)  /* it will be modified according to array that comes from backend */ }}>
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
                              <FontAwesomeIcon icon={faTrashCan} onClick={() => { handleOnChange(index, 2); alert(index)  /* it will be modified according to array that comes from backend */ }} />
                            </IconButton></Box>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination component='div' page={page} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage}
                count={tournaments.length} onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }}>
              </TablePagination>
            </TableContainer>
          </div>
        </Stack>
      </Stack>
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
                    <StyledTableCell>Tournament Date</StyledTableCell>
                    <StyledTableCell align='right'> Time</StyledTableCell>
                    <StyledTableCell align='right'> Activity</StyledTableCell>
                    <StyledTableCell align='right'> Location</StyledTableCell>
                    <StyledTableCell align='right'> Sport Center</StyledTableCell>
                    <StyledTableCell align='right'>Team Member Numbers</StyledTableCell>
                    <StyledTableCell align='right'>Team Members</StyledTableCell>
                    <StyledTableCell align='right'> Status</StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody hover="false">
                  {tournaments.map((tournament, index) => (
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
                      <StyledTableCell className='cellItem'>
                        {tournament.memberNumber}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        <Table size="small" aria-label="a dense table">
                          {tournament.teammates.map(teammate =>
                            <TableRow><StyledTableCell > {teammate.name}</StyledTableCell></TableRow>
                          )}
                        </Table>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {tournament.status}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >

                        <Box className='button1'
                          sx={{
                            '& > :not(style)': {
                              m: 1,
                            },
                          }}
                        >
                          <IconButton aria-label="Example" onClick={() => { handleOnChange(index, 7); alert(index)  /* it will be modified according to array that comes from backend */ }}>
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
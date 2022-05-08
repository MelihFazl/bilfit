import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import TablePagination from '@mui/material/TablePagination';
import './Reservation.css';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { InputAdornment, TableFooter, TableSortLabel } from '@mui/material';
import { Sort } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import { set } from 'date-fns';
import { render } from 'react-dom';

// Button positions will be fixed
// Right side of the table will be fixed
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F05454',
    color: theme.palette.common.white,
    fontSize: 13
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Input(props) {

  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}

function Reservation() {
  //variables
  
  const userType = (localStorage.getItem("usertype") == "staff") ? 1 : 0;
  const pages = [5, 10, 15];
  const [reservations, setReservations] = useState([]);
  const [memberResults, setMemberResults] = useState([]);
  const [showInfo1, setInfo1] = useState(() => userType ? 0 : 1); //visibility setting for regular users
  const [showInfo2, setInfo2] = useState(() => userType ? 1 : 0); //visibility setting for staff
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [searchSelection, setSearchSelection] = useState();
  //methods

  

  //In order to print the headings from a map
  const headCells1 = [
    { id: 'resDate', label: 'Date' },
    { id: 'resTime', label: 'Time' },
    { id: 'resActivity', label: 'Activity' },
    { id: 'resLocation', label: 'Location' },
    { id: 'resSportsCenter', label: 'Sports Center' },
    { id: 'resStatus', label: 'Reservation Status' },
    { id: 'resButton1', label: '', disableSorting: true },
    { id: 'resButton2', label: '', disableSorting: true }
  ]
  useEffect(() => {
    if(userType === 1)
    {
      fetch('http://localhost:8080/reservation/')
      .then((res) => res.json())
      .then((result) => {
        setReservations(result);
      });
    } 
    else if(userType === 0)
    {
      fetch('http://localhost:8080/reservation/getByUserID/' + localStorage.getItem("userid"))
      .then((res) => res.json())
      .then((result) => {
        setReservations(result);
      });
    } 
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
            case "resDate": return items.filter(x => x.reservationDate.includes(target.value));
            case "resTime": return items.filter(x => x.reservedTimeInterval.includes(target.value));
            case "resActivity": return items.filter(x => x.reservationActivity.name.includes(target.value));
            case "resLocation": return items.filter(x => x.reservationField.name.includes(target.value));
            case "resSportsCenter": return items.filter(x => x.reservationPlace.name.includes(target.value));
            case "resStatus": return items.filter(x => x.status.includes(target.value));
            default: return items.filter(x => x.reservationActivity.activity.includes(target.value));
          }
      }
    })
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const reservationsAfterSortingAndPaging = () => {
    return stableSort(filterFn.fn(reservations), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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
 * Below variables are for icons of buttons (importing the icon)
 */
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
    <Button className='sabılader' onClick={()=>{console.log(reservations)}}/>

      <Stack className='mainStackUser' direction="column"
        spacing={3} alignItems="center" style={{ display: showInfo1 ? "block" : "none" }}    >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header' >My Reservations</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="ReservationContainer">
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
                <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table" >
                  <TableHead>
                    <TableRow>
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
                  <TableBody >
                    {reservationsAfterSortingAndPaging().map((reservation, index) => (
                      <StyledTableRow key={reservation.id} component="th" scope="row"  >
                        <StyledTableCell className='cellItem'>
                          {reservation.reservationDate}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.reservedTimeInterval}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.reservationActivity.activity}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'  >
                          {reservation.reservationField.name}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem'>
                          {reservation.reservationPlace.name}
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                          {reservation.status}
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
                              <IconButton aria-label="Example" onClick={() => { alert("I am clicked But1")  /* it will be modified according to array that comes from backend */ }}>
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
                                <FontAwesomeIcon icon={faTrashCan} onClick={() => { alert("I am clicked But2")  /* it will be modified according to array that comes from backend */ }} />
                              </IconButton></Box>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell className='cellItem' >
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>

                </Table>
                <TablePagination component='div' page={page} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage}
                  count={reservations.length} onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }}>
                </TablePagination>
              </TableContainer>
          </div>
        </Stack>
      </Stack>
      <Stack className='mainStackStaff' direction="column"
        spacing={3} alignItems="center" justifyContent="center" style={{ display: showInfo2 ? "block" : "none" }}    >
        <div> <h1 className='header'>Total Reservations</h1> </div>
        <Stack className='mainStack' direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <div className="ReservationContainer">
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 800, width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='right'>Reservation Date</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Time</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Activity</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Sport Center</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Location</StyledTableCell>
                    <StyledTableCell align='right'>Reserver Name</StyledTableCell>
                    <StyledTableCell align='right'>Reserver Phone</StyledTableCell>
                    <StyledTableCell align='right'>Reserver ID</StyledTableCell>
                    <StyledTableCell align='right'>Reservation Status</StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {reservations.map((reservation, index) => 
                  (
                    <StyledTableRow key={reservation.id} component="th" scope="row"  >
                      <StyledTableCell className='cellItem' >
                        {reservation.reservedTimeInterval}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {reservation.reservationDate}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.reservationActivity.activity}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'  >
                        {reservation.reservationPlace.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem'>
                        {reservation.reservationField.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.reserver.name}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.reserver.phoneNumber}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.reserver.id}
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                        {reservation.status}
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
                            <IconButton aria-label="Example" onClick={() => { alert("I am clicked But1")  /* it will be modified according to array that comes from backend */ }}>
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
                              <FontAwesomeIcon icon={faPenToSquare} onClick={() => { alert("I am clicked But2")  /* it will be modified according to array that comes from backend */ }} />
                            </IconButton></Box>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell className='cellItem' >
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Stack>
      </Stack>
    </>
  );
}
export default Reservation;
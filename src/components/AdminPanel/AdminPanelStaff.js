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
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { Button } from '../Navbar/Button'
import MenuItem from '@mui/material/MenuItem';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import Input from '../Controls/Input.js';
import { stableSort, getComparator } from '../SearchAndSortMethods/SearchAndSort.js';
import { InputAdornment, TableFooter, TableSortLabel } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Search from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TablePagination from '@mui/material/TablePagination';

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

function AdminPanelStaff() {
    const [currentIndex, setCurrentIndex] = useState("");
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    //gymstaff
    const [gymStaffs, setGymStaffs] = useState([])
    const [newStaffID, setNewStaffID] = useState('');
    const [newStaffName, setNewStaffName] = useState('')
    const [newStaffPassword, setNewStaffPassword] = useState('')
    const [newStaffMail, setNewStaffMail] = useState('')
    const [newStaffPhone, setNewStaffPhone] = useState('')
    const [editStaffPhone, setEditStaffPhone] = useState('');
    const [editStaffName, setEditStaffName] = useState('')
    const [editStaffMail, setEditStaffMail] = useState('')


    const pages = [5, 10, 15];
    const headCells1 = [
        { id: 'id', label: "ID" },
        { id: 'email', label: 'Mail' },
        { id: 'name', label: 'Full Name' },
        { id: 'phoneNumber', label: 'Phone Number' },
        { id: 'resButton1', label: '', disableSorting: true }
    ]

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [searchSelection, setSearchSelection] = useState();

    useEffect(() => {
        setGymStaffData()
    }, []);

    function setGymStaffData() {
        fetch('http://localhost:8080/user/gymStaff')
            .then((res) => res.json())
            .then((result) => {
                setGymStaffs(result);
                console.log(result)
            });
    }

    function handleAddGymStaff() {
        console.log("http://localhost:8080/user/gymStaff/add?token=" + localStorage.getItem("usertoken"))
        fetch("http://localhost:8080/user/gymStaff/add?token=" + localStorage.getItem("usertoken"), {
            method: "POST",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: newStaffID,
                name: newStaffName,
                hashedPassword: newStaffPassword,
                email: newStaffMail,
                phoneNumber: newStaffPhone
            })
        }).then((result) => {
            result.text().then((actualResult) => {
                console.log(actualResult)
                setGymStaffData()
            })
        })
    }

    function handleEditGymStaff(id) {
        if (editStaffName === '' || editStaffMail === '' || editStaffPhone === '') {
            alert("You have empty required fields");
        }
        else {
            fetch("http://localhost:8080/user/editGymStaff/" + id, {
                method: "PATCH",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    name: editStaffName,
                    email: editStaffMail,
                    phoneNumber: editStaffPhone
                })
            }).then((result) => {
                result.text().then((actualResult) => {
                    if (!actualResult.includes("edited."))
                        alert(actualResult)
                    setGymStaffData()
                })
            })
        }
        cancelEditingStaff();
    }

    function handleDelete(id) {
        fetch("http://localhost:8080/user/delete/" + id, {
            method: "DELETE"
        }).then((result) => {
            result.text().then((actualResult) => {
                alert(actualResult)
                setGymStaffData()

            })
        })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen3 = () => {
        setOpen3(true);
    };
    const handleClose3 = () => {
        setOpen3(false);
    };

    const cancelEditingStaff = () => {
        setEditStaffPhone('');
        setEditStaffName('');
        setEditStaffMail('');
    };

    const cancelNewStaff = () => {
        setNewStaffID('');
        setNewStaffName('');
        setNewStaffMail('');
    };
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleClickOpen5 = () => {
        setOpen5(true);
    };

    const handleClose5 = () => {
        setOpen5(false);
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
                        case "id": return items.filter(x => x.id.toString().includes(target.value));
                        case "email": return items.filter(x => x.email.includes(target.value));
                        case "name": return items.filter(x => x.name.includes(target.value));
                        case "phoneNumber": return items.filter(x => x.phoneNumber.includes(target.value));
                        default: return items.filter(x => x.name.includes(target.value));
                    }
            }
        })
    };

    const staffsAfterSortingAndPaging = () => {
        return stableSort(filterFn.fn(gymStaffs), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    const handleSortRequest = cellId => {
        const isAscending = orderBy === cellId && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(cellId);
    }

    const handleSearchSelection = (event) => {
        setSearchSelection(event.target.value);
    };

    //fetching data from restAPI


    /* //This will take the values in  editUser.. consts and adding to database
    const submitEditingUser(index) =>{
    
    }*/
    /* This const takes the index of users and deletes it
    const deleteUser = (index) =>{

    }*/

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

            <div style={{ justifyContent: 'right', alignItems: 'center', marginRight: '5rem', marginTop: '2rem' }}>
                <Button onClick={handleClickOpen} > Add User </Button>
                <Dialog open={open} onClose={handleClose}  >
                    <DialogTitle>Add User </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the necessary information of the new user.
                        </DialogContentText>
                        <TextField className="newUser" onChange={event => setNewStaffID(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserID"
                            label="Staff ID"
                            type="number"
                            required={true}
                            fullWidth
                            variant="standard"
                            color='secondary'
                            errorText="Please enter only 8 digits number"
                            focused
                        />
                        <TextField className="newUser" onChange={event => setNewStaffName(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserName"
                            label="Staff Full Name"
                            required={true}
                            type="text"
                            color='secondary'

                            fullWidth
                            variant="standard"

                            focused
                        />
                        <TextField className="newUser" onChange={event => setNewStaffMail(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserMail"
                            label="Staff Mail"
                            color='secondary'

                            required={true}
                            type="mail"
                            fullWidth
                            variant="standard"

                            focused
                        />
                        <TextField className="newUser" onChange={event => setNewStaffPassword(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserPassword"
                            label="Staff Password"
                            type="password"
                            required={true}
                            fullWidth
                            variant="standard"
                            color='secondary'
                            focused
                        />
                        <TextField className="newUser" onChange={event => setNewStaffPhone(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserBirthDate"
                            label="Staff Phone Number"
                            required={true}
                            color='secondary'
                            type="text"
                            fullWidth
                            variant="standard"

                            focused
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpen(false); cancelNewStaff()
                        }}>Cancel </Button>
                        <Button onClick={(newStaffID != '' && newStaffMail != '' && newStaffPhone != '') ? (event) => { setOpen(false); handleAddGymStaff() } : (event) => alert("All fields must be filled") /*ADD SONRASI SIFIRLAMAK LAZIM*/}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Stack className='mainStackUser' direction="column"
                spacing={3} alignItems="center"    >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'>All Staff</h1> </div>
                <Stack className='mainStack' direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}>

                    <div className="UserContainer">
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
                                    {staffsAfterSortingAndPaging().map((user, index) => (
                                        <StyledTableRow key={user.id} component="th" scope="row"  >
                                            <StyledTableCell className='cellItem'>
                                                {user.id}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'>
                                                {user.email}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {user.name}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {user.phoneNumber}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                <Stack className='mainStack' direction="row"  // This stack is for delete and cancel reservation buttons
                                                    justifyContent="start"
                                                    alignItems="start"
                                                    spacing={0}>
                                                    <Box className='editButton'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton aria-label="Example" onClick={() => { setOpen2(true); setCurrentIndex(user) }} >
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </IconButton>
                                                    </Box>
                                                    <Dialog open={open2} onClose={() => { setOpen2(false) }}>
                                                        <DialogTitle>Edit User Information</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Please enter the information that you want to change.
                                                            </DialogContentText>
                                                            <TextField className="editUser" onChange={event => setEditStaffPhone(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id="newUserBirthDate"
                                                                label="User Phone Number"
                                                                required={true}
                                                                color='secondary'
                                                                type="text"
                                                                fullWidth
                                                                variant="standard"
                                                                placeholder={currentIndex.phoneNumber}
                                                                focused
                                                            />
                                                            <TextField className="editUser" onChange={event => setEditStaffName(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id="UserName"
                                                                label="User Full Name"
                                                                placeholder={currentIndex.name}
                                                                color='secondary'
                                                                type="text"
                                                                fullWidth
                                                                variant="standard"

                                                                focused
                                                            />
                                                            <TextField className="editUser" onChange={event => setEditStaffMail(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id="UserMail"
                                                                label="User Mail"
                                                                placeholder={currentIndex.email}
                                                                color='secondary'
                                                                type="mail"
                                                                fullWidth
                                                                variant="standard"
                                                                focused
                                                            />
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => { setOpen2(false); cancelEditingStaff() }}>Cancel</Button>
                                                            <Button onClick={() => { setOpen2(false); handleEditGymStaff(currentIndex.id) }}>Submit</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    <Box className='deleteButton'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton aria-label="Example" onClick={() => { handleClickOpen5(); setCurrentIndex(user) }} >
                                                            <FontAwesomeIcon icon={faTrashCan} />
                                                        </IconButton>
                                                        <Dialog
                                                            open={open5}
                                                            onClose={handleClose5}
                                                            aria-labelledby="Warning"
                                                            aria-describedby="Warning"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">
                                                                {"Warning 🥴"}
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    You are about to delete a user. Are you sure?
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose5}>Cancel</Button>
                                                                <Button onClick={() => {
                                                                    setOpen5(false);
                                                                    handleDelete(currentIndex.id);
                                                                }} autoFocus>
                                                                    I am Sure.
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </Box>
                                                </Stack>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination component='div' page={page} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage}
                                count={gymStaffs.length} onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }}>
                            </TablePagination>
                        </TableContainer>
                    </div>
                </Stack>
            </Stack>
        </>
    );
}
export default AdminPanelStaff;
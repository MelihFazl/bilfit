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

const gender = [
    {
        value: 'Male',
        label: 'Male',
    },
    {
        value: 'Female',
        label: 'Female',
    }
]
function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    //Below are new user data when staff admin added
    const [newUserID, setNewUserID] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newUserMail, setNewUserMail] = useState('');
    const [newUserGender, setNewUserGender] = useState('');
    const [newUserBirthDate, setNewUserBirthDate] = useState('');

    //Below are for editing users
    const [editUserID, setEditUserID] = useState('');
    const [editUserName, setEditUserName] = useState('');
    const [editUserMail, setEditUserMail] = useState('');
    const [editUserGender, setEditUserGender] = useState('');
    const [editUserBirthDate, setEditUserBirthDate] = useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const cancelNewUser = () => {
        setNewUserID('');
        setNewUserName('');
        setNewUserMail('');
        setNewUserGender('');
        setNewUserBirthDate('');
    };
    const cancelEditingUser = () => {
        setEditUserID('')
        setEditUserName('');
        setEditUserMail('');
        setEditUserGender('');
        setEditUserBirthDate('');
    };

    //fetching data from restAPI
    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
            });
    }, []);

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
                        <TextField className="newUser" onChange={event => setNewUserID(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserID"
                            label="User ID"
                            type="number"
                            required={true}
                            fullWidth
                            variant="standard"
                            color='secondary'
                            errorText="Please enter only 8 digits number"
                            focused
                        />
                        <TextField className="newUser" onChange={event => setNewUserName(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserName"
                            label="User Full Name"
                            required={true}
                            type="text"
                            color='secondary'

                            fullWidth
                            variant="standard"

                            focused
                        />
                        <TextField className="newUser" onChange={event => setNewUserMail(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserMail"
                            label="User Mail"
                            color='secondary'

                            required={true}
                            type="mail"
                            fullWidth
                            variant="standard"

                            focused
                        />
                        <TextField className="newUser" onChange={event => setNewUserBirthDate(event.target.value)}
                            autoFocus
                            margin="dense"
                            id="newUserBirthDate"
                            label="User Birth Date"
                            required={true}
                            color='secondary'
                            type="date"
                            fullWidth
                            variant="standard"

                            focused
                        />
                        <TextField className="newUser"
                            autoFocus
                            id="newUserGender"
                            margin="dense"
                            select
                            label="Select User Gender"
                            required={true}
                            value={newUserGender}
                            color="secondary"
                            onChange={event => {
                                setNewUserGender(event.target.value);

                            }}
                            helperText="Please select Gender"
                            focused
                        >
                            {gender.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { 
                            setOpen(false); cancelNewUser()
                        }}>Cancel </Button>
                        <Button onClick={(newUserID != '' && newUserMail != '' && newUserGender!= '' && newUserBirthDate!= '' && newUserGender!= '') ? (event) =>setOpen(false) : (event) => alert("All fields must be filled") /*ADD SONRASI SIFIRLAMAK LAZIM*/ }>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Stack className='mainStackUser' direction="column"
                spacing={3} alignItems="center"    >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h1 className='header'>All Users</h1> </div>
                <Stack className='mainStack' direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}>

                    <div className="UserContainer">
                        <TableContainer component={Paper} >
                            <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>User ID</StyledTableCell>
                                        <StyledTableCell align='right'>User Mail</StyledTableCell>
                                        <StyledTableCell align='right'>User Full Name</StyledTableCell>
                                        <StyledTableCell align='right'>User Phone Number</StyledTableCell>
                                        <StyledTableCell align='right'>User Birth Date</StyledTableCell>
                                        <StyledTableCell align='right'>User Gender</StyledTableCell>
                                        <StyledTableCell align='right'>User Weight</StyledTableCell>
                                        <StyledTableCell align='right'>User Height</StyledTableCell>
                                        <StyledTableCell align='right'></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {users.map((user, index) => (
                                        <StyledTableRow key={user.id} component="th" scope="row"  >
                                            <StyledTableCell className='cellItem'>
                                                {user.email}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'>
                                                {user.id} {newUserID}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' > {newUserName}
                                                {user.name}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {user.phoneNumber}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'  >
                                                {user.birthdate}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem'>
                                                {user.gender}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {user.weight}
                                            </StyledTableCell>
                                            <StyledTableCell className='cellItem' >
                                                {user.height}
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
                                                        <IconButton aria-label="Example" onClick={() => { setOpen2(true); }} >
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </IconButton>
                                                    </Box>
                                                    <Dialog open={open2} onClose={() => { setOpen2(false); }}>
                                                        <DialogTitle>Edit User Information</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Please enter the information that you want to change.
                                                            </DialogContentText>
                                                            <TextField className="editUser" onChange={event => setEditUserID(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id="UserID"
                                                                label="User ID"
                                                                color='secondary'

                                                                placeholder={user.id}
                                                                type="number"
                                                                fullWidth
                                                                variant="standard"
                                                                errorText="Please enter only 8 digits number"
                                                                focused
                                                            />
                                                            <TextField className="editUser" onChange={event => setEditUserName(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id="UserName"
                                                                label="User Full Name"
                                                                placeholder={user.name}
                                                                color='secondary'

                                                                type="text"
                                                                fullWidth
                                                                variant="standard"

                                                                focused
                                                            />
                                                            <TextField className="editUser" onChange={event => setEditUserMail(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id="UserMail"
                                                                label="User Mail"
                                                                placeholder={user.email}
                                                                color='secondary'

                                                                type="mail"
                                                                fullWidth
                                                                variant="standard"

                                                                focused
                                                            />
                                                            <TextField className="editUser" onChange={event => setEditUserBirthDate(event.target.value)}
                                                                autoFocus
                                                                margin="dense"
                                                                id="UserBirthDate"
                                                                label="User Birth Date"
                                                                placeholder={user.birthdate}
                                                                color='secondary'

                                                                type="date"
                                                                fullWidth
                                                                variant="standard"

                                                                focused
                                                            />
                                                            <TextField className="editUser" onChange={event => setEditUserGender(event.target.value)}
                                                                autoFocus
                                                                id="UserGender"
                                                                margin="dense"
                                                                select
                                                                label="Select User Gender"
                                                                color='secondary'
                                                                value={editUserGender}
                                                                helperText="Please select Gender"
                                                                focused
                                                            >
                                                                {gender.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => {setOpen2(false); cancelEditingUser()}}>Cancel</Button>
                                                            <Button onClick={() => { setOpen2(false); /*submitEditingUser(index)*/ }}>Submit</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    <Box className='deleteButton'
                                                        sx={{
                                                            '& > :not(style)': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        <IconButton aria-label="Example" onClick={() => { alert(index) /* deleteUser(index)*/ }} >
                                                            <FontAwesomeIcon icon={faTrashCan} />
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
export default AdminPanel;
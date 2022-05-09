import React from "react";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../Navbar/Button'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from "react";
import './User.css';
import '../HttpService.js'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
        fontSize: 15
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#6D8299',
        fontSize: 15,
        borderBottom: "none",
        fontFamily: 'PT Sans, sans-serif'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function User() {
    //variables
    const [button, setButton] = useState(true);//2 buttons may be needed
    const [user, setUser] = useState([]);
    const [editClick, setEditClick] = useState(false);
    const [changePasswordClick, setChangePasswordClick] = useState(true);//when initial value false, doesn't work properly 
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [phone, setPhone] = useState();
    const [mail, setMail] = useState();
    const [hidePassword, setHidePassowrd] = useState(true);

    function changeWeight(user_id, newValue) {
            fetch('http://localhost:8080/user/editGymMember/' + user_id, {
                method: 'PATCH',
                body : JSON.stringify({
                    weight : newValue,
                }),
                headers : {
                    'Content-type' : 'application/json'
                }
            })
            getUserData()
    }

    function changeHeight(user_id, newValue) {
            fetch('http://localhost:8080/user/editGymMember/' + user_id, {
                method: 'PATCH',
                body : JSON.stringify({
                    height : newValue,
                }),
                headers : {
                    'Content-type' : 'application/json'
                }
            })
            getUserData()
    }

    function changePhoneNumber(user_id, newValue) {
        console.log("first")
            fetch('http://localhost:8080/user/editGymMember/' + user_id, {
                method: 'PATCH',
                body : JSON.stringify({
                    phoneNumber : newValue,
                }),
                headers : {
                    'Content-type' : 'application/json'
                }
            })
            getUserData()
    }

    const handleEditClick = () => {
        setOpen(true);
    }
    const handleEditClick2 = () => {
        setOpen(false);
    }

    const handleChangePasswordClick = () => {
        setChangePasswordClick(!changePasswordClick);
        setOpenDialog(changePasswordClick);
    }

    const handleHidePassword = () => setHidePassowrd(!hidePassword);



    //javascript mehods

    //in order to display the customly designed button
    const showButton = () => {
        if (window.innerWidth <= 960)
            setButton(false);
        else
            setButton(true);
    };
    window.addEventListener("resize", showButton);

    // get user id from local storage
    let user_id = localStorage.getItem("userid");
    let userId = 50 // delete this later

    function getUserData() {
        fetch('http://localhost:8080/user/'+ user_id)
            .then((res) => res.json())
            .then((result) => {
                // console.log(result)
                console.log(result)
                setUser(result[0]);
            });
    }
    //get users from fake rest api
    useEffect(() => {
        getUserData()
    }, []);

    //console.log(user[0])





    return (
        <><Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'horizontal',
            justifyContent: 'center',
            margin: '2rem',
        }}>

            <Box sx={{
                borderRadius: "2%",
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: "#F05454",
                margin: '1rem',
                padding: '2rem',
                width: '30rem',
            }}>
                <Avatar alt="Remy Sharp" src="../images/gym_avatar.png"//dummy avatar, may change later
                    sx={{ height: '7.5rem', width: '7.5rem' }} />
                <Typography variant="h4" sx={{ fontFamily: 'PT Sans, sans-serif' }} >
                    {/* {users.map((user) => user.id === userId ? (<div>{user.name}</div>) : (<></>))} */}
                    {user.name}
                </Typography>
                <Box sx={{ margin: '1rem' }}>
                    {editClick ? button && <Button buttonStyle="btn--outline" onClick={handleEditClick} margin="1rem" >Finish Edit</Button>
                        : button && <Button buttonStyle="btn--outline" onClick={handleEditClick} margin="1rem" >Edit Profile</Button>}
                </Box>
                <Box>
                    {button && <Button buttonStyle="btn--outline" onClick={handleChangePasswordClick} margin="1rem" >Change Password</Button>}
                </Box>
            </Box>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '1rem' }}>
                <TableContainer component={Paper} >
                    <Table sx={{ width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                        <TableBody >
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    ID:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {/* {users.map((user) => user.id === userId ? (<div>{users.id}</div>) : (<></>))} */}
                                    <div>{user.id}</div>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Gender:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {/* {users.map((user) => user.id === userId ? (<div>{user.gender}</div>) : (<></>))} */}
                                    {user.gender}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Birthdate:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {/* {users.map((user) => user.id === userId ? (<div>{user.birthdate}</div>) : (<></>))} */}
                                    {user.birthdate}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Weight:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {editClick && 
                                        (<TextField type="number" defaultValue={user.weight} onChange={(e) => {
                                            //console.log(e.target.value);
                                            changeWeight(user_id, e.target.value);
                                          }}></TextField>)
                                    }
                                    {!editClick &&
                                        (<div>{user.weight}</div>)
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Height:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {editClick && 
                                        (<TextField type="number" defaultValue={user.height} onChange={(e) => {
                                            //console.log(e.target.value);
                                            changeHeight(user_id, e.target.value);
                                          }}></TextField>)
                                    }
                                    {!editClick &&
                                        (<div>{user.height}</div>)
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Phone Number:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                {editClick && 
                                        (<TextField type="number" defaultValue={user.phoneNumber} onChange={(e) => {
                                            //console.log(e.target.value);
                                            changePhoneNumber(user_id, e.target.value);
                                          }}></TextField>)
                                    }
                                    {!editClick &&
                                        (<div>{user.phoneNumber}</div>)
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Email:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {/* {user.map((user) => user.id === userId ? (<div>{user.email}</div>) : (<></>))} */}
                                    {user.email}
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/*This is created for the change password dialog.*/}
            <Dialog open={openDialog} onClose={handleChangePasswordClick}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your new password:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        color="secondary"
                        label="New Password"
                        type={hidePassword ? 'password' : 'name'}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            endAdornment: <IconButton aria-label="Example" onClick={handleHidePassword}>
                                <FontAwesomeIcon icon={faEyeSlash} width='20px' />
                            </IconButton>
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        color="secondary"
                        id="name"
                        label="Re-Enter Password"
                        type={hidePassword ? 'password' : 'name'}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleChangePasswordClick}>Cancel</Button>
                    <Button onClick={handleChangePasswordClick}>Submit</Button>
                </DialogActions>
            </Dialog>


            {/*******************************************************************/}
            <Dialog open={open} onClose={handleEditClick}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit Profile:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        color="secondary"
                        label="email"
                        placeholder={user.mail}
                        type= "text"
                        fullWidth
                        variant="standard"
                      
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        color="secondary"
                        id="phonenumber"
                        placeholder={user.phoneNumber}
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClick2}>Cancel</Button>
                    <Button onClick={handleChangePasswordClick}>Submit</Button>
                </DialogActions>
            </Dialog>                        


        </Box >

            <div className="App">
                <Grid>
                    <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto", marginBottom: '1rem'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                Request Gym Program
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                Fill up the form and our gym staff will contact you as soon as possible.
                            </Typography>
                            <form>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <TextField type="title" placeholder="Enter a title" label="Title" variant="outlined" fullWidth/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Message" multiline rows={4} placeholder="Enter your expactations from this program" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {button && <Button buttonStyle="btn--primary" style={{color:"#000"}} margin="1rem" >Submit</Button>}
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    )
}
export default User;
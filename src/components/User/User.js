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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CampaignIcon from '@mui/icons-material/Campaign';



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
    const [hidePassword, setHidePassowrd] = useState(true);
    // const [userType, setUserType] = useState(); // not using state for this, use localStorage.getItem("usertype")

    const [reqDescription, setReqDescription] = useState();
    const [gymProgramRequests, setGymProgramRequests] = useState();
    const [openPopUp, setOpenPopUp] = useState(false)
    const [changePopUpClick, setChangePopUpClick] = useState(true)
    const [requestOwnerName, setRequestOwnerName] = useState()
    const [requestOwnerID, setRequestOwnerID] = useState()
    const [reqDescriptionForStaff, setReqDescriptionForStaff] = useState()
    const [program, setProgram] = useState()
    const [requestOwner, setRequestOwner] = useState()
    const [reqId, setReqId] = useState()
    const [announcementTitle, setAnnouncementTitle] = useState()
    const [announcementDescription, setAnnouncementDescription] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [reNewPassword, setReNewPassword] = useState()



    function handleSubmitPassword() {
        console.log(oldPassword)
        console.log(newPassword)
        console.log(reNewPassword)

        if (newPassword !== reNewPassword) {
            alert("Your new re-entered password does not match the new password")
        }
        else {
            fetch('http://localhost:8080/user/changePassword/'+user_id +'?newPassword='+newPassword+'&oldPassword='+oldPassword, {
                method: 'PATCH'
            })
            .then((res) => {res.text().then((result) => {
                    if (result.includes("incorrect")) {
                        alert("Your old password is incorrect")
                    }
                    else {
                        setChangePasswordClick(!changePasswordClick);
                        setOpenDialog(false);
                    }
            })})
            
        

        }

    }

    
    function writeProgram(req) {
        // 1- display pop for staff to write program
        // 2- send program (it will replace the latest program of the member)
        // delete that request


        
        //console.log(member_id)  // works fine
        setRequestOwnerName(req.owner.name)
        setRequestOwnerID(req.owner.id)
        setReqDescriptionForStaff(req.description)
        setReqId(req.id);
        setOpenPopUp(true);
        //console.log(program)
    }

    function submitRequest(e) {
        // console.log(reqTitle)
        // console.log(reqDescription)
        e.preventDefault();
        //console.log(reqDescription)
        fetch('http://localhost:8080/gymProgram/sendRequest?memberId=' + user_id, {
                
                method: 'POST',
                body : JSON.stringify({
                    description : reqDescription,
                }),
                headers : {
                    'Content-type' : 'application/json'
                }
            })
            alert("Your gym program request has been sent!")
            getUserData()
    }



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
            getUserData()
    }

    function changePhoneNumber(user_id, newValue) {
        //console.log("first")
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
            getUserData()
    }

    const handleEditClick = () => {
        setEditClick(!editClick);
    }

    const handleChangePasswordClick = () => {
        setChangePasswordClick(!changePasswordClick);
        setOpenDialog(changePasswordClick);
    }

    // added for write gym program pop-up
    const handlePopUpClick = () => {
        setChangePopUpClick(!changePopUpClick);
        setOpenPopUp(changePopUpClick);
    }

    // added for after writing gym program and closing pop up
    function closePopUpAndSend() {
        //console.log(program)
        // 1- get the user who sent the request (from state: requestOwnerID)
        // 2- add gym program (save Gym Program)
        // 3- delete that gym program request with DELETE


        //1-
        fetch('http://localhost:8080/user/'+ requestOwnerID)
        .then((res) => res.json())
        .then((result) => {
            setRequestOwner(result);
            //console.log(result);
        });
        //console.log(requestOwner)

        //2-
        fetch('http://localhost:8080/gymProgram/sendProgram/?memberId='+ requestOwnerID+'&staffId='+user_id, {
                
            method: 'POST',
            body : JSON.stringify({
                description : program,
            }),
            headers : {
                'Content-type' : 'application/json'
            }
        })
            
        // 3-
        fetch('http://localhost:8080/gymProgram/deleteRequest/' + reqId, {
            method: 'DELETE'
        }).then((result) => {
            result.text().then((actualResult) =>{
                getUserData()
                //
                setChangePopUpClick(!changePopUpClick);
                setOpenPopUp(false);
            })
        })

        
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
                setUser(result[0]);
            });
        if (localStorage.getItem("usertype") == "staff" ) {
            fetch('http://localhost:8080/gymProgram/getProgramRequests')
            .then((res2) => res2.json())
            .then((result2) => {
                // console.log(result)
                setGymProgramRequests(result2);
            });
        }
        
        

    }

    function storeProgram(e) {
        setProgram(e.target.value)
        //console.log(program)
    }

    // make announcement for gym staff
    function makeAnnouncementTitle(e) {
        setAnnouncementTitle(e.target.value)
    }
    function makeAnnouncementDescription(e) {
        setAnnouncementDescription(e.target.value)
    }

    function oldPsw(e) {
        setOldPassword(e.target.value)
    }
    function newPsw(e) {
        setNewPassword(e.target.value)
    }
    function reNewPsw(e) {
        setReNewPassword(e.target.value)
    }

    

    // make announcement submit button
    function submitAnnouncement() {
        fetch('http://localhost:8080/announcement/make', {
            method: 'POST',
            body: JSON.stringify({
                title: announcementTitle,
                description: announcementDescription
            }),
            headers : {
                'Content-type' : 'application/json'
            }
        })
        alert("Announcement has been published successfully!")
        setAnnouncementTitle("")
        setAnnouncementDescription("")
    }
    
    useEffect(() => {
        getUserData()
    }, []);

    //console.log(user)
    //console.log(gymProgramRequests)
    //console.log(user[0])


    const boxStyle2 = {
        float: 'left',
        width: '50%',
        padding: '3rem',
    }

    const boxStyle3 = {
        
        marginLeft: "25%",
        width: '50%',
        padding: '3rem',
    }

    const paragraphStyle2 = {
        marginLeft: '3px',
        fontFamily: 'Inter, sans-serif',
    }


    const headerStyle2 = {
        /**marginLeft: '5rem',
        marginTop: '3rem',*/
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
    };

    const listStyle = {
        /**marginTop: '2rem',
        marginRight: '30rem',
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#6D8299',*/
        fontFamily: 'Inter, sans-serif',
        maxHeight: '40vh',
        overflow: 'auto',
        border: '2px solid #B3ADAB',
        marginTop: '2rem',
        backgroundColor: '#D9D7D7',
    }


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
                {localStorage.getItem("usertype") == "member" &&
                    <Box sx={{ margin: '1rem' }}>
                    {editClick ? button && <Button buttonStyle="btn--outline" onClick={handleEditClick} margin="1rem" >Finish Edit</Button>
                        : button && <Button buttonStyle="btn--outline" onClick={handleEditClick} margin="1rem" >Edit Profile</Button>}
                    </Box>
                }
                
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
                            {localStorage.getItem("usertype") == "member" &&
                                <StyledTableRow component="th" scope="row"  >
                                    <StyledTableCell className='cellItem'>
                                        Gender:
                                    </StyledTableCell>
                                    <StyledTableCell className='cellItem' >
                                        {/* {users.map((user) => user.id === userId ? (<div>{user.gender}</div>) : (<></>))} */}
                                        {user.gender}
                                    </StyledTableCell>
                                </StyledTableRow>
                            }
                            { localStorage.getItem("usertype") == "member" && 
                            <StyledTableRow component="th" scope="row"  >
                            <StyledTableCell className='cellItem'>
                                Birthdate:
                            </StyledTableCell>
                            <StyledTableCell className='cellItem' >
                                {/* {users.map((user) => user.id === userId ? (<div>{user.birthdate}</div>) : (<></>))} */}
                                {user.birthdate}
                            </StyledTableCell>
                        </StyledTableRow>                           
                            }

                            {localStorage.getItem("usertype") == "member" && 
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
                            }
                            {localStorage.getItem("usertype") == "member" && 
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
                            }

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
                        label="Old Password"
                        type={hidePassword ? 'password' : 'name'}
                        fullWidth
                        variant="standard"
                        onChange={(e) => {oldPsw(e)}}
                        InputProps={{
                            endAdornment: <IconButton aria-label="Example" onClick={handleHidePassword}>
                                <FontAwesomeIcon icon={faEyeSlash} width='20px' />
                            </IconButton>
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        color="secondary"
                        label="New Password"
                        onChange={(e) => {newPsw(e)}}
                        type={hidePassword ? 'password' : 'name'}
                        fullWidth
                        variant="standard"
                        
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        color="secondary"
                        id="name"
                        onChange={(e) => {reNewPsw(e)}}
                        label="Re-Enter Password"
                        type={hidePassword ? 'password' : 'name'}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleChangePasswordClick}>Cancel</Button>
                    <Button onClick={handleSubmitPassword}>Submit</Button>
                </DialogActions>
            </Dialog>

            {/*This is created for the gym staff to write a gym program*/}
            <Dialog open={openPopUp} onClose={handlePopUpClick}>
                <DialogTitle>Write gym program for Gym Member "{requestOwnerName}" with id "{requestOwnerID}"</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {reqDescriptionForStaff}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        color="secondary"
                        id="name"
                        label="Write here..."
                        fullWidth
                        variant="standard"
                        onChange={(e) => {storeProgram(e)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopUpAndSend}>Send</Button>
                </DialogActions>
            </Dialog>

            



        </Box >

            <div className="App">
                <Grid>
                    {localStorage.getItem("usertype") == "member" && 
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
                                        <TextField label="Message" multiline rows={4} onChange={(e) => {
                                            setReqDescription(e.target.value)}} 
                                            placeholder="Enter your expactations from this program" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {button && <Button buttonStyle="btn--primary" style={{color:"#000"}} margin="1rem" onClick={(e) => {submitRequest(e)}}>Submit</Button>}
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                    }

                {localStorage.getItem("usertype") == "member" && user.program &&
                    <Box  style={boxStyle3}>
                    <h2 style={headerStyle2}>Your Requested Gym Program Written By Our Staff</h2>
                    <List style={listStyle}>
                        <ListItem>
                            <ListItemIcon><CampaignIcon /></ListItemIcon>
                            <ListItemText primary={user.program === null ? "..." : user.program.description} />
                        </ListItem>
                    </List>
                </Box>
                }
                {localStorage.getItem("usertype") == "staff" && 
                <Box>
                    <Box  style={boxStyle2}>
                    <h2 style={headerStyle2}>Gym Program Requests</h2>
                    <List style={listStyle}>
                        {console.log(gymProgramRequests)}
                        {gymProgramRequests &&
                            gymProgramRequests.slice(0).reverse().map((request, index) =>
                            (
                            <ListItemButton onClick={(e) => {writeProgram(request)}}>
                                <ListItemText primary={request.description} secondary={request.owner.name+" (id:"+request.owner.id+")"} />
                            </ListItemButton>
                            ))
                        }
                        {(!gymProgramRequests || gymProgramRequests.length == 0) &&
                            <h style={paragraphStyle2}>There is no pending gym program requests</h>
                        }
                    </List>
                </Box>
                <Box  style={boxStyle2}>
                <h2 style={headerStyle2}>Make An Announcement</h2>
                <List style={listStyle}>

                        <ListItem>
                            <TextField value={announcementTitle} label={"Title"} fullWidth onChange={(e) => {makeAnnouncementTitle(e)}}></TextField> 
                        </ListItem>
                        <ListItem>
                            <TextField value={announcementDescription} label={"Description"} fullWidth onChange={(e) => {makeAnnouncementDescription(e)}}></TextField>                 
                        </ListItem>
                        <Button onClick={submitAnnouncement}>Announce!</Button>
                </List>
                </Box>
                </Box>
                
                }
                    
                
                </Grid>
            </div>
        </>
    )
}
export default User;
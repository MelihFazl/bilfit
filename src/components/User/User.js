import React from "react";
import { Button } from '../Navbar/Button'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
    const [button, setButton] = useState(true);
    const [users, setUsers] = useState([]);
    const [editClick, setEditClick] = useState(false);

    const handleEditClick = () => {
        setEditClick(!editClick);
    }

    var userId = 21902222;
    //const { userId } = useParams(); Can be used in the future to get id from parameters

    //javascript mehods

    //in order to display the customly designed button
    const showButton = () => {
        if (window.innerWidth <= 960)
            setButton(false);
        else
            setButton(true);
    };
    window.addEventListener("resize", showButton);

    //get users from fake rest api
    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
            });
    }, []);

    return (

        <Box sx={{
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
                    {users.map((user) => user.id === userId ? (<div>{user.name}</div>) : (<></>))}
                </Typography>
                <Box sx={{ margin: '1rem' }}>
                    {editClick ? button && <Button buttonStyle="btn--outline" onClick={handleEditClick} margin="1rem" >Finish Edit</Button>
                        : button && <Button buttonStyle="btn--outline" onClick={handleEditClick} margin="1rem" >Edit Profile</Button>}
                </Box>
                <Box>
                    {button && <Button buttonStyle="btn--outline" margin="1rem" >Change Password</Button>}
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
                                    {/*this method finds the user with specified id and displays the user that is found in the array. 
                                We may find a different method to accomplish this.*/}
                                    {users.map((user) => user.id === userId ? (<div>{user.id}</div>) : (<></>))}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Gender:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {users.map((user) => user.id === userId ? (<div>{user.gender}</div>) : (<></>))}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Birthdate:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {users.map((user) => user.id === userId ? (<div>{user.birthdate}</div>) : (<></>))}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Weight:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {/*Changing acquired input is not implemented, needs to be implemented after connection with database*/}
                                    {editClick ? (users.map((user) => user.id === userId ? (<TextField type="number" defaultValue={user.weight}></TextField>) : (<></>)))
                                        : (users.map((user) => user.id === userId ? (<div>{user.weight}</div>) : (<></>)))}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Height:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {editClick ? (users.map((user) => user.id === userId ? (<TextField type="number" defaultValue={user.height}></TextField>) : (<></>)))
                                        : (users.map((user) => user.id === userId ? (<div>{user.height}</div>) : (<></>)))}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Phone Number:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {editClick ? (users.map((user) => user.id === userId ? (<TextField type="number" defaultValue={user.id}></TextField>) : (<></>)))
                                        : (users.map((user) => user.id === userId ? (<div>{user.id}</div>) : (<></>)))}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Email:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    {users.map((user) => user.id === userId ? (<div>{user.email}</div>) : (<></>))}
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    )
}
export default User;
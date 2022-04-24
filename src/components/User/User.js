import React from "react";
import { Button } from '../Navbar/Button'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
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

function User(props) {
    //variables
    const [button, setButton] = useState(true);
    const [users, setUsers] = useState([]);
    const { userId } = useParams();

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

    /**const getUser = () => {
        GetWithAuth("/users/21901111")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setUsers(result);
            },
            (error) => {
                console.log(error)
            }
        )
        }

        useEffect(() => {
            getUser()
        }, [])*/
    
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'horizontal',
            justifyContent: 'center',
            margin: '2rem'
        }}>

        <Box sx={{
            borderRadius: "2%",
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: "#F05454",
            margin: '1rem',
            padding: '2rem',
            width: '30rem'
        }}>
            <Avatar alt="Remy Sharp" src=""
                sx={{ height: '7.5rem', width: '7.5rem'}} />
            <Typography variant="h4" sx={{ fontFamily: 'PT Sans, sans-serif' }} >
                Ahmet Mehmet
            </Typography>
            <Box sx = {{ margin: '1rem'}}>
                {button && <Button buttonStyle="btn--outline" margin = "1rem" >Edit Profile</Button>}
            </Box>
            <Box>
                {button && <Button buttonStyle="btn--outline" margin = "1rem" >Change Password</Button>}
            </Box>
        </Box>
            
        
            
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' , margin: '1rem'}}>
                <TableContainer component={Paper} >
                    <Table sx={{  width: '100%', backgroundColor: '#F5F5F5', height: "max-content" }} aria-label="customized table"  >
                        <TableBody >
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    ID:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    21901111
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Gender:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    Male
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Birthdate: 
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    22 July 2001
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Weight:
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    1.73
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Height: 
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    1.73
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Phone Number: 
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    500 000 00 00
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow component="th" scope="row"  >
                                <StyledTableCell className='cellItem'>
                                    Email: 
                                </StyledTableCell>
                                <StyledTableCell className='cellItem' >
                                    mehmet@ug.bilkent.edu.tr
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
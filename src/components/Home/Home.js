import { Stack } from "@mui/material";
import React from "react";
import ImageShowcase from './ImageShowcase'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { width } from "@mui/system";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useRef } from 'react'
import { Paper, Button } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { useEffect } from 'react';
import { useState } from "react";



function Home() {

    const [announcements, setAnnouncements] = useState([]);


    /**
     * useEffect(() => {
    if(userType === 1)
    {
      fetch('http://localhost:8080/reservation/')
      .then((res) => res.json())
      .then((result) => {
        setReservations(result);
      });
    } 
}, []);
     */

    handleData()
    const firstItemRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8080/announcement/')
        .then((res) => res.json())
        .then((result) => {
            setAnnouncements(result);
            console.log(announcements);
        });
    }, []);

    //css styling
    const boxStyle1 = {
        float: 'left',
        width: '50%',
        padding: '3rem',
    }

    const boxStyle2 = {
        float: 'left',
        width: '50%',
        padding: '3rem',
    }
    const headerStyle1 = {
        /**marginLeft: '5rem',
        marginTop: '3rem',
        fontFamily: 'Inter, sans-serif',*/
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
    };

    const headerStyle2 = {
        /**marginLeft: '5rem',
        marginTop: '3rem',*/
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
    };

    const paragraphStyle = {
        /**marginTop: '2rem',
        marginLeft: '5rem',
        width: '40%',
        fontSize: '17px',
        fontWeight: '200'*/
        fontFamily: 'Inter, sans-serif',
    }
    const paragraphStyle2 = {
        marginLeft: '3px',
        fontFamily: 'Inter, sans-serif',
    }

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
        <>
            <ImageShowcase firstItemRef={firstItemRef} />
            <Stack direction='row'>
                <Box style={boxStyle1}>
                    <h2 style={headerStyle1} id='jump'>Physical Education and Sports Center</h2>
                    <p style={paragraphStyle}><br />Our Mission is to provide the Bilkent University students with quality physical education,
                        sports and fitness programs and an environment in which they can participate in variety of activities,
                        team and individual sports and games while getting in shape and staying active all year long.<br /><br /> With our new
                        website, we hope that you will have a better experience when you want to use the sports facilities of Bilkent University.
                        
                        We wish you healthy days,<br /><br />Veni Vidi Code</p>
                </Box>
                <Box style={boxStyle2} ref={firstItemRef}>
                    <h2 style={headerStyle2}>Announcements</h2>
                    <List style={listStyle}>
                        {announcements.length > 0 &&
                        announcements.slice(0).reverse().map((announcement, index) =>
                        (
                        <ListItem>
                            <ListItemIcon><CampaignIcon /></ListItemIcon>
                            <ListItemText primary={announcement.title+" ("+announcement.date.substring(0,10)+")"} secondary={announcement.description} />{/*The data information can be later coming from an input*/}
                        </ListItem>
                        ))
                        }
                        {announcements.length == 0 &&
                            <h style={paragraphStyle2}>No announcement yet</h>
                        }
                        
                    </List>
                </Box>
            </Stack>
        </>


    )
}

export default Home;
 const handleData =() => {
        fetch("http://localhost:8080/announcement/" , {
            method:"GET",
        }).then(result=>result.json()).then((result) => {
          console.log(result);
          console.log(new Date(result[0].date.toString().substring(0, 10)))
          //Use state, announcements use the result coming from here kerem kardesim
    })}
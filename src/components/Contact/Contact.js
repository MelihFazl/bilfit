import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import Box from '@mui/material/Box';


function Contact(){

    const[contacts, setContacts] = useState([]);

    const paragraphStyle2 = {
        marginLeft: '80px',
        marginBottom: '40px',
        fontFamily: 'Inter, sans-serif',
    }
    const paragraphStyle3 = {
        marginLeft: '120px',
        marginBottom: '10px',
        fontFamily: 'Inter, sans-serif',
    }
    const boxStyle = {
        marginTop: "80px"
    }


    useEffect(() => {
        fetch('http://localhost:8080/contact/all/')
          .then((res) => res.json())
          .then((result) => {
            setContacts(result);
            
          });     
      }, []);
      console.log(contacts)


    return(
        <Box>
            <div  style={boxStyle}>

            </div>
            <Box>
                <h1 style={paragraphStyle2}>
                    Our Gym Staff:
                </h1>
            </Box>
            {contacts.map((contact, index) =>
            (
                <Box>
                <h2 style={paragraphStyle3}>{contact.name}</h2>
                <h4 style={paragraphStyle3}>{contact.email}</h4>
                <h5 style={paragraphStyle3}>{contact.phoneNumber}</h5>
                <br></br>
                </Box>                
            )
            )}
        </Box>
        
    )
}
export default Contact;
import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import Box from '@mui/material/Box';


function Contact(){

    const[contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/contact/all/')
          .then((res) => res.json())
          .then((result) => {
            setContacts(result);
            
          });     
      }, []);
      console.log(contacts)


    return(
        <>
            {contacts.map((contact, index) =>
            (
                <Box>
                <h2>{contact.name}</h2>
                <h3>{contact.email}</h3>
                <h4>{contact.phoneNumber}</h4>
                <br></br>
                </Box>
                
                
                
            )
            )}

        </>
        
    )
}
export default Contact;
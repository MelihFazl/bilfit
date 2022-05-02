import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';



function GymProgramList(){
    return(
      <>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> <h1 className='header'> All Gym Programs</h1> </div>
        <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Fahri Koray </Typography> 
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Hello. I just want to shape my body and gain muscles. My weight is 80 kg and my height is 178cm. I have never gone to gym during my life.
           However, I am very passionate to be fit this time. I can go to gym every day minumum 2 hours. I have no health issues that prevent me from doing cardio or lifting weights. I am waiting for good exercise program from you. Thank you, have a good day :)
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
    </>
    )
}
export default GymProgramList; 
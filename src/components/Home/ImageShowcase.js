import React from 'react';
import '../../App';
import { Button } from '../Navbar/Button';
import './ImageShowcase.css';
import { useRef } from 'react'
import { useState } from 'react'

function HeroSection( {firstItemRef}) {
    const [button, setButton] = useState(true);

  return (
    <div className='hero-container'>
      <h1>WELCOME TO BILFIT</h1>
      <p>Bilkent University Sports Center</p>
      <div className='hero-btns'>
        <Button onClick={() => firstItemRef.current.scrollIntoView()}
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Get Started
        </Button>
        {/*<Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
          </Button>*/}
      </div>
    </div>
  );
}

export default HeroSection;
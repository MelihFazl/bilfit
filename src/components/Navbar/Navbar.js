import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import "./Navbar.css";

function Navbar() {
    //declarations
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    let userId = 5;
    let reservationId = 5;

    //function body
    const showButton = () => {
        if (window.innerWidth <= 960)
            setButton(false);
        else
            setButton(true);
    };
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    window.addEventListener("resize", showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
                        Bilfit
                        <img src="./images/bilfit_logo.png" alt="Bilfit Logo" className="bilfit-logo" />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {
                            click ? (<FontAwesomeIcon icon={faCircleXmark} />) : (<FontAwesomeIcon icon={faBars} />)
                        }
                    </div>
                    {
                        click ?
                            <ul className="nav-menu active">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-links" onClick={closeMobileMenu} >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: "/reservations/" + reservationId }} className="nav-links" onClick={closeMobileMenu}>
                                        Reservations
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/tournaments" className="nav-links" onClick={closeMobileMenu}>
                                        Tournaments
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/courses" className="nav-links" onClick={closeMobileMenu}>
                                        Courses
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: "/my-profile/" + userId }} className="nav-links" onClick={closeMobileMenu}>
                                        My Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                            :
                            <ul className="nav-menu">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-links" onClick={closeMobileMenu} >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: "/reservations/" + reservationId }} className="nav-links" onClick={closeMobileMenu}>
                                        Reservations
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/tournaments" className="nav-links" onClick={closeMobileMenu}>
                                        Tournaments
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/courses" className="nav-links" onClick={closeMobileMenu}>
                                        Courses
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: "/my-profile/" + userId }} className="nav-links" onClick={closeMobileMenu}>
                                        My Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>

                    }
                    <Link to= '/' className='btn-mobile'>
                        {button && <Button buttonStyle="btn--outline">Log Out</Button>}
                    </Link>
                    
                </div>
            </nav>
        </>
    )
}
export default Navbar
//NOTES
//Maybe we do not need Link tag for navbar logo


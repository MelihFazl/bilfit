import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Dropdown from './Dropdown';
import "./Navbar.css";

function Navbar() {
    //declarations
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [dropdown1, setDropdown1] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
    let userId = 5;
    let reservationId = 5;

    //methods
    const showButton = () => {
        if (window.innerWidth <= 1100)
            setButton(false);
        else
            setButton(true);
    };

    const onMouseEnter1 = () => {
        if (window.innerWidth < 960) {
          setDropdown1(false);
        } else {
          setDropdown1(true);
        }
      };
    
    const onMouseLeave1 = () => {
        if (window.innerWidth < 960) {
          setDropdown1(false);
        } else {
          setDropdown1(false);
        }
      };

    const onMouseEnter2 = () => {
        if (window.innerWidth < 960) {
          setDropdown2(false);
        } else {
          setDropdown2(true);
        }
      };
    
    const onMouseLeave2 = () => {
        if (window.innerWidth < 960) {
          setDropdown2(false);
        } else {
          setDropdown2(false);
        }
      };

    
    const handleClick = () => setClick(!click);
    const handleLogout =() => {
        let id = localStorage.getItem("userid")
        fetch("http://localhost:8080/user/logout/" + id, {
            method: "POST"
        }).then((result) => {
            result.text().then((actualResult) => {
                console.log(actualResult)
                if(actualResult.includes("success"))
                    history.push("/")
            })
        })
    }
    const closeMobileMenu = () => setClick(false);
    window.addEventListener("resize", showButton);
    const history =  useHistory();
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
                        Bilfit
                        <img src="/images/bilfit_logo.png" alt="Bilfit Logo" className="bilfit-logo" />
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
                                <li className="nav-item" >
                                    <Link className="nav-links" onClick={closeMobileMenu} >
                                        Reservations <FontAwesomeIcon icon={faCaretDown} width='30px' />
                                    </Link>
                                    {dropdown1 && <Dropdown ChooseMenu={"reservationDropdown"}/>}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-links" onClick={closeMobileMenu}>
                                        Tournaments <FontAwesomeIcon icon={faCaretDown} width='30px' />
                                    </Link>
                                    {dropdown2 && <Dropdown ChooseMenu={"tournamentDropdown"}/>}
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
                                <li className="nav-item" onMouseEnter={onMouseEnter1} onMouseLeave={onMouseLeave1}>
                                    <Link className="nav-links" onClick={closeMobileMenu} >
                                        Reservations   <FontAwesomeIcon icon={faCaretDown} width='30px' />
                                    </Link>
                                    {dropdown1 && <Dropdown ChooseMenu={"reservationDropdown"}/>}
                                </li>
                                <li className="nav-item" onMouseEnter={onMouseEnter2} onMouseLeave={onMouseLeave2}>
                                    <Link className="nav-links" onClick={closeMobileMenu}>
                                        Tournaments <FontAwesomeIcon icon={faCaretDown} width='30px' />
                                    </Link>
                                    {dropdown2 && <Dropdown ChooseMenu={"tournamentDropdown"}/>}
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
                    <Link className='btn-mobile'>
                        {button && <Button buttonStyle="btn--outline" onClick={handleLogout}>Log Out</Button>}
                    </Link>
                    
                </div>
            </nav>
        </>
    )
}
export default Navbar



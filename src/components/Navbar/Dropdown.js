import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown({ChooseMenu}) {
  
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  //this will be returned for reservation dropdown menu on navbar
  if( ChooseMenu === "reservationDropdown"){
    return (
        <>
        <ul
          onClick={handleClick}
          className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
          {MenuItems[0].map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={item.cName}
                  to={item.path}
                  onClick={() => setClick(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
  );
  }
  //this will be returned for tournament dropdown menu on navbar
  if( ChooseMenu === "tournamentDropdown" ){
    return (
        <>
        <ul
          onClick={handleClick}
          className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
          {MenuItems[1].map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={item.cName}
                  to={item.path}
                  onClick={() => setClick(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
  );
  }
  else if( ChooseMenu === "courseDropdown" ){//this will be returned for tournament dropdown menu on navbar
      return (
          <>
          <ul
            onClick={handleClick}
            className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
          >
            {MenuItems[2].map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={item.cName}
                    to={item.path}
                    onClick={() => setClick(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
    );
    }
    else if( ChooseMenu === "staffTournamentDropdown"){//this will be returned for gym staff tournament dropdown menu on navbar
      return (
          <>
          <ul
            onClick={handleClick}
            className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
          >
            {MenuItems[3].map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={item.cName}
                    to={item.path}
                    onClick={() => setClick(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
    );
    }
    else if( ChooseMenu === "staffCoursesDropdown"){//this will be returned for gym staff tournament dropdown menu on navbar
      return (
          <>
          <ul
            onClick={handleClick}
            className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
          >
            {MenuItems[4].map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={item.cName}
                    to={item.path}
                    onClick={() => setClick(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
    );
          }
  
}

export default Dropdown;
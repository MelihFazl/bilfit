import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';
import Home from './components/Home/Home';
import MyReservations from './components/Reservation/Reservation';
import MakeReservation from './components/Reservation/MakeReservation';
import Tournaments from './components/Tournaments/Tournaments';
import EnrollTournaments from './components/Tournaments/EnrollTournaments';
import MyTournaments from './components/Tournaments/Tournaments';
import Login from './components/Login/Login';
import Contact from './components/Contact/Contact';
import TournamentRequests from './components/Tournaments/TournamentRequests'; 
import AdminPanel from './components/AdminPanel/AdminPanel';
import EnrollSportsCourses from './components/SportsCourses/EnrollSportsCourses';
import SportsCourses from './components/SportsCourses/SportsCourses';
import "./App.css";

function App() {
  return (
    <div className="bg_image">
      <BrowserRouter>
        <>
        
          <Switch>
              <Route exact path="/" component={Login} />
            <>
              <Navbar/>
              
                <Route exact path="/home" component={Home} />
                <Route path="/make-reservation" component={MakeReservation} />
                <Route path="/my-reservations" component={MyReservations} />
                <Route path="/my-tournaments" component={MyTournaments} />
                <Route path="/tournament-requests" component={TournamentRequests} />
                <Route path="/enroll-tournament" component={EnrollTournaments} />
                <Route path="/courses" component={SportsCourses}/>
                <Route path="/my-profile" component={User} />
                <Route path="/contact" component={Contact} />
                <Route path="/admin-panel" component={AdminPanel} />
            </>
          </Switch>
        </>
      </BrowserRouter>
    </div>
  )
}


export default App;


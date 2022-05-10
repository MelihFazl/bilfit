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
import EnrollTournaments from './components/Tournaments/EnrollTournaments';
import Tournaments from './components/Tournaments/Tournaments';
import Login from './components/Login/Login';
import Contact from './components/Contact/Contact';
import TournamentRequests from './components/Tournaments/TournamentRequests';
import AdminPanel from './components/AdminPanel/AdminPanel';
import GymStaffPanel from './components/AdminPanel/GymStaffPanel';
import EnrollSportsCourses from './components/SportsCourses/EnrollSportsCourses';
import SportsCourses from './components/SportsCourses/SportsCourses';
import "./App.css";
import { useState } from "react";
import AdminPanelStaff from './components/AdminPanel/AdminPanelStaff';

function App() {
  const [userType, setUserType] = useState(localStorage.getItem("usertype"));
  /*function userPages() {
    setUserType(localStorage.getItem("usertype"));
    if (userType === "staff") {
      return (
        <>
          <Navbar />
          <Route exact path="/home" component={Home} />
          <Route path="/my-reservations" component={MyReservations} />
          <Route path="/my-profile" component={User} />
          <Route path="/total-reservations" component={MyReservations} />
          <Route path="/enrolled-tournaments" component={Tournaments} />
          <Route path="/available-tournaments" component={EnrollTournaments} />
          <Route path="/enrolled-courses" component={SportsCourses} />
          <Route path="/available-courses" component={EnrollSportsCourses} />
        </>
      )
    }
    else if (userType === "member") {
      <>
        <Navbar />
        <Route exact path="/home" component={Home} />
        <Route path="/make-reservation" component={MakeReservation} />
        <Route path="/my-reservations" component={MyReservations} />
        <Route path="/my-tournaments" component={Tournaments} />
        <Route path="/tournament-requests" component={TournamentRequests} />
        <Route path="/enroll-tournament" component={EnrollTournaments} />
        <Route path="/my-profile" component={User} />
        <Route path="/contact" component={Contact} />
        <Route path="/available-tournaments" component={EnrollTournaments} />
        <Route path="/enroll-course" component={EnrollSportsCourses} />
        <Route path="/my-courses" component={SportsCourses} />
        <Route path="/available-courses" component={EnrollSportsCourses} />
      </>
    }
  }*/
  return (
    <div className="bg_image">
      <BrowserRouter>
        <>
          <Switch>
            <Route exact path="/" component={Login} />
            <>
              <Navbar />
              <Route exact path="/home" component={Home} />
              <Route path="/make-reservation" component={MakeReservation} />
              <Route path="/my-reservations" component={MyReservations} />
              <Route path="/my-tournaments" component={Tournaments} />
              {/*<Route path="/tournament-requests" component={TournamentRequests} />*/}
              <Route path="/enroll-tournament" component={EnrollTournaments} />
              <Route path="/my-profile" component={User} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin-panel" component={AdminPanel} />
              <Route path="/admin-panel-staff" component={AdminPanelStaff} />
              <Route path="/total-reservations" component={MyReservations} />
              <Route path="/enrolled-tournaments" component={Tournaments} />
              <Route path="/available-tournaments" component={EnrollTournaments} />
              <Route path="/enroll-course" component={EnrollSportsCourses} />
              <Route path="/enrolled-courses" component={SportsCourses} />
              <Route path="/my-courses" component={SportsCourses} />
              <Route path="/available-courses" component={EnrollSportsCourses} />
              <Route path="/all-members" component={GymStaffPanel} />

            </>
          </Switch>
        </>
      </BrowserRouter>
    </div>
  )
}


export default App;


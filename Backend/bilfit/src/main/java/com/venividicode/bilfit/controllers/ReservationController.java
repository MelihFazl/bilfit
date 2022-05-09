package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.ReservationRepository;
import com.venividicode.bilfit.services.ReservationService;
import com.venividicode.bilfit.services.UserAccountManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    @Autowired
    UserAccountManagementService userAccountManagementService;

    @Autowired
    ReservationRepository reservationRepository;

    @PostMapping("/make")
    public String makeReservation(@RequestBody Reservation reservation, @RequestParam long fieldID,
                                  @RequestParam long activityID, @RequestParam long sportCenterID, @RequestParam long reserverID) {

        reservation.setStatus(ReservationStatus.Not_Attended);
        return reservationService.saveReservation(reservation, fieldID, activityID, sportCenterID, reserverID);
    }

    @GetMapping
    public List<Reservation> getAll() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/getByUserID/{id}")
    public List<Reservation> getReservationsByUserID(@PathVariable("id") long userID) {
        List<GymMember> gymMembers = userAccountManagementService.getGymMemberByID(userID);
        if (gymMembers == null)
            return null;
        List<Reservation> reservations = reservationService.getByReserver(userID);
        return reservationService.getByReserver(userID);
    }

    @GetMapping("/sportCenter")
    public List<SportCenter> getAllSportCenter() {
        return reservationService.getAllSportCenters();
    }

    @PostMapping("cancel/{id}")
    public String cancelByID(@PathVariable("id") long reservationID) {
        Reservation reservation = reservationService.getReservationById(reservationID);
        if (reservation == null)
            return "There is no reservation with ID " + reservationID;
        try {
            return reservationService.cancel(reservation);
        }
        catch(Exception e)
        {
            return "Something went wrong 🤪";
        }
    }
    @PostMapping("attend/{id}")
    public String attendByID(@PathVariable("id") long reservationID)
    {
        Reservation reservation = reservationService.getReservationById(reservationID);
        if (reservation == null)
            return "There is no reservation with ID " + reservationID;
        try{
            reservation.setStatus(ReservationStatus.Attended);
            reservationRepository.save(reservation);
            return "Reservation on " + reservation.getReservationDate() + " between " + reservation.getReservedTimeInterval()
                    + " was successfully set as attended.";
        }
        catch (Exception e)
        {
            return "Something went wrong 😤 ";
        }

    }
}

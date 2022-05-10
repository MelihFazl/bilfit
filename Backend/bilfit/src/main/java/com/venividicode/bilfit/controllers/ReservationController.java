package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.ReservationRepository;
import com.venividicode.bilfit.services.ReservationService;
import com.venividicode.bilfit.services.UserAccountManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * A controller class for handling requests related
 * to Reservation model
 * @author Veni Vidi Code
 */
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

    /**
     * Post method used to save a Reservation to the database
     * @param reservation object that is to be saved
     * @param fieldID id of the Field of the reservation
     * @param activityID id of the Sport Activity of the reservation
     * @param sportCenterID id of the Sport Center of the reservation
     * @param reserverID id of the Gym Member who made the reservation
     * @return String indicating success or failure
     */
    @PostMapping("/make")
    public String makeReservation(@RequestBody Reservation reservation, @RequestParam long fieldID,
                                  @RequestParam long activityID, @RequestParam long sportCenterID, @RequestParam long reserverID) {

        reservation.setStatus(ReservationStatus.Not_Attended);
        return reservationService.saveReservation(reservation, fieldID, activityID, sportCenterID, reserverID);
    }

    /**
     * Get method returns all the reservations
     * @return List<Reservation> list of all the reservations
     */
    @GetMapping
    public List<Reservation> getAll() {
        return reservationService.getAllReservations();
    }

    /**
     * Get method used to return Reservations whose reserver is specified by id
     * @param userID id of the Gym Member who made the Reservation
     * @return List<Reservation> list of all the reservations done by the specified gym member
     */
    @GetMapping("/getByUserID/{id}")
    public List<Reservation> getReservationsByUserID(@PathVariable("id") long userID) {
        List<GymMember> gymMembers = userAccountManagementService.getGymMemberByID(userID);
        if (gymMembers == null)
            return null;
        List<Reservation> reservations = reservationService.getByReserver(userID);
        return reservationService.getByReserver(userID);
    }

    /**
     * Get method used to return all the Sport Center objects
     * @return List<SportCenter> list all the Sport Center objects
     */
    @GetMapping("/sportCenter")
    public List<SportCenter> getAllSportCenter() {
        return reservationService.getAllSportCenters();
    }



    /**
     * Post method used to cancel a Reservation
     * @param reservationID id of the Reservation that is to be cancelled
     * @return String indicating success or fail
     */
    @PostMapping("/cancel/{id}")
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

    @PostMapping("/attend/{id}")
    /**
     * Post method used to mark the specified Reservation as attended
     * @param reservationID id of the Reservation
     * @return String indicating success or failure
     */
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
    @PostMapping("/dateTimeSet")
    public String dateTimeSet(@RequestParam long sportCenterID, @RequestParam long sportActivityID,
                               @RequestParam long fieldID, @RequestParam String begin, @RequestParam String end, @RequestParam List<String> strings)
    {
        LocalDate begin2 = LocalDate.parse(begin);
        LocalDate end2 = LocalDate.parse(end);
        return reservationService.dateTimeSet(sportCenterID, sportActivityID, fieldID, begin2, end2, strings);
    }
}

package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.Reservation;
import com.venividicode.bilfit.models.ReservationStatus;
import com.venividicode.bilfit.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin
public class ReservationController
{
    @Autowired
    ReservationService reservationService;

    @PostMapping("/make")
    public  String makeReservation(@RequestBody Reservation reservation, @RequestParam long fieldID,
                                   @RequestParam long activityID,@RequestParam long sportCenterID, @RequestParam long reserverID)
    {

        reservation.setStatus(ReservationStatus.Upcoming);
        return reservationService.saveReservation(reservation, fieldID, activityID, sportCenterID, reserverID);
    }

    @GetMapping
    public List<Reservation> getAll()
    {
        return reservationService.getAllReservations();
    }
}

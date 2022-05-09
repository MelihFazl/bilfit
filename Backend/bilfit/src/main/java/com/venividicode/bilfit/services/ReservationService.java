package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.Reservation;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.models.SportCenter;

import java.util.List;

public interface ReservationService {
    public List<Reservation> getAllReservations();
    public String saveReservation(Reservation reservation,  long fieldID, long activityID, long sportCenterID, long reserverID);
    public Reservation getReservationById(long reservationId);
    public Reservation patchReservation(Reservation reservation);
    public List<Reservation> getByReservationField(Field reservationField);
    public List<Reservation> getByReservationPlace(SportCenter reservationPlace);
    public List<Reservation> getByReservationActivity(SportActivity reservationActivity);
    public List<Reservation> getByReserver(long reserverID);
    public List<SportCenter> getAllSportCenters();
    public String cancel(Reservation reservation);
}

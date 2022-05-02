package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.Reservation;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.models.SportCenter;
import com.venividicode.bilfit.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImplementation implements ReservationService{
    @Autowired
    ReservationRepository reservationRepository;
    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation getReservationById(long reservationId) {
        if(reservationRepository.findById(reservationId) == null)
            return null;
        return reservationRepository.findById(reservationId).get(0);
    }

    @Override
    public Reservation patchReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getByReservationField(Field reservationField) {
        return reservationRepository.findByReservationField(reservationField);
    }

    @Override
    public List<Reservation> getByReservationPlace(SportCenter reservationPlace) {
        return reservationRepository.findByReservationPlace(reservationPlace);
    }

    @Override
    public List<Reservation> getByReservationActivity(SportActivity reservationActivity) {
        return reservationRepository.findByReservationActivity(reservationActivity);
    }
}

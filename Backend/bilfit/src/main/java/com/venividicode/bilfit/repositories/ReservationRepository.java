package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.Reservation;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.models.SportCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ReservationRepository to access the database and do
 * operations related to Repository object
 * @author Veni Vidi Code
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    public List<Reservation> findById(long Id);
    public Reservation deleteById(long Id);
    public List<Reservation> findByReservationField(Field reservationField);
    public List<Reservation> findByReservationPlace(SportCenter reservationPlace);
    public List<Reservation> findByReservationActivity(SportActivity reservationActivity);
    //time issue?
}

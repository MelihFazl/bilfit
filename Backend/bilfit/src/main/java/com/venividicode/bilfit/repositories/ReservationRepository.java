package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    //TODO
}

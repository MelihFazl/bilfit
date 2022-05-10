package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * TimeSlotRepository to access the database and do
 * operations related to TimeSlot object
 * @author Veni Vidi Code
 */
@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long>
{
    public List<TimeSlot> findByTimeSlot(String timeSlot);
}

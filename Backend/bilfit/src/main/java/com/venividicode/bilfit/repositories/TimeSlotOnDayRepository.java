package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.TimeSlotOnDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * TimeSlotOnDayRepository to access the database and do
 * operations related to TimeSlotOnDay object
 * @author Veni Vidi Code
 */
@Repository
public interface TimeSlotOnDayRepository extends JpaRepository<TimeSlotOnDay, Long> {
}

package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.TimeSlotOnDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeSlotOnDayRepository extends JpaRepository<TimeSlotOnDay, Long> {
}

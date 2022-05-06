package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long>
{

}

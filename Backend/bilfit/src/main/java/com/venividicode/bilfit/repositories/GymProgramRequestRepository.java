package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymProgramRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymProgramRequestRepository extends JpaRepository<GymProgramRequest, Long> {
}

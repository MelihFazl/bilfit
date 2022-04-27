package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymProgramRepository extends JpaRepository<GymProgram, Long> {
    //TODO
}

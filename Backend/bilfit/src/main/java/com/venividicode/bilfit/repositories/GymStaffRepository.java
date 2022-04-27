package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymStaffRepository extends JpaRepository<GymStaff, Long> {
    //TODO
}

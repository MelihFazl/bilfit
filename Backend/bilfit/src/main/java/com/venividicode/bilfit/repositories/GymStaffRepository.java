package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.model.GymStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymStaffRepository extends JpaRepository<GymStaff, Long> {
    //TODO
}

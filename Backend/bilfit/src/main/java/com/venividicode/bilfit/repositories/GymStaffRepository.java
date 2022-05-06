package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.SportCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * GymStaffRepository to access the database and do
 * operations related to GymStaff object
 * @author Veni Vidi Code
 */
@Repository
public interface GymStaffRepository extends JpaRepository<GymStaff, Long>
{
    public List<GymStaff> findById(long gymStaffID);
    public GymStaff deleteById(long gymStaffID);
    public List<GymStaff> findByName(String name);
}

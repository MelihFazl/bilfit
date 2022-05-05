package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymProgram;
import com.venividicode.bilfit.models.GymStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymProgramRepository extends JpaRepository<GymProgram, Long> {

    public List<GymProgram> findAll();
    public List<GymProgram> findById(long id);
    public GymProgram deleteById(long id);
    public List<GymProgram> findByAuthor(GymStaff staff);
    //public GymProgram patchByID(long id, GymProgram editedGymProgram);

    // again, findByMember is removed



}

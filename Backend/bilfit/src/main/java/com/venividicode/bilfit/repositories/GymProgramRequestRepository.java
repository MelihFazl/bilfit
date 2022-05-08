package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymProgramRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * GymProgramRequestRepository to access the database and do
 * operations related to GymProgramRequest object
 * @author Veni Vidi Code
 */
@Repository
public interface GymProgramRequestRepository extends JpaRepository<GymProgramRequest, Long> {

    public List<GymProgramRequest> findAll();
    public List<GymProgramRequest> findById(long id);
    public GymProgramRequest deleteById(long id);
    // does this need to be removed as well? cuz we don't have member in gymProgram anymore
    public List<GymProgramRequest> findByOwner(GymMember member);
    //public GymProgramRequest patchById(long id, GymProgramRequest editedGymProgramRequest);

    /** GymProgramStatus not implemented yet
    public List<GymProgramRequest> findByStatus(GymProgramRequesStatus status);
     */


}

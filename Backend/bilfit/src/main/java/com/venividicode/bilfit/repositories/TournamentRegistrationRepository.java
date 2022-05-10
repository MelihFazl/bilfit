package com.venividicode.bilfit.repositories;


import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.models.TournamentRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * TournamentRegistrationRepository to access the database and do
 * operations related to TournamentRegistration object
 * @author Veni Vidi Code
 */
@Repository
public interface TournamentRegistrationRepository extends JpaRepository<TournamentRegistration, Long>
{
    public List<TournamentRegistration> findById(long id);

    public TournamentRegistration deleteById(long id);

    public List<TournamentRegistration> findByTeamMembers(GymMember teamMembers);

}

package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * TournamentRepository to access the database and do
 * operations related to Tournament object
 * @author Veni Vidi Code
 */
@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long>
{
    public List<Tournament> findById(long id);

    public Tournament deleteById(long id);

    public List<Tournament> findByName(String name);

    //is findByDeadline necessary?
}

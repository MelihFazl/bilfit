package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {
    //TODO
}

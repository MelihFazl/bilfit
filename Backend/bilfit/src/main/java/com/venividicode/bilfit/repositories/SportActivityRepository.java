package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.SportActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SportActivityRepository extends JpaRepository<SportActivity, Long> {
    //TODO
}

package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.SportActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SportActivityRepository extends JpaRepository<SportActivity, Long> {

    public List<SportActivity> findById(long id);
    public SportActivity deleteById(long id);

}

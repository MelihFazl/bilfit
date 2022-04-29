package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.SportCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SportCenterRepository extends JpaRepository<SportCenter, Long> {


    public List<SportCenter> findByName(String name);
    public SportCenter deleteByName(String name);


}

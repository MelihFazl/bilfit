package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.models.SportCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * SportCenterRepository to access the database and do
 * operations related to SportCenter object
 * @author Veni Vidi Code
 */
@Repository
public interface SportCenterRepository extends JpaRepository<SportCenter, Long> {
    public List<SportCenter> findById(long id);
    public List<SportCenter> findByName(String name);
    public SportCenter deleteByName(String name);
    public List<SportCenter> findByAvailableActivities(SportActivity availableActivities); //Try this. List wont work. Instead a single object.. (List<SportActivity> availableActivities)
    public List<SportCenter> findByStaff(GymStaff staff); //Try this. List wont work. Instead a single object. (List<GymStaff> staff)
    public List<SportCenter> findByOpensAt(LocalDateTime opensAt);
    public List<SportCenter> findByClosesAt(LocalDateTime opensAt);
    public List<SportCenter> findByLatestReservationStepValue(Integer latestReservationStepValue);
    public List<SportCenter> findByBalance(Double balance);

}

package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.SportCenter;
import com.venividicode.bilfit.models.SportCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * SportCourseRepository to access the database and do
 * operations related to SportCourse object
 * @author Veni Vidi Code
 */
@Repository
public interface SportCourseRepository extends JpaRepository<SportCourse, Long> {
    public List<SportCourse> findById(long id);
    public SportCourse deleteById(long id);
    public List<SportCourse> findByType(String type);
    public List<SportCourse> findByLocation(SportCenter location);
    public List<SportCourse> findByParticipants(GymMember participants);
}

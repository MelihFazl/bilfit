package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.SportCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SportCourseRepository extends JpaRepository<SportCourse, Long> {
    //TODO
}

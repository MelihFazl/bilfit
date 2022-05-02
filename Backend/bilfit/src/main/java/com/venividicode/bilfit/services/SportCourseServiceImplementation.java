package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.SportCenter;
import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.repositories.SportCenterRepository;
import com.venividicode.bilfit.repositories.SportCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportCourseServiceImplementation implements SportCourseService
{
    @Autowired
    SportCourseRepository sportCourseRepository;
    @Autowired
    SportCenterRepository sportCenterRepository;

    @Override
    public List<SportCourse> getAllSportCourses()
    {
        return sportCourseRepository.findAll();
    }

    @Override
    public List<SportCourse> getSportCourseByID(long id)
    {
        return sportCourseRepository.findById(id);
    }

    @Override
    public List<SportCourse> getSportCoursesByType(String type)
    {
        return sportCourseRepository.findByType(type);
    }

    @Override
    public List<SportCourse> getSportCourseByLocation(long sportCenterID)
    {
        SportCenter sportCenter = sportCenterRepository.getById(sportCenterID); //will be converted to find
        if (sportCenter == null)
            return null;
        return sportCourseRepository.findByLocation(sportCenter);
    }

    @Override
    public SportCourse saveSportCourse(SportCourse course, long sportCenterID)
    {
        SportCenter sportCenter = sportCenterRepository.getById(sportCenterID); //will be converted to find
        if (sportCenter == null)
            System.out.println("There is a problem with the SportCenter ID that is sent.");
        course.setLocation(sportCenter);
        return sportCourseRepository.save(course);
    }

    @Override
    public SportCourse deleteSportCourseByID(long id)
    {
        return sportCourseRepository.deleteById(id);
    }
}

package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.models.SportCenter;
import com.venividicode.bilfit.models.SportCourse;

import java.util.List;

public interface SportCourseService
{
    public List<SportCourse> getAllSportCourses();
    public List<SportCourse> getSportCourseByID(long id);
    public List<SportCourse> getSportCoursesByType(String type);
    public List<SportCourse> getSportCourseByLocation(long sportCenterID);
    public SportCourse saveSportCourse(SportCourse course, long sportCenterID);
    public SportCourse deleteSportCourseByID(long id);
}

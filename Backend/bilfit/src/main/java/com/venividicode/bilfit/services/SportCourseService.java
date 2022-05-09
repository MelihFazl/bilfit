package com.venividicode.bilfit.services;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.SportCourse;

import java.util.List;

public interface SportCourseService
{
    public List<SportCourse> getAllSportCourses();
    public List<SportCourse> getSportCourseByID(long id);
    public List<SportCourse> getSportCoursesByType(String type);
    public List<SportCourse> getSportCourseByLocation(long sportCenterID);
    public List<SportCourse> getSportCoursesByParticipants(long id);
    public String saveSportCourse(SportCourse course, long sportCenterID, List<String> courseDays);
    public SportCourse deleteSportCourseByID(long id);
    public SportCourse patchCourse(SportCourse editedSportCourse, long oldSportCourseID);
    public String addParticipant(long courseID, long participantID);
    public String removeParticipant(long courseID, long participantID);

}

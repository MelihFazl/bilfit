package com.venividicode.bilfit.services;
import com.venividicode.bilfit.models.SportCourse;

import java.util.List;

public interface SportCourseService
{
    public List<SportCourse> getAllSportCourses();
    public List<SportCourse> getSportCourseByID(long id);
    public List<SportCourse> getSportCoursesByType(String type);
    public List<SportCourse> getSportCourseByLocation(long sportCenterID);
    public SportCourse saveSportCourse(SportCourse course, long sportCenterID, List<Long> participantsID, List<Long> instructorsID);
    public SportCourse deleteSportCourseByID(long id);
    public SportCourse patchCourse(SportCourse editedSportCourse, long oldSportCourseID);
    public SportCourse addParticipant(long courseID, long participantID);
    public SportCourse removeParticipant(long courseID, long participantID);
    public SportCourse addInstructor(long courseID, long instructorID);
    public SportCourse removeInstructor(long courseID, long instructorID);
}

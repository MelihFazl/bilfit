package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.services.SportCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class SportCourseController
{
    @Autowired
    SportCourseService sportCourseService;

    @PostMapping("/add")
    public String saveSportCourse(@RequestBody SportCourse sportCourse, @RequestParam long sportCenterID,
                                  @RequestParam(value="participants") List<Long> participantID, @RequestParam(value="instructors") List<Long> instructorID)
    {
        try
        {
            sportCourseService.saveSportCourse(sportCourse, sportCenterID, participantID, instructorID);
            return "SportCourse with type " + sportCourse.getType() + " has been added.";
        } catch (Exception e)
        {
            return "Something has gone wrong: " + e.toString() ;
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSportCourse(@PathVariable("id") long id)
    {
        List<SportCourse> sportCoursesWithSpecifiedID = sportCourseService.getSportCourseByID(id);
        if (sportCoursesWithSpecifiedID == null) {
            return "SportCourse with specified ID " + id + " was not found.";
        }
        sportCourseService.deleteSportCourseByID(id);
        return "SportCourse with specified ID " + id + " has been successfully deleted.";
    }

    @GetMapping
    public List<SportCourse> getAllCourses()
    {
        return sportCourseService.getAllSportCourses();
    }

    @GetMapping("/{id}")
    public List<SportCourse> getCourseByID(@PathVariable("id") long id)
    {
        return sportCourseService.getSportCourseByID(id);
    }

    @GetMapping("/type/{type}")
    public List<SportCourse> getCourseByID(@PathVariable("type") String type)
    {
        return sportCourseService.getSportCoursesByType(type);
    }

    @GetMapping("/sportcenter/{id}")
    public List<SportCourse> getCourseByLocation(@PathVariable("id") long id)
    {
        return sportCourseService.getSportCourseByLocation(id);
    }

    @PostMapping("/edit/{id}")
    public String editCourseWithID(@RequestBody SportCourse editedCourse, @PathVariable("id") long courseID)
    {
        List<SportCourse> sportCourses = sportCourseService.getSportCourseByID(courseID);
        if(sportCourses ==  null)
            return "There is no SportCourse with ID " + courseID;
        SportCourse oldCourse = sportCourses.get(0);
        System.out.println(oldCourse.getID());
        try{
            sportCourseService.patchCourse(editedCourse, oldCourse.getID());
            return  "Gym Member with ID " + courseID + " was successfully edited.";
        }
        catch (Exception e)
        {
            System.out.println(e.toString());
            return "An error occurred.";
        }
    }

    @PostMapping("/enroll/{courseID}/participant/{id}")
    public String enrollParticipantToACourseWithID(@PathVariable("courseID") long courseID, @PathVariable("id") long gymMemberID)
    {
        List<SportCourse> sportCourses = sportCourseService.getSportCourseByID(courseID);
        if (sportCourses == null)
            return "Wrong CourseID!";
        SportCourse course = sportCourses.get(0);
        if(course.getLastRegistrationDate().isBefore(LocalDate.now()))
            return  "Last registration date has passed.";

        if(sportCourseService.addParticipant(courseID, gymMemberID)== null)
            return "There is something wrong with the parameters.";
        return "Participant with ID " + gymMemberID + " is added.";
    }

    @PostMapping("/remove/{courseID}/participant/{id}")
    public String removeParticipantFromACourseWithID(@PathVariable("courseID") long courseID, @PathVariable("id") long gymMemberID)
    {
        List<SportCourse> sportCourses = sportCourseService.getSportCourseByID(courseID);
        if (sportCourses == null)
            return "Wrong CourseID!";
        SportCourse course = sportCourses.get(0);

        if(sportCourseService.removeParticipant(courseID, gymMemberID) == null)
            return "There is something wrong with the parameters.";
        return "Participant with ID " + gymMemberID + " is removed.";
    }

    @PostMapping("/enroll/{courseID}/instructor/{id}")
    public String enrollInstructorToACourseWithID(@PathVariable("courseID") long courseID, @PathVariable("id") long instructorID)
    {
        List<SportCourse> sportCourses = sportCourseService.getSportCourseByID(courseID);
        if (sportCourses == null)
            return "Wrong CourseID!";
        SportCourse course = sportCourses.get(0);
        if(course.getLastRegistrationDate().isBefore(LocalDate.now()))
            return  "Last registration date has passed.";

        if(sportCourseService.addInstructor(courseID, instructorID) == null)
            return "There is something wrong with the parameters.";
        return "Instructor with ID " + instructorID + " is added.";
    }

    @PostMapping("/remove/{courseID}/instructor/{id}")
    public String removeInstructorFromACourseWithID(@PathVariable("courseID") long courseID, @PathVariable("id") long instructorID)
    {
        List<SportCourse> sportCourses = sportCourseService.getSportCourseByID(courseID);
        if (sportCourses == null)
            return "Wrong CourseID!";
        SportCourse course = sportCourses.get(0);

        if (sportCourseService.removeInstructor(courseID, instructorID) == null)
            return "There is something wrong with the parameters.";
        return "Instructor with ID " + instructorID + " is removed.";
    }
}

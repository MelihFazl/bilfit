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
                                  @RequestParam(value="courseDays") List<String> courseDays)
    {
        try
        {
            return sportCourseService.saveSportCourse(sportCourse, sportCenterID, courseDays);
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
        return "SportCourse with name " + sportCoursesWithSpecifiedID.get(0).getType() + " has been successfully deleted.";
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

    @GetMapping("/participant/{id}")
    public List<SportCourse> getCourseByParticipant(@PathVariable("id") long id)
    {
        return sportCourseService.getSportCoursesByParticipants(id);
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
            return  "Course with ID " + courseID + " was successfully edited.";
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
        return sportCourseService.addParticipant(courseID, gymMemberID);
    }

    @PostMapping("/remove/{courseID}/participant/{id}")
    public String removeParticipantFromACourseWithID(@PathVariable("courseID") long courseID, @PathVariable("id") long gymMemberID)
    {
        List<SportCourse> sportCourses = sportCourseService.getSportCourseByID(courseID);
        if (sportCourses == null)
            return "Wrong CourseID!";
        SportCourse course = sportCourses.get(0);
        return sportCourseService.removeParticipant(courseID, gymMemberID) ;
    }
}

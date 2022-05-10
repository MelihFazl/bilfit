package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.services.SportCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * A controller class for handling requests related
 * to SportCourse model
 * @author Veni Vidi Code
 */
@RestController
@RequestMapping("/course")
@CrossOrigin
public class SportCourseController
{
    @Autowired
    SportCourseService sportCourseService;

    /**
     * Post method used to add a Sport Course to the database
     * @param sportCourse object that is to be added
     * @param sportCenterID id of the SportCenter that this Sport Course will take place in
     * @param courseDays days that this course will be carried out
     * @return String indicating success or failure
     */
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

    /**
     * Delete method used to delete a Sport Course from the database
     * @param id id of the Sport Course that is to be deleted
     * @return String indicating success or failure
     */
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

    /**
     * Get method returning all the Sport Courses
     * @return list of all the Sport courses
     */
    @GetMapping
    public List<SportCourse> getAllCourses()
    {
        return sportCourseService.getAllSportCourses();
    }

    /**
     * Get method returning the Sport Course with specified id
     * @param id id of the Sport Course
     * @return list of the specified Sport Courses
     */
    @GetMapping("/{id}")
    public List<SportCourse> getCourseByID(@PathVariable("id") long id)
    {
        return sportCourseService.getSportCourseByID(id);
    }

    /**
     * Get method returning the Sport Course with specified id
     * @param type type of the Sport Course (Ex: Tennis)
     * @return String indicating success or failure
     */
    @GetMapping("/type/{type}")
    public List<SportCourse> getCourseByID(@PathVariable("type") String type)
    {
        return sportCourseService.getSportCoursesByType(type);
    }

    /**
     * Get method returning the Sport Course with specified id
     * @param id id of the Sport Center
     * @return list of all the Sport Courses carried out in the specified Sport Center
     */
    @GetMapping("/sportcenter/{id}")
    public List<SportCourse> getCourseByLocation(@PathVariable("id") long id)
    {
        return sportCourseService.getSportCourseByLocation(id);
    }

    /**
     * Get method used to get a Sport Course by a participant id
     * @param id id of the Gym Member
     * @return list of all the Sport Courses that are enrolled by the specified Gym Member
     */
    @GetMapping("/participant/{id}")
    public List<SportCourse> getCourseByParticipant(@PathVariable("id") long id)
    {
        return sportCourseService.getSportCoursesByParticipants(id);
    }

    /**
     * Post method used to edit attributes of a Sport Course object
     * @param editedCourse edited Sport Course
     * @param courseID id of the Sport Course
     * @return String indicating success or failure
     */
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

    /**
     * Post method used to enroll a Gym Member to a Sport Course
     * @param courseID id of the Sport Course
     * @param gymMemberID id of the Gym Member
     * @return String indicating success or failure
     */
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

    /**
     * Post method used to remove a Gym Member from a Sport Course
     * @param courseID id of the Sport Course
     * @param gymMemberID id of the Gym Member
     * @return String indicating success or failure
     */
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

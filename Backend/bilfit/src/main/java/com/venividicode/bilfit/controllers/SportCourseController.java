package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.services.SportCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class SportCourseController
{
    @Autowired
    SportCourseService sportCourseService;

    @PostMapping("/add")
    public String saveSportCourse(@RequestBody SportCourse sportCourse, @RequestParam long sportCenterID)
    {
        try
        {
            sportCourseService.saveSportCourse(sportCourse, sportCenterID);
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
}

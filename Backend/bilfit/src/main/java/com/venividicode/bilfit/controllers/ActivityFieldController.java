package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.services.ActivityFieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sports")
@CrossOrigin
public class ActivityFieldController
{
    @Autowired
    ActivityFieldService activityFieldService;

    //-------------SportActivity Requests------------

    @PostMapping("/activity/add")
    public String saveSportActivity(@RequestBody SportActivity sportActivity)
    {
        try
        {
            activityFieldService.saveSportActivity(sportActivity);
            return "SportActivity with activity name  " + sportActivity.getActivity() + " has been added.";
        } catch (Exception e)
        {
            return "Something has gone wrong: " + e.toString() ;
        }
    }

    @DeleteMapping("activity/delete/{id}")
    public String deleteSportActivity(@PathVariable("id") long id)
    {
        List<SportActivity> sportActivitiesWithSpecifiedID = activityFieldService.getSportActivityByID(id);
        if (sportActivitiesWithSpecifiedID == null) {
            return "Field with specified ID " + id + " was not found.";
        }
        activityFieldService.deleteSportActivityByID(id);
        return "Notification with specified ID " + id + " has been successfully deleted.";
    }

    @GetMapping("/activity")
    public List<SportActivity> getAllSportActivities() {
        return activityFieldService.getAllSportActivities();
    }

    @GetMapping("activity/{id}")
    public List<SportActivity> getSportActivityWithID(@PathVariable("id") long id)
    {
        return activityFieldService.getSportActivityByID(id);
    }

    //----------------Field Requests-----------------

    @PostMapping("/field/add")
    public String saveField(@RequestBody Field field)
    {
        try
        {
            activityFieldService.saveField(field);
            return "Field with ID  " + field.getID() + " has been added.";
        } catch (Exception e)
        {
            return "Something has gone wrong: " + e.toString() ;
        }
    }

    @DeleteMapping("/field/delete/{id}")
    public String deleteField(@PathVariable("id") long id)
    {
        List<Field> fieldsWithSpecifiedID = activityFieldService.getFieldByID(id);
        if (fieldsWithSpecifiedID == null) {
            return "Field with specified ID " + id + " was not found.";
        }
        activityFieldService.deleteFieldByID(id);
        return "Notification with specified ID " + id + " has been successfully deleted.";
    }

    @GetMapping("/field")
    public List<Field> getAllFields() {
        return activityFieldService.getAllFields();
    }

    @GetMapping("field/{id}")
    public List<Field> getFieldWithID(@PathVariable("id") long id)
    {
        return activityFieldService.getFieldByID(id);
    }
}

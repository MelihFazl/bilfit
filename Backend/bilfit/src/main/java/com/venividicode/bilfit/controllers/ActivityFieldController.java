package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.SportActivity;
import com.venividicode.bilfit.services.ActivityFieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * A controller class for handling requests related
 * to SportsActivity and Field models
 * @author Veni Vidi Code
 */

@RestController
@RequestMapping("/sports")
@CrossOrigin
public class ActivityFieldController
{
    @Autowired
    ActivityFieldService activityFieldService;

    //-------------SportActivity Requests------------

    /**
     * method for saving a sport activity into the database
     * @param sportActivity the sport activity that is to be send inside Post request
     * @return String indicates success or fail
     */
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

    /**
     * method for deleting a sport activity from database by its id
     * @param id id of the SportActivity that is to be deleted from the database with Delete request
     * @return String indicates success or fail
     */
    @DeleteMapping("/activity/delete/{id}")
    public String deleteSportActivity(@PathVariable("id") long id)
    {
        List<SportActivity> sportActivitiesWithSpecifiedID = activityFieldService.getSportActivityByID(id);
        if (sportActivitiesWithSpecifiedID == null) {
            return "SportActivity with specified ID " + id + " was not found.";
        }
        activityFieldService.deleteSportActivityByID(id);
        return "SportActivity with specified ID " + id + " has been successfully deleted.";
    }

    /**
     * method returning all the sport activities in the database with a Get request
     * @return List<SportActivity> list of all the sport activities
     */
    @GetMapping("/activity")
    public List<SportActivity> getAllSportActivities() {
        return activityFieldService.getAllSportActivities();
    }

    /**
     * method returns a specified SportActivity by its id with a Get request
     * @param id id of the Sport Activity that is to be returned from the database
     * @return
     */
    @GetMapping("/activity/{id}")
    public List<SportActivity> getSportActivityWithID(@PathVariable("id") long id)
    {
        return activityFieldService.getSportActivityByID(id);
    }

    //----------------Field Requests-----------------

    /**
     * method for adding a new Field to the database by Post request
     * @param field the field entity that is to saved into the database
     * @return String indicates success or fail
     */
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

    /**
     * method for deleting a Field from the database by a Delete request
     * @param id id of the Field object that is to be deleted from database
     * @return String indicates success or failure
     */
    @DeleteMapping("/field/delete/{id}")
    public String deleteField(@PathVariable("id") long id)
    {
        List<Field> fieldsWithSpecifiedID = activityFieldService.getFieldByID(id);
        if (fieldsWithSpecifiedID == null) {
            return "Field with specified ID " + id + " was not found.";
        }
        activityFieldService.deleteFieldByID(id);
        return "Field with specified ID " + id + " has been successfully deleted.";
    }

    /**
     * method returns all the Fields from the database by a Get request
     * @return List<Field> list of all the fields in the database
     */
    @GetMapping("/field")
    public List<Field> getAllFields() {
        return activityFieldService.getAllFields();
    }

    /**
     * method returns the specified Field by its id with a Get request
     * @param id id of the Field that is to be returned from the database
     * @return List<Field> list of fields with the given id (length = 1)
     */
    @GetMapping("/field/{id}")
    public List<Field> getFieldWithID(@PathVariable("id") long id)
    {
        return activityFieldService.getFieldByID(id);
    }
}

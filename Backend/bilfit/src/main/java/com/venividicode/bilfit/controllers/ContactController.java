package com.venividicode.bilfit.controllers;


import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * A controller class for handling requests related
 * to Contact model
 * @author Veni Vidi Code
 */

@RestController
@RequestMapping("/contact")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactService contactService;

    /**
     * Get method used to get all the Gym Staff objects from the database
     * @return List<GymStaff> list of all the gym staff
     */
    @GetMapping("/all")
    public List<GymStaff> getAllGymStaff() {
        return contactService.getAllGymStaff();
    }

    /**
     * Get method used to get a Gym Staff with specified id
     * @param id id of the Gym Staff
     * @return GymStaff object that is returned from the database
     */
    @GetMapping("/{id}")
    public GymStaff getGymStaffWithID(@PathVariable("id") long id) {

        List<GymStaff> gymStaffsWithSpecifiedID = contactService.getGymStaffByID(id);

        if (gymStaffsWithSpecifiedID == null) {
            return null;
        }
        return gymStaffsWithSpecifiedID.get(0);
    }

    /**
     * Get method used to get Gym Staffs with a specified name parameter
     * @param name name of the Gym Staff
     * @return List<GymStaff> list of all the gym staff with the given name
     */
    @GetMapping("/{name}")
    public List<GymStaff> getGymStaffWithName(@PathVariable("name") String name) {

        List<GymStaff> gymStaffsWithSpecifiedName = contactService.getGymStaffByName(name);

        if (gymStaffsWithSpecifiedName == null) {
            return null;
        }
        return gymStaffsWithSpecifiedName;
    }

    // path variable?
    // getGymStaffWithSportCenter TODO


    /*
    public String displayContactInfo() {
        List<GymStaff> allGymStaff = getAllGymStaff();
        // TODO
    }*/





}

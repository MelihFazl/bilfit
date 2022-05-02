package com.venividicode.bilfit.controllers;


import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/all")
    public List<GymStaff> getAllGymStaff() {
        return contactService.getAllGymStaff();
    }

    @GetMapping("/{id}")
    public GymStaff getGymStaffWithID(@PathVariable("id") long id) {

        List<GymStaff> gymStaffsWithSpecifiedID = contactService.getGymStaffByID(id);

        if (gymStaffsWithSpecifiedID == null) {
            return null;
        }
        return gymStaffsWithSpecifiedID.get(0);
    }

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

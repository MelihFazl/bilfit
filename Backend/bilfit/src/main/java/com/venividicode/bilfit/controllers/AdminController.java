package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.helpers.PasswordHashHandler;
import com.venividicode.bilfit.models.Admin;
import com.venividicode.bilfit.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminService adminService;
    private PasswordHashHandler passwordHashHandler = new PasswordHashHandler("");

    @PostMapping("/add")
    public String addAdmin(@RequestBody Admin admin)
    {
        List<Admin> checkList = adminService.getAdminByID(admin.getID());
        if(checkList != null)
            return "ID " + admin.getID()  + " is already in use.";
        passwordHashHandler.setPassword(admin.getHashedPassword());
        admin.setHashedPassword(passwordHashHandler.hashPassword());
        adminService.saveAdmin(admin);
        return "Admin with ID " + admin.getID()  + " was successfully added.";
    }

    @PatchMapping("/edit/{id}")
    public String editAdminWithID(@RequestBody Admin editedAdmin, @PathVariable("id") long adminID)
    {
        //Checking admins with the parameter (Comes from path variable)
        List<Admin> adminsWithSpecifiedID = adminService.getAdminByID(adminID);

        //Checking admins with editedAdmin's id (Comes from request body)
        List<Admin> possibleIDConflicts = adminService.getAdminByID(editedAdmin.getID());

        //If not exists
        if(adminsWithSpecifiedID == null)
            return "Admin with specified ID " + adminID + " was not found.";

        //If the id that is going to be changed to is already in use by another admin
        else if( editedAdmin.getID() != adminID && possibleIDConflicts != null)
            return "Admin with specified ID " + editedAdmin.getID() + " is already in use by a different Admin.";

        //If there is no password provided in the path variable
        else if(editedAdmin.getHashedPassword() == null)
        {
            String hashed_pass = adminsWithSpecifiedID.get(0).getHashedPassword();
            adminService.deleteAdminByID(adminID);
            editedAdmin.setHashedPassword(hashed_pass);
            adminService.patchAdmin(editedAdmin);
            return "Admin's id whose id was " + adminID + " changed to " + editedAdmin.getID() + ".";
        }

        //If the edited user will have another id which is not in use
        else if(editedAdmin.getID() != adminID)
        {
            passwordHashHandler.setPassword(editedAdmin.getHashedPassword());   //hash handler setup
            editedAdmin.setHashedPassword(passwordHashHandler.hashPassword());  //hash
            adminService.deleteAdminByID(adminID); //delete old
        }

        adminService.patchAdmin(editedAdmin); // add new
        return "Admin with specified ID " + adminID + " was successfully edited.";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAdminWithID(@PathVariable("id") long adminID)
    {
        List<Admin> adminsWithSpecifiedID = adminService.getAdminByID(adminID);
        if(adminsWithSpecifiedID == null)
            return "Admin with specified ID " + adminID + " was not found.";
        adminService.deleteAdminByID(adminID);
        return "Admin with specified ID " + adminID + " was successfully deleted.";
    }

}
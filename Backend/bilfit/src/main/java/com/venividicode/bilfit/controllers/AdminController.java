package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.helpers.PasswordHashHandler;
import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.*;
import com.venividicode.bilfit.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * A controller class for handling requests related
 * to Admin model
 * @author Veni Vidi Code
 */

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminService adminService;


    @Autowired
    private TokenRepository tokenRepository;
    // used to hash password with SHA256
    private PasswordHashHandler passwordHashHandler = PasswordHashHandler.getInstance();

    /**
     * method to add a Admin to the database by Post request
     * @param admin Admin object that is to be added
     * @return String indicates success or fail
     */
    @PostMapping("/add")
    public String addAdmin(@RequestBody Admin admin)
    {
        // if Admin with id already exists, don't add
        List<Admin> checkList = adminService.getAdminByID(admin.getID());
        if (checkList != null)
            return "ID " + admin.getID()  + " is already in use.";
        // hash passwprd
        passwordHashHandler.setPassword(admin.getHashedPassword());
        admin.setHashedPassword(passwordHashHandler.hashPassword());
        // save admin
        adminService.saveAdmin(admin);
        return "Admin with ID " + admin.getID()  + " was successfully added.";
    }

    /**
     * method to edit an Admin object specified by its id
     * @param editedAdmin
     * @param adminID
     * @return
     */
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

    /**
     * method gets all admins with Get request
     * @return List<Admin> list of all the admins
     */
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    /**
     * method returns Admin by its specified id
     * @param adminID id of the admin to be returned
     * @return Admin returned Admin object
     */
    @GetMapping("/{id}")
    public Admin getAdminWithID(@PathVariable("id") long adminID) {

        List<Admin> adminsWithSpecifiedID = adminService.getAdminByID(adminID);

        if (adminsWithSpecifiedID == null)
            return null;

        return adminsWithSpecifiedID.get(0);
    }

    /**
     * method used to login an Admin to the system with Post request
     * @param password password of the Admin user
     * @param adminID id of the Admin user
     * @return String indicates success or fail
     */
    @PostMapping("/login/{id}")
    public String login(@RequestParam String password, @PathVariable("id") long adminID)
    {
        List<Admin> admins = adminService.getAdminByID(adminID);
        if(admins == null)
            return "No admin was found with ID " + adminID;
        else
        {
            Admin adminLoggingIn = admins.get(0);
            passwordHashHandler.setPassword(password);
            if(adminLoggingIn.getHashedPassword().equals(passwordHashHandler.hashPassword()))
            {
                // token authentication
                Token adminToken = new Token();
                String token = adminToken.generateToken();
                adminToken.setInUse(true);
                adminToken.setLastActive(LocalDateTime.now());
                tokenRepository.save(adminToken);
                adminLoggingIn.setToken(adminToken);
                adminService.patchAdmin(adminLoggingIn);
                System.out.println(adminToken.getID());
                return token;
            }
            else
                return "Login credentials are incorrect";
        }
    }

    /**
     * method used to logout Admin from the system
     * @param adminID id of the Admin user
     * @return String indicating success or fail
     */
    @PostMapping("/logout/{id}")
    public String logOut(@PathVariable("id") long adminID)
    {
        List<Admin> admins = adminService.getAdminByID(adminID);
        if(admins == null)
            return "No admin found with ID " + adminID;
        Admin curAdmin = admins.get(0);
        curAdmin.getToken().setLastActive(LocalDateTime.now());
        curAdmin.getToken().setInUse(false);
        adminService.patchAdmin(curAdmin);
        tokenRepository.save(curAdmin.getToken());
        return "Admin with ID " + adminID + " successfully logged out";
    }
}
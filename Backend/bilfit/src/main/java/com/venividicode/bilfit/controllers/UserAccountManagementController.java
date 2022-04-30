package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.helpers.PasswordHashHandler;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.User;
import com.venividicode.bilfit.services.UserAccountManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserAccountManagementController {
    @Autowired
    private UserAccountManagementService userAccountManagementService;
    private PasswordHashHandler passwordHashHandler = new PasswordHashHandler("");

    //Cannot implement due to users being abstract.
    /*@PostMapping("/add")
    public String addUser(@RequestBody User user)
    {
        userAccountManagementService.saveUser(user);
        return "user has been added";
    }

    @GetMapping("/getUsers")
    public List<User> getAllUsers()
    {
        return userAccountManagementService.getAllUsers();
    }*/

    @PostMapping("/gymMember/add")
    public String saveGymMember(@RequestBody GymMember gymMember)    //test passed
    {
        passwordHashHandler.setPassword(gymMember.getHashedPassword());
        gymMember.setHashedPassword(passwordHashHandler.hashPassword());
        if (userAccountManagementService.saveGymMember(gymMember) != null)
            return "Gym Member with name (" + gymMember.getName() + ") and with id (" + gymMember.getID() +") has been added.";
        else
            return "There is already an existing user with the id" + gymMember.getID();
    }
    @PostMapping("/gymStaff/add")
    public String saveGymStaff(@RequestBody GymStaff gymStaff)       //test passed
    {
        passwordHashHandler.setPassword(gymStaff.getHashedPassword());
        gymStaff.setHashedPassword(passwordHashHandler.hashPassword());
        if (userAccountManagementService.saveGymStaff(gymStaff) != null)
            return "Gym Staff with name (" + gymStaff.getName() + ") and with id (" + gymStaff.getID() +") has been added.";
        else
            return "There is already an existing user with the id" + gymStaff.getID();
    }

   @GetMapping
    public List<User> getAllUsers() //test passed
    {
        return userAccountManagementService.getAllUsers();
    }

    @GetMapping("/gymMember")   //test passed
    public List<GymMember> getAllGymMembers()
    {
        return userAccountManagementService.getAllGymMembers();
    }

    @GetMapping("/gymStaff")    //test passed
    public List<GymStaff> getAllGymStaffs()
    {
        return userAccountManagementService.getAllGymStaff();
    }

    @GetMapping("/{id}")
    public List<User> getUserWithID(@PathVariable("id") long userID)    //test passed
    {
        return userAccountManagementService.getUserByID(userID);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUserWithID(@PathVariable("id") long userID) //test passed
    {
        if (userAccountManagementService.getUserByID(userID) == null)
            return "User with ID " + userID + " does not exist.";
        return "User with ID " + userID + " has been successfully deleted.";
    }

    /**
     * TODO -> PATCH GymMember and GymStaff. Do not forget to validate all combinations.
     */
}

package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.helpers.PasswordHashHandler;
import com.venividicode.bilfit.models.GymMember;
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

    @PostMapping("/addGymMember")
    public String addGymMember(@RequestBody GymMember gymMember)
    {
        passwordHashHandler.setPassword(gymMember.getHashedPassword());
        gymMember.setHashedPassword(passwordHashHandler.hashPassword());
        if (userAccountManagementService.saveGymMember(gymMember) != null)
            return "Gym Member with name (" + gymMember.getName() + ") and with id(" + gymMember.getID() +") has been added.";
        else
            return "There is already an existing user with the id" + gymMember.getID();
    }

   @GetMapping
    public List<User> getAllUsers()
    {
        return userAccountManagementService.getAllUsers();
    }
}

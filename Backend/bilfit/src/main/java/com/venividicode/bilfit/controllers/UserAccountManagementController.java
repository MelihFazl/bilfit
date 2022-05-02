package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.helpers.PasswordHashHandler;
import com.venividicode.bilfit.models.Admin;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.User;
import com.venividicode.bilfit.repositories.TokenRepository;
import com.venividicode.bilfit.services.AdminService;
import com.venividicode.bilfit.services.UserAccountManagementService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.websocket.server.PathParam;
import java.beans.FeatureDescriptor;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserAccountManagementController {
    @Autowired
    private UserAccountManagementService userAccountManagementService;
    @Autowired
    private AdminService adminService;
    private PasswordHashHandler passwordHashHandler = PasswordHashHandler.getInstance();

    @Autowired
    private TokenRepository tokenRepository;


    @PostMapping("/gymMember/add")
    public String saveGymMember(@RequestParam String token, @RequestBody GymMember gymMember)    //test passed
    {
        List<Admin> admins = adminService.getAllAdmins();
        if(admins != null) {
            boolean tokenMatch = false;
            for(int i = 0; admins.size() > i; i++)
            {
                if(admins.get(i).getToken() != null) {
                    if (admins.get(i).getToken().getToken().equals(token) && admins.get(i).getToken().getInUse()) {
                        tokenMatch = true;
                        break;
                    }
                }
            }
            if (tokenMatch)
            {
                passwordHashHandler.setPassword(gymMember.getHashedPassword());
                gymMember.setHashedPassword(passwordHashHandler.hashPassword());
                if (userAccountManagementService.saveGymMember(gymMember) != null)
                    return "Gym Member with name (" + gymMember.getName() + ") and with id (" + gymMember.getID() + ") has been added.";
                else
                    return "There is already an existing user with the id" + gymMember.getID();
            }
            else {
                return "Unauthorized request.";
            }
        }
        return "Unauthorized request.";
    }
    @PostMapping("/gymStaff/add")
    public String saveGymStaff(@RequestParam String token, @RequestBody GymStaff gymStaff)       //test passed
    {
        List<Admin> admins = adminService.getAllAdmins();
        if(admins != null) {
            boolean tokenMatch = false;
            for(int i = 0; admins.size() > i; i++)
            {
                if(admins.get(i).getToken() != null)
                    if(admins.get(i).getToken().getToken().equals(token) && admins.get(i).getToken().getInUse())
                    {
                        tokenMatch = true;
                        break;
                    }
            }
            if(tokenMatch) {
                passwordHashHandler.setPassword(gymStaff.getHashedPassword());
                gymStaff.setHashedPassword(passwordHashHandler.hashPassword());
                if (userAccountManagementService.saveGymStaff(gymStaff) != null)
                    return "Gym Staff with name (" + gymStaff.getName() + ") and with id (" + gymStaff.getID() + ") has been added.";
                else
                    return "There is already an existing user with the id" + gymStaff.getID();
            }
            else
                return "Unauthorized request.";
        }
        return "Unauthorized request.";
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
        else
            userAccountManagementService.deleteUserByID(userID);
        return "User with ID " + userID + " has been successfully deleted.";
    }

    @PatchMapping("/changePassword/{id}")
    public String changeUserPassword(@PathVariable("id") long userID, @RequestParam String newPassword, @RequestParam String oldPassword) //test passed
    {
        passwordHashHandler.setPassword(newPassword);
        String newHashedPassword = passwordHashHandler.hashPassword();
        passwordHashHandler.setPassword(oldPassword);
        String oldHashedPassword = passwordHashHandler.hashPassword();
        String actualOldHashedPassword = "";
        List<GymMember> gymMembers = userAccountManagementService.getGymMemberByID(userID);
        if(gymMembers == null) {
            List<GymStaff> gymStaffs = userAccountManagementService.getGymStaffByID(userID);
            if(gymStaffs == null)
                return "The user with ID " + userID + " was not found.";
            else
            {
                actualOldHashedPassword = gymStaffs.get(0).getHashedPassword();
                if(!oldHashedPassword.equals(actualOldHashedPassword))
                    return "The old password is incorrect.";
                gymStaffs.get(0).setHashedPassword(newHashedPassword);
                userAccountManagementService.saveGymStaff(gymStaffs.get(0));
                return "The password of user with ID " + userID + " has been successfully changed.";
            }
        }
        else
        {
            actualOldHashedPassword = gymMembers.get(0).getHashedPassword();
            if(!oldHashedPassword.equals(actualOldHashedPassword))
                return "The old password is incorrect.";
            gymMembers.get(0).setHashedPassword(newHashedPassword);
            userAccountManagementService.saveGymMember(gymMembers.get(0));
            return "The password of user with ID " + userID + " has been successfully changed.";
        }
    }

    @PatchMapping("/editGymMember/{id}")
    public String editGymMemberWithID(@RequestBody GymMember editedGymMember, @PathVariable("id") long gymMemberID) //test passed.
    {
        List<GymMember> gymMembers = userAccountManagementService.getGymMemberByID(gymMemberID);
        if(gymMembers ==  null)
            return "There is no Gym Member with ID " + gymMemberID;
        GymMember oldGymMember = gymMembers.get(0);
        try{
            userAccountManagementService.patchGymMember(editedGymMember, oldGymMember.getID());
            return  "Gym Member with ID " + gymMemberID + " was successfully edited.";
        }
        catch (Exception e)
        {
            return "An error occurred.";
        }
    }
    @PatchMapping("/editGymStaff/{id}")
    public String editGymStaffWithID(@RequestBody GymStaff editedGymStaff, @PathVariable("id") long gymStaffID) //test passed
    {
        List<GymStaff> gymStaffs = userAccountManagementService.getGymStaffByID(gymStaffID);
        if(gymStaffs ==  null)
            return "There is no Gym Staff with ID " + gymStaffID;
        GymStaff oldGymStaff = gymStaffs.get(0);
        try{
            userAccountManagementService.patchGymStaff(editedGymStaff, oldGymStaff.getID());
            return  "Gym Staff with ID " + gymStaffID + " was successfully edited.";
        }
        catch (Exception e)
        {
            return "An error occurred.";
        }
    }

    @PatchMapping("/editUserID/{id}")
    public String editUserID(@RequestParam long newID, @PathVariable("id") long oldID)  //test passed
    {
        List<User> userList =  userAccountManagementService.getUserByID(oldID);
        if(userList == null)
            return "There is no user with ID " + oldID + ".";
        else
        {
            List<User> potentialConflictList = userAccountManagementService.getUserByID(newID);
            if(potentialConflictList != null)
                return "The ID " + newID + " is already in use by another user.";
            else
            {
                if (userList.get(0) instanceof GymMember)
                {
                    GymMember oldGymMember = userAccountManagementService.getGymMemberByID(oldID).get(0);
                    userAccountManagementService.deleteUserByID(oldID);
                    oldGymMember.setID(newID);
                    userAccountManagementService.saveGymMember(oldGymMember);
                }
                else
                {
                    GymStaff oldGymStaff = userAccountManagementService.getGymStaffByID(oldID).get(0);
                    userAccountManagementService.deleteUserByID(oldID);
                    oldGymStaff.setID(newID);
                    userAccountManagementService.saveGymStaff(oldGymStaff);
                }
                return "The user's ID was successfully changed from " + oldID + " to " + newID + ".";
            }
        }
    }
}

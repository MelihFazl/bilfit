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

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    FieldRepository fieldRepository;
    @Autowired
    SportActivityRepository sportActivityRepository;
    @Autowired
    SportCenterRepository sportCenterRepository;
    @Autowired
    GymStaffRepository gymStaffRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private TimeSlotOnDayRepository timeSlotOnDayRepository;
    private PasswordHashHandler passwordHashHandler = PasswordHashHandler.getInstance();

    @PostMapping("/add")
    public String addAdmin(@RequestBody Admin admin)
    {
        List<Admin> checkList = adminService.getAdminByID(admin.getID());
        if (checkList != null)
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


    @GetMapping
    public List<Admin> getAllAdmins() {
        List<String> occupiableTimeSlots = new ArrayList<>();
        occupiableTimeSlots.add("10.00-12.00");
        occupiableTimeSlots.add("13.00-15.00");
        occupiableTimeSlots.add("15.00-17.00");
        occupiableTimeSlots.add("17.00-19.00");
        occupiableTimeSlots.add("19.00-21.00");
        occupiableTimeSlots.add("21.00-23.00");

        Field badmintonNorth = new Field();
        badmintonNorth.setName("Main Badminton-North");
        badmintonNorth.setMaxQuota(4);
        TimeSlotOnDay timeSlotOnDay = new TimeSlotOnDay();
        timeSlotOnDay.setDate(LocalDate.of(2022, 05, 15));
        timeSlotOnDay.setTimeSlots(occupiableTimeSlots);
        List<TimeSlotOnDay> timeSlotOnDays = new ArrayList<>();
        timeSlotOnDays.add(timeSlotOnDay);

        timeSlotOnDayRepository.save(timeSlotOnDay);

        badmintonNorth.setOccupiableTimeSlotsOnDay(timeSlotOnDays);
        Field badmintonSouth = new Field();
        badmintonSouth.setName("Main Badminton-South");
        badmintonSouth.setMaxQuota(4);
        badmintonSouth.setOccupiableTimeSlotsOnDay(timeSlotOnDays);



        fieldRepository.save(badmintonNorth);
        System.out.println("NORTH: " + badmintonNorth.getID());
        System.out.println("SOTUH: " + badmintonSouth.getID());
        if(badmintonNorth.getID() == badmintonSouth.getID()) {
            fieldRepository.save(badmintonSouth);
        }


        SportActivity badminton = new SportActivity();
        badminton.setActivity("Badminton");
        badminton.setFields(fieldRepository.findAll());
        sportActivityRepository.save(badminton);

        SportCenter sportCenter = new SportCenter();
        sportCenter.setBalance(10.0);
        sportCenter.setAvailableActivities(sportActivityRepository.findAll());
        sportCenter.setName("Main Sports Hall");

        sportCenter.setClosesAt(LocalDateTime.of(0, 1, 1, 23, 0));
        sportCenter.setClosesAt(LocalDateTime.of(0, 1, 1, 10, 0));
        sportCenter.setLatestReservationStepValue(5);
        sportCenter.setStaff(gymStaffRepository.findById(21));
        sportCenterRepository.save(sportCenter);
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public Admin getAdminWithID(@PathVariable("id") long adminID) {

        List<Admin> adminsWithSpecifiedID = adminService.getAdminByID(adminID);

        if (adminsWithSpecifiedID == null)
            return null;

        return adminsWithSpecifiedID.get(0);
    }

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
                return "Password is incorrect.";
        }
    }
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
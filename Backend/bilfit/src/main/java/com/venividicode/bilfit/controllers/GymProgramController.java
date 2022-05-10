package com.venividicode.bilfit.controllers;


import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymProgram;
import com.venividicode.bilfit.models.GymProgramRequest;
import com.venividicode.bilfit.services.GymProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * A controller class for handling requests related
 * to GymProgram and GymProgramRequest models
 * @author Veni Vidi Code
 */

@RestController
@RequestMapping("/gymProgram")
@CrossOrigin
public class GymProgramController {

    @Autowired
    private GymProgramService gymProgramService;

    /**
     * Post method used to add a Gym Program Request to the database by a gym member
     * @param gymProgramRequest object that is to be added to the database
     * @param memberId id of the gym member sending the Gym Program Request
     * @return String indicating success or fail
     */
    @PostMapping("/sendRequest")
    public String sendGymProgramRequest(@RequestBody GymProgramRequest gymProgramRequest, @RequestParam long memberId) {
        try {
            if(gymProgramService.saveGymProgramRequest(gymProgramRequest, memberId) != null)
                return "Gym Program Request with description " + gymProgramRequest.getDescription() + " has ben sent";
            System.out.println("Member with given ID " + memberId + " was not found");
            return null;
        } catch (Exception e) {
            return "Problem occurred: " + e.toString();
        }
    }

    /**
     * Delete method used to delete Gym Program Request from the database
     * @param id of the Gym Program Request that is to be deleted from the database
     * @return String indicating success or fail
     */
    @DeleteMapping("/deleteRequest/{id}")
    public String cancelGymProgramRequest(@PathVariable("id") long id) {
        List<GymProgramRequest> requestsWithSpecifiedID = gymProgramService.getGymProgramRequestByID(id);
        if (requestsWithSpecifiedID == null) {
            return "Gym Program Request with specified ID " + id + " was not found";
        }
        gymProgramService.deleteGymProgramRequestByID(id);
        return "Gym Program Request with specified ID " + id + " has been successfully deleted.";
    }

    /**
     * Post method used to send Gym Program into the database by a gym staff
     * @param gymProgram object created by gym staff
     * @param staffId id of the gym staff saving the Gym Program
     * @param memberId id of the target gym member
     * @return String indicating success or failure
     */
    @PostMapping("/sendProgram")
    public String sendGymProgram(@RequestBody GymProgram gymProgram, @RequestParam long staffId, @RequestParam long memberId) { // used by gym staff
        try {
            gymProgramService.saveGymProgram(gymProgram, staffId, memberId);
            return "Gym Program with description " + gymProgram.getDescription() + " has ben sent";
        } catch (Exception e) {
            return "Problem occurred: " + e.toString();
        }
    }


    /**
     * Get request returning all the gym programs
     * @return List<GymProgram> list of all the gym programs
     */
    @GetMapping("/getPrograms")
    public List<GymProgram> getAllGymPrograms() {
        return gymProgramService.getAllGymPrograms();
    }

    /**
     * Get request returns gym program with specified id
     * @param id id of the gym program that is to be returned
     * @return GymProgram the returned GymProgram object
     */
    @GetMapping("/getPrograms/{id}")
    public GymProgram getGymProgramWithID(@PathVariable("id") long id) {

        List<GymProgram> gymProgramsWithSpecifiedID = gymProgramService.getGymProgramByID(id);

        if (gymProgramsWithSpecifiedID == null) {
            return null;
        }
        return gymProgramsWithSpecifiedID.get(0);
    }

    /**
     * Get request returns Gym Program by the specified author id
     * @param authorID id of the Gym Staff that wrote this Gym Program
     * @return List<GymProgram> list of all the Gym Program whose author is specified with id
     */
    @GetMapping("/getProgram/author/{author_id}")
    public List<GymProgram> getGymProgramWithAuthor(@PathVariable("author_id") long authorID) {

        try {
            return gymProgramService.getGymProgramByAuthor(authorID);
        } catch (Exception e) {
            System.out.println("Problem occurred");
            return null;
        }

    }

    /**
     * Get method returns all the Gym Program Requests
     * @return List<GymProgramRequest> list of all the Gym Program Request objects
     */
    @GetMapping("/getProgramRequests")
    public List<GymProgramRequest> getAllGymProgramRequests() {
        return gymProgramService.getAllGymProgramRequests();
    }

    /**
     * Get method returns all the Gym Program Requests with the specified id (only one)
     * @param id id of the Gym Program Request
     * @return GymProgramRequest object that is returned
     */
    @GetMapping("/getProgramRequest/{id}")
    public GymProgramRequest getGymProgramRequestWithID(@PathVariable("id") long id) {

        List<GymProgramRequest> gymProgramRequestsWithSpecifiedID = gymProgramService.getGymProgramRequestByID(id);

        if (gymProgramRequestsWithSpecifiedID == null) {
            return null;
        }
        return gymProgramRequestsWithSpecifiedID.get(0);
    }


    /**
     * Get method returns all the Gym Program Requests whose owner is specified by id
     * @param ownerID id of the Gym Member who sent the Gym Program Request
     * @return List<GymProgramRequest> list of all the gym program requests whose owner is specified
     */
    @GetMapping("/getProgramRequest/owner/{owner_id}")
    public List<GymProgramRequest> getGymProgramRequestWithOwner(@PathVariable("owner_id") long ownerID) {

        try {
            return gymProgramService.getGymProgramRequestByOwner(ownerID);
        } catch (Exception e) {
            System.out.println("Problem occurred");
            return null;
        }
    }




}

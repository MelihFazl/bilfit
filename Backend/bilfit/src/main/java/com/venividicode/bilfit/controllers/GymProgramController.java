package com.venividicode.bilfit.controllers;


import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymProgram;
import com.venividicode.bilfit.models.GymProgramRequest;
import com.venividicode.bilfit.services.GymProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gymProgram")
@CrossOrigin
public class GymProgramController {

    @Autowired
    private GymProgramService gymProgramService;

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
     * responseGymProgramRequest ?
     * mapping'i ne?
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



    @GetMapping("/getPrograms")
    public List<GymProgram> getAllGymPrograms() {
        return gymProgramService.getAllGymPrograms();
    }

    @GetMapping("/getPrograms/{id}")
    public GymProgram getGymProgramWithID(@PathVariable("id") long id) {

        List<GymProgram> gymProgramsWithSpecifiedID = gymProgramService.getGymProgramByID(id);

        if (gymProgramsWithSpecifiedID == null) {
            return null;
        }
        return gymProgramsWithSpecifiedID.get(0);
    }

    @GetMapping("/getProgram/author/{author_id}")
    public List<GymProgram> getGymProgramWithAuthor(@PathVariable("author_id") long authorID) {

        try {
            return gymProgramService.getGymProgramByAuthor(authorID);
        } catch (Exception e) {
            System.out.println("Problem occurred");
            return null;
        }

    }

    @GetMapping("/getProgramRequests")
    public List<GymProgramRequest> getAllGymProgramRequests() {
        return gymProgramService.getAllGymProgramRequests();
    }

    @GetMapping("/getProgramRequest/{id}")
    public GymProgramRequest getGymProgramRequestWithID(@PathVariable("id") long id) {

        List<GymProgramRequest> gymProgramRequestsWithSpecifiedID = gymProgramService.getGymProgramRequestByID(id);

        if (gymProgramRequestsWithSpecifiedID == null) {
            return null;
        }
        return gymProgramRequestsWithSpecifiedID.get(0);
    }



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

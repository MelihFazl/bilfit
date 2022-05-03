package com.venividicode.bilfit.controllers;


import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.services.GymMemberRestrictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gymMemberRestriction")
@CrossOrigin
public class GymMemberRestrictionController {

    @Autowired
    private GymMemberRestrictionService gymMemberRestrictionService;

    @PatchMapping("/restrict/{id}")
    public String restrictGymMemberWithID(@PathVariable("id") long id) { // test passed
        List<GymMember> memberToBeRestricted = gymMemberRestrictionService.getGymMemberByID(id);
        if (memberToBeRestricted == null) {
            return "There is no gym member with id " + id;
        }

        memberToBeRestricted.get(0).setIsRestricted(true);
        gymMemberRestrictionService.patchGymMember(memberToBeRestricted.get(0));
        return "Gym Member with ID " + memberToBeRestricted.get(0).getID() + " is restricted\n";
    }

    @PatchMapping("/unrestrict/{id}")
    public String unrestrictGymMemberWithID(@PathVariable("id") long id) { // test passed
        List<GymMember> memberToBeUnrestricted = gymMemberRestrictionService.getGymMemberByID(id);
        if (memberToBeUnrestricted == null) {
            return "There is no gym member with id " + id;
        }
        memberToBeUnrestricted.get(0).setIsRestricted(false);
        gymMemberRestrictionService.patchGymMember(memberToBeUnrestricted.get(0));
        return "Gym Member with ID " + memberToBeUnrestricted.get(0).getID() + " is unrestricted\n";
    }



}

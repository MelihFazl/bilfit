package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.helpers.PasswordHashHandler;
import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.TokenRepository;
import com.venividicode.bilfit.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * A controller class for handling requests and
 * operations related to User Management
 */
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
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private SportCourseService sportCourseService;
    @Autowired
    private TournamentService tournamentService;
    @Autowired
    private GymProgramService gymProgramService;

    @PostMapping("/gymMember/add")
    public String saveGymMember(@RequestParam String token, @RequestBody GymMember gymMember)    //test passed
    {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins != null) {
            boolean tokenMatch = false;
            for (int i = 0; admins.size() > i; i++) {
                if (admins.get(i).getToken() != null) {
                    if (admins.get(i).getToken().getToken().equals(token) && admins.get(i).getToken().getInUse()) {
                        tokenMatch = true;
                        break;
                    }
                }
            }
            if (tokenMatch) {
                passwordHashHandler.setPassword(gymMember.getHashedPassword());
                gymMember.setHashedPassword(passwordHashHandler.hashPassword());
                gymMember.setIsRestricted(false);
                if (userAccountManagementService.saveGymMember(gymMember) != null)
                    return "Gym Member with name (" + gymMember.getName() + ") and with id (" + gymMember.getID() + ") has been added.";
                else
                    return "There is already an existing user with the id" + gymMember.getID();
            } else {
                return "Unauthorized request.";
            }
        }
        return "Unauthorized request.";
    }

    @PostMapping("/gymStaff/add")
    public String saveGymStaff(@RequestParam String token, @RequestBody GymStaff gymStaff)       //test passed
    {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins != null) {
            boolean tokenMatch = false;
            for (int i = 0; admins.size() > i; i++) {
                if (admins.get(i).getToken() != null)
                    if (admins.get(i).getToken().getToken().equals(token) && admins.get(i).getToken().getInUse()) {
                        tokenMatch = true;
                        break;
                    }
            }
            if (tokenMatch) {
                passwordHashHandler.setPassword(gymStaff.getHashedPassword());
                gymStaff.setHashedPassword(passwordHashHandler.hashPassword());
                if (userAccountManagementService.saveGymStaff(gymStaff) != null)
                    return "Gym Staff with name (" + gymStaff.getName() + ") and with id (" + gymStaff.getID() + ") has been added.";
                else
                    return "There is already an existing user with the id" + gymStaff.getID();
            } else
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
    public List<GymMember> getAllGymMembers() {
        return userAccountManagementService.getAllGymMembers();
    }

    @GetMapping("/gymStaff")    //test passed
    public List<GymStaff> getAllGymStaffs() {
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
        {
            List<GymMember> potentialGymMember = userAccountManagementService.getGymMemberByID(userID);
            if(potentialGymMember == null)
            {
                List<GymProgram> checkListGymProgram = gymProgramService.getGymProgramByAuthor(userID);
                List<GymMember> members = getAllGymMembers();
                for(int i = 0; checkListGymProgram.size() > i; i++)
                {
                    for(int j = 0; j < members.size(); j++)
                    {
                        if(members.get(j).getProgram() != null && (members.get(j).getProgram().getID().longValue() == checkListGymProgram.get(i).getID().longValue()))
                        {
                            GymMember member = members.get(j);
                            member.setProgram(null);
                            userAccountManagementService.updateGymMember(member);
                        }
                    }
                    gymProgramService.deleteGymProgramByID(checkListGymProgram.get(i).getID());
                }
                userAccountManagementService.deleteUserByID(userID);
                return "User with ID " + userID + " has been successfully deleted.";
            }
            else
            {
                //Delete reservations
                List<Reservation> checklist = reservationService.getByReserver(userID);
                for (int i = 0; i < checklist.size(); i++)
                {
                    reservationService.deleteReservationByID(checklist.get(i).getID());
                }

                //Delete course registrations
                List<SportCourse>  sportCourses = sportCourseService.getSportCoursesByParticipants(userID);
                for (int i = 0; i < sportCourses.size(); i++)
                {
                    sportCourseService.removeParticipant(sportCourses.get(i).getID(), userID);
                }
                //Delete GymProgramRequests
                List<GymProgramRequest> requests = gymProgramService.getGymProgramRequestByOwner(userID);
                for(int i = 0; i < requests.size(); i++)
                    gymProgramService.deleteGymProgramRequestByID(requests.get(i).getID());

                //Delete Tournament registrations
                List<TournamentRegistration> registrations = tournamentService.getTournamentRegistrationByMemberID(userID);
                for(int i = 0; i < registrations.size(); i++)
                {
                    tournamentService.deleteTournamentRegistrationByID(registrations.get(i).getID(), registrations.get(i).getTournament().getID());
                }

                userAccountManagementService.deleteUserByID(userID);
                return "User with ID " + userID + " has been successfully deleted.";
            }
        }
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
        if (gymMembers == null) {
            List<GymStaff> gymStaffs = userAccountManagementService.getGymStaffByID(userID);
            if (gymStaffs == null)
                return "The user with ID " + userID + " was not found.";
            else {
                actualOldHashedPassword = gymStaffs.get(0).getHashedPassword();
                if (!oldHashedPassword.equals(actualOldHashedPassword))
                    return "The old password is incorrect.";
                gymStaffs.get(0).setHashedPassword(newHashedPassword);
                userAccountManagementService.updateGymStaff(gymStaffs.get(0));
                return "The password of user with ID " + userID + " has been successfully changed.";
            }
        } else {
            actualOldHashedPassword = gymMembers.get(0).getHashedPassword();
            if (!oldHashedPassword.equals(actualOldHashedPassword))
                return "The old password is incorrect.";
            gymMembers.get(0).setHashedPassword(newHashedPassword);
            userAccountManagementService.updateGymMember(gymMembers.get(0));
            return "The password of user with ID " + userID + " has been successfully changed.";
        }
    }

    @PatchMapping("/editGymMember/{id}")
    public String editGymMemberWithID(@RequestBody GymMember editedGymMember, @PathVariable("id") long gymMemberID) //test passed.
    {
        List<GymMember> gymMembers = userAccountManagementService.getGymMemberByID(gymMemberID);
        if (gymMembers == null)
            return "There is no Gym Member with ID " + gymMemberID;
        GymMember oldGymMember = gymMembers.get(0);
        try {
            userAccountManagementService.patchGymMember(editedGymMember, oldGymMember.getID());
            return "Gym Member with ID " + gymMemberID + " was successfully edited.";
        } catch (Exception e) {
            return "An error occurred.";
        }
    }

    @PatchMapping("/editGymStaff/{id}")
    public String editGymStaffWithID(@RequestBody GymStaff editedGymStaff, @PathVariable("id") long gymStaffID) //test passed
    {
        List<GymStaff> gymStaffs = userAccountManagementService.getGymStaffByID(gymStaffID);
        if (gymStaffs == null)
            return "There is no Gym Staff with ID " + gymStaffID;
        GymStaff oldGymStaff = gymStaffs.get(0);
        try {
            userAccountManagementService.patchGymStaff(editedGymStaff, oldGymStaff.getID());
            return "Gym Staff with ID " + gymStaffID + " was successfully edited.";
        } catch (Exception e) {
            return "An error occurred.";
        }
    }

    @PatchMapping("/editUserID/{id}")
    public String editUserID(@RequestParam long newID, @PathVariable("id") long oldID)  //test passed
    {
        List<User> userList = userAccountManagementService.getUserByID(oldID);
        if (userList == null)
            return "There is no user with ID " + oldID + ".";
        else {
            List<User> potentialConflictList = userAccountManagementService.getUserByID(newID);
            if (potentialConflictList != null)
                return "The ID " + newID + " is already in use by another user.";
            else {
                if (userList.get(0) instanceof GymMember) {
                    GymMember oldGymMember = userAccountManagementService.getGymMemberByID(oldID).get(0);
                    userAccountManagementService.deleteUserByID(oldID);
                    oldGymMember.setID(newID);
                    userAccountManagementService.saveGymMember(oldGymMember);
                } else {
                    GymStaff oldGymStaff = userAccountManagementService.getGymStaffByID(oldID).get(0);
                    userAccountManagementService.deleteUserByID(oldID);
                    oldGymStaff.setID(newID);
                    userAccountManagementService.saveGymStaff(oldGymStaff);
                }
                return "The user's ID was successfully changed from " + oldID + " to " + newID + ".";
            }
        }
    }

    @PostMapping("/gymStaff/login/{id}")
    public String loginGymStaff(@RequestParam String password, @PathVariable("id") long userID) {
        passwordHashHandler = PasswordHashHandler.getInstance();
        passwordHashHandler.setPassword(password);
        List<GymStaff> gymStaffs = userAccountManagementService.getGymStaffByID(userID);
        if (gymStaffs == null)
            return "No Gym Staff was found with ID " + userID;
        else {
            GymStaff gymStaffLoggingIn = gymStaffs.get(0);
            if (passwordHashHandler.hashPassword().equals(gymStaffLoggingIn.getHashedPassword())) {
                Token token = new Token();
                token.setInUse(true);
                token.setLastActive(LocalDateTime.now());
                String tokenStr = token.generateToken();
                tokenRepository.save(token);
                gymStaffLoggingIn.setToken(token);
                userAccountManagementService.updateGymStaff(gymStaffLoggingIn);
                return "GS " + tokenStr;
            }
            return "Login credentials are incorrect";
        }
    }

    @PostMapping("/gymMember/login/{id}")
    public String loginGymMember(@RequestParam String password, @PathVariable("id") long gymMemberID) {
        passwordHashHandler = PasswordHashHandler.getInstance();
        passwordHashHandler.setPassword(password);
        List<GymMember> gymMembers = userAccountManagementService.getGymMemberByID(gymMemberID);
        if (gymMembers == null)
            return "No Gym Member was found with ID " + gymMemberID;
        GymMember gymMemberLoggingIn = gymMembers.get(0);
        if(gymMemberLoggingIn.getIsRestricted())
            return "You shall not pass.";
        if (passwordHashHandler.hashPassword().equals(gymMemberLoggingIn.getHashedPassword())) {
            Token token = new Token();
            token.setInUse(true);
            token.setLastActive(LocalDateTime.now());
            String tokenStr = token.generateToken();
            tokenRepository.save(token);
            gymMemberLoggingIn.setToken(token);
            userAccountManagementService.updateGymMember(gymMemberLoggingIn);
            return "GM " + tokenStr;
        }
        return "Login credentials are incorrect";
    }

    @PostMapping("/logout/{id}")
    public String logOut(@PathVariable("id") long userID) {
        List<GymMember> gymMembers = userAccountManagementService.getGymMemberByID(userID);
        if (gymMembers == null) {
            List<GymStaff> gymStaffs = userAccountManagementService.getGymStaffByID(userID);
            if (gymStaffs == null)
                return "No user found with ID " + userID;
            else {
                GymStaff curGymStaff = gymStaffs.get(0);
                curGymStaff.getToken().setLastActive(LocalDateTime.now());
                curGymStaff.getToken().setInUse(false);
                tokenRepository.save(curGymStaff.getToken());
                userAccountManagementService.saveGymStaff(curGymStaff);

                return "GymStaff with ID " + userID + " successfully logged out";
            }
        } else {
            GymMember curGymMember = gymMembers.get(0);
            curGymMember.getToken().setLastActive(LocalDateTime.now());
            curGymMember.getToken().setInUse(false);
            tokenRepository.save(curGymMember.getToken());
            userAccountManagementService.saveGymMember(curGymMember);
            return "GymStaff with ID " + userID + " successfully logged out";
        }
    }

    @PostMapping("/gymMember/restrict/{id}")
    public String restrictGymMember(@PathVariable("id") long gymMemberID)
    {
        List<GymMember> memberList = userAccountManagementService.getGymMemberByID(gymMemberID);
        if(memberList == null)
            return "There is not any gym member with the ID " + gymMemberID;
        GymMember member = memberList.get(0);
        if(member.getIsRestricted())
        {
            member.setIsRestricted(false);
            userAccountManagementService.patchGymMember(member, member.getID());
            return "Gym member with ID " + gymMemberID + " is not restricted anymore.";
        }
        else
        {
            deleteUserWithID(member.getID());
            member.setIsRestricted(true);
            userAccountManagementService.saveGymMember(member);
            return "Gym member with ID " + gymMemberID + " is restricted now.";
        }
    }
}

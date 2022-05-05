package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.User;
import com.venividicode.bilfit.repositories.UserRepository;

import java.util.List;

public interface UserAccountManagementService
{

    public List<User> getAllUsers();
    public List<GymMember> getAllGymMembers();
    public List<GymStaff> getAllGymStaff();
    public List<User> getUserByID(long userID);
    public List<GymMember> getGymMemberByID(long gymMemberID);
    public List<GymStaff> getGymStaffByID(long gymStaffID);
    public List<User> getUsersByName(String userName);
    public List<GymMember> getGymMembersByName(String gymMemberName);
    public List<GymStaff> getGymStaffName(String gymStaffName);
    public User deleteUserByID(long userID);
    public GymMember deleteGymMemberByID(long gymMemberID);
    public GymStaff deleteGymStaffByID(long gymStaffID);
    public GymMember patchGymMember(GymMember editedGymMember, long oldGymMemberID);
    public GymStaff patchGymStaff(GymStaff editedGymStaff, long olgGymStaffID);
    public GymMember saveGymMember(GymMember gymMember);
    public GymStaff saveGymStaff(GymStaff gymStaff);
    public GymMember updateGymMember(GymMember gymMember);
    public  GymStaff updateGymStaff(GymStaff gymStaff);

}

package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.User;
import com.venividicode.bilfit.repositories.GymMemberRepository;
import com.venividicode.bilfit.repositories.GymStaffRepository;
import com.venividicode.bilfit.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Service
public class UserAccountManagementServiceImplementation  implements UserAccountManagementService
{
    @Autowired
    private GymMemberRepository gymMemberRepository;
    @Autowired
    private GymStaffRepository gymStaffRepository;
    @Override
    public List<User> getAllUsers() {
        List<User> result = new ArrayList<>();
        result.addAll(gymMemberRepository.findAll());
        result.addAll(gymStaffRepository.findAll());
        return result;
    }

    @Override
    public List<GymMember> getAllGymMembers() {
        return gymMemberRepository.findAll();
    }

    @Override
    public List<GymStaff> getAllGymStaff() {
        return gymStaffRepository.findAll();
    }

    @Override
    public List<User> getUserByID(long userID) {    // see here why test fails? both findById s return empty??
        List<GymMember> gymMembers = gymMemberRepository.findById(userID);
        if(gymMembers == null)
        {
            List<GymStaff> gymStaffs = gymStaffRepository.findById(userID);
            if(gymStaffs == null)
                return null;
            else
            {
                List<User> result = new ArrayList<>();
                result.addAll(gymStaffs);
                return result;
            }
        }
        else
        {
            List<User> result = new ArrayList<>();
            result.addAll(gymMembers);
            return result;
        }

    }


    @Override
    public List<GymMember> getGymMemberByID(long gymMemberID) {
        return gymMemberRepository.findById(gymMemberID);
    }

    @Override
    public List<GymStaff> getGymStaffByID(long gymStaffID) {
        return gymStaffRepository.findById(gymStaffID);
    }

    @Override
    public List<User> getUsersByName(String userName)
    {
        List<User> result = new ArrayList<>();
        result.addAll(gymMemberRepository.findByName(userName));
        result.addAll(gymStaffRepository.findByName(userName));
        return result;
    }

    @Override
    public List<GymMember> getGymMembersByName(String gymMemberName) {
        return gymMemberRepository.findByName(gymMemberName);
    }

    @Override
    public List<GymStaff> getGymStaffName(String gymStaffName) {
        return gymStaffRepository.findByName(gymStaffName);
    }

    @Override
    public User deleteUserByID(long userID) {
        List<GymMember> gymMembers = gymMemberRepository.findById(userID);
        if(gymMembers == null)
        {
            System.out.println("GYM MEMBERS BOŞ GELDİ");
            List<GymStaff> gymStaffs = gymStaffRepository.findById(userID);
            if(gymStaffs == null) {
                System.out.println("GYM STAFF BOŞ GELDİ");
                return null;
            }
            else
            {
                return gymStaffRepository.deleteById(userID);
            }
        }
        else
        {
            return gymMemberRepository.deleteById(userID);
        }
    }

    @Override
    public GymMember deleteGymMemberByID(long gymMemberID) {
        return gymMemberRepository.deleteById(gymMemberID);
    }

    @Override
    public GymStaff deleteGymStaffByID(long gymStaffID) {
        return gymStaffRepository.deleteById(gymStaffID);
    }


    @Override
    public GymMember patchGymMember(GymMember editedGymMember) {
        List<GymMember> gymMembers = gymMemberRepository.findById(editedGymMember.getID());
        if(gymMembers == null)
        {
            return null;
        }
        else
        {
            return gymMemberRepository.save(editedGymMember);
        }
    }

    @Override
    public GymStaff patchGymStaff(GymStaff editedGymStaff) {
        List<GymStaff> gymStaffs = gymStaffRepository.findById(editedGymStaff.getID());
        if(gymStaffs == null)
        {
            return null;
        }
        else
        {
            return gymStaffRepository.save(editedGymStaff);
        }
    }

    @Override
    public GymMember saveGymMember(GymMember gymMember) {
        List<GymStaff> gymStaffs = gymStaffRepository.findById(gymMember.getID());
        List<GymMember> gymMembers = gymMemberRepository.findById(gymMember.getID());
        if(gymMembers == null && gymStaffs == null)
            return gymMemberRepository.save(gymMember);
        return  null;
    }

    @Override
    public GymStaff saveGymStaff(GymStaff gymStaff) {
        List<GymStaff> gymStaffs = gymStaffRepository.findById(gymStaff.getID());
        List<GymMember> gymMembers = gymMemberRepository.findById(gymStaff.getID());
        if(gymMembers == null && gymStaffs == null)
            return gymStaffRepository.save(gymStaff);
        return  null;
    }
}


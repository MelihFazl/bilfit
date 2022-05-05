package com.venividicode.bilfit.services;

import com.venividicode.bilfit.helpers.IgnoredPropertyCreator;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.User;
import com.venividicode.bilfit.repositories.GymMemberRepository;
import com.venividicode.bilfit.repositories.GymStaffRepository;
import com.venividicode.bilfit.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.beans.FeatureDescriptor;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

@Service
public class UserAccountManagementServiceImplementation  implements UserAccountManagementService
{
    @Autowired
    private GymMemberRepository gymMemberRepository;
    @Autowired
    private GymStaffRepository gymStaffRepository;
    private IgnoredPropertyCreator ignoredPropertyCreator;
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
    public GymMember patchGymMember(GymMember editedGymMember, long oldGymMemberID) {
        List<GymMember> gymMembers = gymMemberRepository.findById(oldGymMemberID);
        if(gymMembers == null)
        {
            return null;
        }
        else
        {
            GymMember oldGymMember = gymMembers.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedGymMember);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedGymMember, oldGymMember, ignoredProperties);
            gymMemberRepository.save(oldGymMember);
            return oldGymMember;
        }
    }

    @Override
    public GymStaff patchGymStaff(GymStaff editedGymStaff, long olgGymStaffID) {
        List<GymStaff> gymStaffs = gymStaffRepository.findById(olgGymStaffID);
        if(gymStaffs == null)
        {
            return null;
        }
        else
        {
            GymStaff oldGymStaff = gymStaffs.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedGymStaff);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedGymStaff, oldGymStaff, ignoredProperties);
            gymStaffRepository.save(oldGymStaff);
            return oldGymStaff;
        }
    }

    @Override
    public GymMember saveGymMember(GymMember gymMember) {
        List<GymStaff> gymStaffs = gymStaffRepository.findById(gymMember.getID().longValue());
        List<GymMember> gymMembers = gymMemberRepository.findById(gymMember.getID().longValue());
        if(gymMembers == null && gymStaffs == null)
            return gymMemberRepository.save(gymMember);
        return  null;
    }

    public GymMember updateGymMember(GymMember gymMember)
    {
        return gymMemberRepository.save(gymMember);
    }
    public GymStaff updateGymStaff(GymStaff gymStaff)
    {
        return gymStaffRepository.save(gymStaff);
    }

    @Override
    public GymStaff saveGymStaff(GymStaff gymStaff) {
        List<GymStaff> gymStaffs = gymStaffRepository.findById(gymStaff.getID().longValue());
        List<GymMember> gymMembers = gymMemberRepository.findById(gymStaff.getID().longValue());
        if(gymMembers == null && gymStaffs == null)
            return gymStaffRepository.save(gymStaff);
        return  null;
    }


}


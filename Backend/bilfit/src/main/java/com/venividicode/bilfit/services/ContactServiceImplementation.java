package com.venividicode.bilfit.services;


import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.SportCenter;
import com.venividicode.bilfit.repositories.GymStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImplementation implements ContactService {

    @Autowired
    private GymStaffRepository gymStaffRepository;

    @Override
    public List<GymStaff> getAllGymStaff() {
        return gymStaffRepository.findAll();
    }

    @Override
    public List<GymStaff> getGymStaffByID(long id) {
        return gymStaffRepository.findById(id);
    }

    @Override
    public List<GymStaff> getGymStaffByName(String name) {
        return gymStaffRepository.findByName(name);
    }

    /*@Override
    public List<GymStaff> getGymStaffBySportCenter(SportCenter sportCenter) {
        return gymStaffRepository.findBySportCenter(sportCenter);
    }*/
}

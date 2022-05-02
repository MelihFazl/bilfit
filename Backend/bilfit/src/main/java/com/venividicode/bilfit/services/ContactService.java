package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.SportCenter;

import java.util.List;

public interface ContactService {

    public List<GymStaff> getAllGymStaff();
    public List<GymStaff> getGymStaffByID(long id);
    public List<GymStaff> getGymStaffByName(String name);
    //public List<GymStaff> getGymStaffBySportCenter(SportCenter sportCenter);



}

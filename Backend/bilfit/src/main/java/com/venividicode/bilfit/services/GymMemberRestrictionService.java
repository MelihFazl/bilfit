package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymMember;

import java.util.List;

public interface GymMemberRestrictionService {

    public List<GymMember> getAllGymMembers();
    public List<GymMember> getGymMemberByID(long id);
    public List<GymMember> getGymMemberByName(String name);
    public GymMember patchGymMember(GymMember member);



}

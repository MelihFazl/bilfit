package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.repositories.GymMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GymMemberRestrictionServiceImplementation implements GymMemberRestrictionService{

    @Autowired
    private GymMemberRepository gymMemberRepository;


    @Override
    public List<GymMember> getAllGymMembers() {
        return gymMemberRepository.findAll();
    }

    @Override
    public List<GymMember> getGymMemberByID(long id) {
        return gymMemberRepository.findById(id);
    }

    @Override
    public List<GymMember> getGymMemberByName(String name) {
        return gymMemberRepository.findByName(name);
    }

    @Override
    public GymMember patchGymMember(GymMember member) {
        return gymMemberRepository.save(member);
    }


}

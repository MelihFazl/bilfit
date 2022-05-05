package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymProgram;
import com.venividicode.bilfit.models.GymProgramRequest;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.repositories.GymMemberRepository;
import com.venividicode.bilfit.repositories.GymProgramRepository;
import com.venividicode.bilfit.repositories.GymProgramRequestRepository;
import com.venividicode.bilfit.repositories.GymStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GymProgramServiceImplementation implements GymProgramService {

    @Autowired
    private GymProgramRepository gymProgramRepository;
    @Autowired
    private GymProgramRequestRepository gymProgramRequestRepository;
    @Autowired
    private GymStaffRepository gymStaffRepository;
    @Autowired
    private GymMemberRepository gymMemberRepository;


    @Override
    public List<GymProgram> getAllGymPrograms() {
        return gymProgramRepository.findAll();
    }

    @Override
    public List<GymProgramRequest> getAllGymProgramRequests() {
        return gymProgramRequestRepository.findAll();
    }

    @Override
    public List<GymProgram> getGymProgramByID(long id) {
        return gymProgramRepository.findById(id);
    }

    @Override
    public List<GymProgramRequest> getGymProgramRequestByID(long id) {
        return gymProgramRequestRepository.findById(id);
    }

    @Override
    public List<GymProgramRequest> getGymProgramRequestByOwner(long ownerID) {
        List<GymMember> gymMemberWithSpecifiedID = gymMemberRepository.findById(ownerID);
        if (gymMemberWithSpecifiedID == null) {
            System.out.println("Gym member with id " + ownerID + " not found");
            return null;
        }
        return gymProgramRequestRepository.findByOwner(gymMemberWithSpecifiedID.get(0));
    }


    @Override
    public List<GymProgram> getGymProgramByAuthor(long authorID) {
        List<GymStaff> gymStaffWithSpecifiedID = gymStaffRepository.findById(authorID);
        if (gymStaffWithSpecifiedID == null) {
            System.out.println("Gym staff with id " + authorID + " not found");
            return null;
        }
        return gymProgramRepository.findByAuthor(gymStaffWithSpecifiedID.get(0));
    }

    @Override
    public GymProgram deleteGymProgramByID(long ID) {
        return gymProgramRepository.deleteById(ID);
    }

    @Override
    public GymProgramRequest deleteGymProgramRequestByID(long ID) {
        return gymProgramRequestRepository.deleteById(ID);
    }

    @Override
    public GymProgram saveGymProgram(GymProgram gymProgram, long gymStaffID, long gymMemberID) {
        List<GymStaff> gymStaffWithSpecifiedID = gymStaffRepository.findById(gymStaffID);
        List<GymMember> gymMemberWithSpecifiedID = gymMemberRepository.findById(gymMemberID);
        if (gymStaffWithSpecifiedID == null || gymMemberWithSpecifiedID == null) {
            System.out.println("There is a problem with one of the id s");
            return null;
        }
        gymProgram.setAuthor(gymStaffWithSpecifiedID.get(0));
        GymMember owner = gymMemberWithSpecifiedID.get(0);
        owner.setProgram(gymProgram);
        gymProgramRepository.save(gymProgram);
        gymMemberRepository.save(owner);
        return gymProgram;
    }


    @Override
    public GymProgramRequest saveGymProgramRequest(GymProgramRequest gymProgramRequest, long gymMemberId) {
        List<GymMember> gymMemberWithSpecifiedID = gymMemberRepository.findById(gymMemberId);
        if (gymMemberWithSpecifiedID == null) {
            System.out.println("There is a problem with the gym member's id");
            return null;
        }
        gymProgramRequest.setOwner(gymMemberWithSpecifiedID.get(0));
        return gymProgramRequestRepository.save(gymProgramRequest);
    }

    /**@Override
    public GymProgram patchGymProgramByID(long id, GymProgram editedGymProgram) {
        return gymProgramRepository.patchByID(id, editedGymProgram);
    }

    @Override
    public GymProgramRequest patchGymProgramRequestByID(long id, GymProgramRequest editedGymProgramRequest) {
        return gymProgramRequestRepository.patchById(id, editedGymProgramRequest);
    }
*/

    /**
     * edit Gym Program
     * and
     * edit Gym Program Request
     * are TODO
     */


}

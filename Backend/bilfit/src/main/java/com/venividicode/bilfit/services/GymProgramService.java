package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymProgram;
import com.venividicode.bilfit.models.GymProgramRequest;
import com.venividicode.bilfit.models.GymStaff;

import java.util.List;

public interface GymProgramService {


    public List<GymProgram> getAllGymPrograms();
    public List<GymProgramRequest> getAllGymProgramRequests();

    public List<GymProgram> getGymProgramByID(long id);
    public List<GymProgramRequest> getGymProgramRequestByID(long id);


    public List<GymProgramRequest> getGymProgramRequestByOwner(long id);

    public List<GymProgram> getGymProgramByAuthor(long id);

    /** GymProgramRequestStatus not implemented yet
    public List<GymProgramRequest> getGymProgramRequestByStatus(GymProgramRequestStatus status);
    */

    public GymProgram deleteGymProgramByID(long ID);
    public GymProgramRequest deleteGymProgramRequestByID(long ID);

    public GymProgram saveGymProgram(GymProgram gymProgram, long gymStaffID ,long gymMemberID);
    public GymProgramRequest saveGymProgramRequest(GymProgramRequest gymProgramRequest, long GymMemberID);

    //public GymProgram patchGymProgramByID(long id, GymProgram editedGymProgram);
    //public GymProgramRequest patchGymProgramRequestByID(long id, GymProgramRequest editedGymProgramRequest);


}

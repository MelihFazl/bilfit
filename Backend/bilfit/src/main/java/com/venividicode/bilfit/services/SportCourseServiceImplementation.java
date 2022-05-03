package com.venividicode.bilfit.services;

import com.venividicode.bilfit.helpers.IgnoredPropertyCreator;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.GymStaff;
import com.venividicode.bilfit.models.SportCenter;
import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.repositories.GymMemberRepository;
import com.venividicode.bilfit.repositories.GymStaffRepository;
import com.venividicode.bilfit.repositories.SportCenterRepository;
import com.venividicode.bilfit.repositories.SportCourseRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SportCourseServiceImplementation implements SportCourseService
{
    @Autowired
    SportCourseRepository sportCourseRepository;
    @Autowired
    SportCenterRepository sportCenterRepository;
    @Autowired
    GymMemberRepository gymMemberRepository;
    @Autowired
    GymStaffRepository gymStaffRepository;

    private IgnoredPropertyCreator ignoredPropertyCreator;

    @Override
    public List<SportCourse> getAllSportCourses()
    {
        return sportCourseRepository.findAll();
    }

    @Override
    public List<SportCourse> getSportCourseByID(long id)
    {
        return sportCourseRepository.findById(id);
    }

    @Override
    public List<SportCourse> getSportCoursesByType(String type)
    {
        return sportCourseRepository.findByType(type);
    }

    @Override
    public List<SportCourse> getSportCourseByLocation(long sportCenterID)
    {
        List<SportCenter> sportCenter = sportCenterRepository.findById(sportCenterID);
        if (sportCenter == null)
            return null;
        return sportCourseRepository.findByLocation(sportCenter.get(0));
    }

    @Override
    public SportCourse saveSportCourse(SportCourse course, long sportCenterID, List<Long> participantsID, List<Long> instructorsID)
    {
        List<GymMember> participants = new ArrayList<GymMember>();
        List<GymStaff> instructors = new ArrayList<GymStaff>();
        for (int i= 0; i < participantsID.size(); i++)
        {
            List<GymMember> checkList = gymMemberRepository.findById(participantsID.get(i).longValue());
            if(checkList != null)
            {
                participants.add(checkList.get(0));
            }

        }

        for (int i= 0; i < instructorsID.size(); i++)
        {
            List<GymStaff> checkList = gymStaffRepository.findById(instructorsID.get(i).longValue());
            if(checkList != null)
            {
                instructors.add(checkList.get(0));
            }

        }
        List<SportCenter> sportCenter = sportCenterRepository.findById(sportCenterID);
        if (sportCenter == null)
            System.out.println("There is a problem with the SportCenter ID that is sent.");
        else
        {
            course.setLocation(sportCenter.get(0));
        }
        course.setParticipants(participants);
        course.setInstructors(instructors);
        return sportCourseRepository.save(course);
    }

    @Override
    public SportCourse deleteSportCourseByID(long id)
    {
        return sportCourseRepository.deleteById(id);
    }

    @Override
    public SportCourse patchCourse(SportCourse editedSportCourse, long oldSportCourseID)
    {
        List<SportCourse> sportCourses = sportCourseRepository.findById(oldSportCourseID);
        if(sportCourses == null)
        {
            return null;
        }
        else
        {
            SportCourse oldCourse = sportCourses.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedSportCourse);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedSportCourse, oldCourse, ignoredProperties);
            sportCourseRepository.save(oldCourse);
            return oldCourse;
        }
    }

    @Override
    public SportCourse addParticipant(long courseID, long participantID)
    {
        List<SportCourse> sportCourses = sportCourseRepository.findById(courseID);
        List<GymMember> gymMembers = gymMemberRepository.findById(participantID);
        if(sportCourses == null ||gymMembers == null)
        {
            return null;
        }
        else
        {
            SportCourse course = sportCourses.get(0);
            GymMember participant = gymMembers.get(0);
            List<GymMember> participants = course.getParticipants();
            for(int i=0; i < participants.size(); i++)
            {
                if(participants.get(i).getID() == participantID)
                {
                    return course;
                }
            }
            participants.add(participant);
            course.setParticipants(participants);
            return patchCourse(course, courseID);
        }
    }

    @Override
    public SportCourse removeParticipant(long courseID, long participantID)
    {
        List<SportCourse> sportCourses = sportCourseRepository.findById(courseID);
        if(sportCourses == null)
        {
            return null;
        }
        SportCourse course = sportCourses.get(0);
        List<GymMember> participants = course.getParticipants();
        if (participants == null)
            return null;

        for (int i = 0; i < participants.size(); i++)
        {
            if(participants.get(i).getID() == participantID)
            {
                participants.remove(i);
            }
        }
        return patchCourse(course, courseID);
    }

    @Override
    public SportCourse addInstructor(long courseID, long instructorID)
    {
        List<SportCourse> sportCourses = sportCourseRepository.findById(courseID);
        List<GymStaff> gymStaffs = gymStaffRepository.findById(instructorID);
        if(sportCourses == null ||gymStaffs == null)
        {
            return null;
        }
        else
        {
            SportCourse course = sportCourses.get(0);
            GymStaff instructor = gymStaffs.get(0);
            List<GymStaff> insturctors = course.getInstructors();
            for(int i=0; i < insturctors.size(); i++)
            {
                if(insturctors.get(i).getID() == instructorID)
                {
                    return course;
                }
            }
            insturctors.add(instructor);
            course.setInstructors(insturctors);
            return patchCourse(course, courseID);
        }
    }

    @Override
    public SportCourse removeInstructor(long courseID, long instructorID)
    {
        List<SportCourse> sportCourses = sportCourseRepository.findById(courseID);
        if(sportCourses == null)
        {
            return null;
        }
        SportCourse course = sportCourses.get(0);
        List<GymStaff> instructors = course.getInstructors();
        if (instructors == null)
            return null;

        for (int i = 0; i < instructors.size(); i++)
        {
            if(instructors.get(i).getID() == instructorID)
            {
                instructors.remove(i);
            }
        }
        return patchCourse(course, courseID);
    }
}

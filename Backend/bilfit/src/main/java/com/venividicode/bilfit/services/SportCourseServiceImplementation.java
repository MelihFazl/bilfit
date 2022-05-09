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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SportCourseServiceImplementation implements SportCourseService
{
    @Autowired
    SportCourseRepository sportCourseRepository;
    @Autowired
    SportCenterRepository sportCenterRepository;
    @Autowired
    GymMemberRepository gymMemberRepository;

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
    public List<SportCourse> getSportCoursesByParticipants(long id)
    {
        List<GymMember> gymMembers = gymMemberRepository.findById(id);
        if(gymMembers == null)
        {
            return null;
        }
        else
        return sportCourseRepository.findByParticipants(gymMembers.get(0));
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
    public String saveSportCourse(SportCourse course, long sportCenterID, List<String> courseDays)
    {
        List<GymMember> participants = new ArrayList<GymMember>();
        List<SportCenter> sportCenter = sportCenterRepository.findById(sportCenterID);
        if (sportCenter == null)
            return"There is a problem with the SportCenter ID that is sent.";
        else
        {
            course.setLocation(sportCenter.get(0));
        }
        course.setParticipants(participants);
        Set<String> courseDaysMap = new HashSet<>();
        for (int i = 0; i < courseDays.size(); i++)
            courseDaysMap.add(courseDays.get(i));
        course.setCourseDays(courseDaysMap);
        course.setAvailableQuota(course.getMaxQuota());
        sportCourseRepository.save(course);
        return "New course has been successfully added.";
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
    public String addParticipant(long courseID, long participantID)
    {
        List<SportCourse> sportCourses = sportCourseRepository.findById(courseID);
        List<GymMember> gymMembers = gymMemberRepository.findById(participantID);
        if(sportCourses == null ||gymMembers == null)
        {
                return "Participant ID or Course ID is wrong.";
        }
        else
        {
            SportCourse course = sportCourses.get(0);
            if (course.getAvailableQuota() == 0)
                return "The quota for this course is full!";
            GymMember participant = gymMembers.get(0);
            List<GymMember> participants = course.getParticipants();
            for(int i=0; i < participants.size(); i++)
            {
                if(participants.get(i).getID() == participantID)
                {
                    return "You have already enrolled to this course.";
                }
            }
            participants.add(participant);
            course.setParticipants(participants);
            course.setAvailableQuota(course.getAvailableQuota()-1);
            patchCourse(course, courseID);
            return "You are successfully enrolled to this course";
        }
    }

    @Override
    public String removeParticipant(long courseID, long participantID)
    {
        List<SportCourse> sportCourses = sportCourseRepository.findById(courseID);
        if(sportCourses == null)
        {
            return "There is a problem related to Course ID";
        }
        SportCourse course = sportCourses.get(0);
        List<GymMember> participants = course.getParticipants();
        if (participants == null)
            return "There is a problem related to participant ID";

        for (int i = 0; i < participants.size(); i++)
        {
            if(participants.get(i).getID() == participantID)
            {
                participants.remove(i);
                course.setAvailableQuota(course.getAvailableQuota()+1);
            }
        }
        patchCourse(course, courseID);
        return "Done";
    }
}

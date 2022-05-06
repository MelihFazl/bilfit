package com.venividicode.bilfit.services;

import com.venividicode.bilfit.helpers.IgnoredPropertyCreator;
import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.FieldRepository;
import com.venividicode.bilfit.repositories.GymMemberRepository;
import com.venividicode.bilfit.repositories.TournamentRegistrationRepository;
import com.venividicode.bilfit.repositories.TournamentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TournamentServiceImplementation implements TournamentService
{
    @Autowired
    TournamentRepository tournamentRepository;
    @Autowired
    FieldRepository fieldRepository;
    @Autowired
    TournamentRegistrationRepository registrationRepository;
    @Autowired
    GymMemberRepository gymMemberRepository;

    private IgnoredPropertyCreator ignoredPropertyCreator;

    //Tournament
    @Override
    public Tournament saveTournament(Tournament tournament, List<Long> fieldID)
    {
        List<Field> fields = new ArrayList<Field>();
        for (int i= 0; i < fieldID.size(); i++)
        {
            List<Field> checkList = fieldRepository.findById(fieldID.get(i).longValue());
            if (checkList != null)
            {
                fields.add(checkList.get(0));
            }
        }
        tournament.setFields(fields);
        return tournamentRepository.save(tournament);
    }

    @Override
    public Tournament deleteTournamentByID(long id)
    {
        return tournamentRepository.deleteById(id);
    }

    @Override
    public List<Tournament> getAllTournaments()
    {
        return tournamentRepository.findAll();
    }

    @Override
    public List<Tournament> getTournamentByID(long id)
    {
        return tournamentRepository.findById(id);
    }

    @Override
    public List<Tournament> getTournamentByName(String name)
    {
        return tournamentRepository.findByName(name);
    }

    @Override
    public Tournament patchTournament(Tournament editedTournament, long oldTournamentID)
    {
        List<Tournament> tournaments = tournamentRepository.findById(oldTournamentID);
        if(tournaments == null)
        {
            return null;
        }
        else
        {
            Tournament oldTournament = tournaments.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedTournament);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedTournament, oldTournament, ignoredProperties);
            tournamentRepository.save(oldTournament);
            return oldTournament;
        }
    }

    //TournamentRegistration
    @Override
    public TournamentRegistration saveTournamentRegistration(TournamentRegistration registration, long tournamentID, List<Long> teamID)
    {
        List<Tournament> tournamentCheck = tournamentRepository.findById(tournamentID);
        if(tournamentCheck == null)
        {
            System.out.println("Tournament with given ID is not found.");
            return null;
        }

        Tournament tournament = tournamentCheck.get(0);

        if (tournament.getDeadline().isBefore(LocalDateTime.now()))
        {
            System.out.println("Registration deadline has passed for this tournament.");
            return null;
        }

        if (tournament.getMaxNumberOfTeamMembers() != teamID.size())
        {
            System.out.println("There is a problem with the team members number!!");
            return null;
        }

        List<GymMember> gymMembers = new ArrayList<GymMember>();
        for (int i = 0; i < teamID.size(); i++)
        {
            if (gymMemberRepository.findById(teamID.get(i).longValue()) == null)
                continue;
            gymMembers.add(gymMemberRepository.findById(teamID.get(i).longValue()).get(0));
        }
        if (tournament.getMaxNumberOfTeamMembers() > gymMembers.size())
        {
            System.out.println("Some members with given ID's did not found.");
            return null;
        }

        registration.setTeamMembersID(teamID);
        List<TournamentRegistration> registrations = tournament.getRegistrations();
        registrations.add(registration);
        tournament.setRegistrations(registrations);
        if (registrations.size() > tournament.getMaxTeams())
        {
            System.out.println("The quota is full for the tournament.");
            return null;
        }
        registrationRepository.save(registration);
        tournamentRepository.save(tournament);
        return registration;
    }

    @Override
    public TournamentRegistration deleteTournamentRegistrationByID(long id, long tournamentID)
    {
        List<Tournament> data = tournamentRepository.findById(tournamentID);
        if(data == null)
        {
            System.out.println("Tournament ID is wrong!");
            return null;
        }
        Tournament tournament = data.get(0);
        List<TournamentRegistration> registrations = tournament.getRegistrations();
        for (int i = 0; i < registrations.size(); i++)
        {
            if (registrations.get(i).getID() == id)
            {
                registrations.remove(i);
                break;
            }
        }
        tournament.setRegistrations(registrations);
        tournamentRepository.save(tournament);
        return registrationRepository.deleteById(id);
    }

    @Override
    public List<TournamentRegistration> getAllTournamentRegistrations()
    {
        return registrationRepository.findAll();
    }

    @Override
    public List<TournamentRegistration> getTournamentRegistrationByID(long id)
    {
        return registrationRepository.findById(id);
    }

    @Override
    public List<TournamentRegistration> getTournamentRegistrationByRegisterer(long registererID)
    {
        List<TournamentRegistration> checklist = registrationRepository.findAll();
        List<TournamentRegistration> result = new ArrayList<TournamentRegistration>();
        for(int i = 0; i < checklist.size(); i++)
        {
            if (registererID == checklist.get(i).getRegisterer().getID())
                result. add(checklist.get(i));
        }
        return result;
    }

}

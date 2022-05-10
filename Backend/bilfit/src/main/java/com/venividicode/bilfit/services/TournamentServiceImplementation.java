package com.venividicode.bilfit.services;

import com.venividicode.bilfit.helpers.IgnoredPropertyCreator;
import com.venividicode.bilfit.models.*;
import com.venividicode.bilfit.repositories.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    @Autowired
    SportCenterRepository sportCenterRepository;

    private IgnoredPropertyCreator ignoredPropertyCreator;

    //Tournament
    @Override
    public Tournament saveTournament(Tournament tournament, long sportCenterID)
    {
        List<SportCenter> sportCenters = sportCenterRepository.findById(sportCenterID);
        if (sportCenters == null)
            return null;
        tournament.setSportCenter(sportCenters.get(0));
        return tournamentRepository.save(tournament);
    }

    @Override
    public Tournament deleteTournamentByID(long id)
    {
        List<TournamentRegistration> registrations = registrationRepository.findAll();
        for(int i = 0; i < registrations.size(); i++)
        {
            if(registrations.get(i).getTournament().getID() == id)
            {
                registrationRepository.deleteById(registrations.get(i).getID());
            }
        }
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
    public List<Tournament> getTournamentByTeamMember( long memberID )
    {
        List<TournamentRegistration> memberRegistered = getTournamentRegistrationByMemberID(memberID);
        List<Tournament> result = new ArrayList<Tournament>();
        for (int i = 0; i < memberRegistered.size(); i++)
        {
            result.add(memberRegistered.get(i).getTournament());
        }
        return result;
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
    public String saveTournamentRegistration(TournamentRegistration registration, long tournamentID, List<Long> teamID)
    {
        List<Tournament> tournamentCheck = tournamentRepository.findById(tournamentID);
        if(tournamentCheck == null)
        {
            return "Tournament with given ID is not found.";
        }

        Tournament tournament = tournamentCheck.get(0);

        if (tournament.getDeadline().isBefore(LocalDate.now()))
        {
            return "Registration deadline has passed for this tournament.";
        }

        if (tournament.getMaxNumberOfTeamMembers() != teamID.size())
        {
            return "There is a problem with the team members number!!";
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
            return "Some members with given ID's did not found.";
        }

        for (int i = 0; i < gymMembers.size(); i++)
        {
            List<TournamentRegistration> checklist = getTournamentRegistrationByMemberID(gymMembers.get(i).getID());
            if ( checklist != null )
            {
                for (int j = 0; j < checklist.size(); j++)
                {
                    if (checklist.get(j).getTournament().getID() == tournamentID)
                        return "The member with ID " + gymMembers.get(i).getID() + " is already enrolled to this tournament";
                }
            }
        }
        if (tournament.getMaxTeams() < tournament.getNumberOfRegistrations())
        {
            return "The quota is full for the tournament.";
        }
        tournament.setNumberOfRegistrations(tournament.getNumberOfRegistrations()+1);
        registration.setTournament(tournament);
        registration.setTeamMembers(gymMembers);
        registrationRepository.save(registration);
        tournamentRepository.save(tournament);
        return "Your registration has added to the tournament.";
    }

    @Override
    public TournamentRegistration deleteTournamentRegistrationByID(long id, long tournamentID)
    {
        List<TournamentRegistration> data = registrationRepository.findById(id);
        if(data == null)
        {
            System.out.println("Tournament Registration ID is wrong!");
            return null;
        }
        Tournament tournament = data.get(0).getTournament();
        tournament.setNumberOfRegistrations(tournament.getNumberOfRegistrations()-1);
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
    public List<TournamentRegistration> getTournamentRegistrationByMemberID(long memberID)
    {
        List<GymMember> checklist = gymMemberRepository.findById(memberID);
        if(checklist == null)
            return null;
        return registrationRepository.findByTeamMembers(checklist.get(0));
    }

}

package com.venividicode.bilfit.services;

import com.venividicode.bilfit.helpers.IgnoredPropertyCreator;
import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.models.Tournament;
import com.venividicode.bilfit.repositories.FieldRepository;
import com.venividicode.bilfit.repositories.TournamentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TournamentServiceImplementation implements TournamentService
{
    @Autowired
    TournamentRepository tournamentRepository;
    @Autowired
    FieldRepository fieldRepository;

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
    public Tournament deleteSportCourseByID(long id)
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


}

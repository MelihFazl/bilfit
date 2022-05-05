package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.models.Tournament;

import java.util.List;

public interface TournamentService
{
    public Tournament saveTournament(Tournament tournament, List<Long> fieldID);
    public Tournament deleteSportCourseByID(long id);
    public List<Tournament> getAllTournaments();
    public List<Tournament> getTournamentByID(long id);
    public List<Tournament> getTournamentByName(String name);
    public Tournament patchTournament(Tournament editedTournament, long oldTournamentID);
}

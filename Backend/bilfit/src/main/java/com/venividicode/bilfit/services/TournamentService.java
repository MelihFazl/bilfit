package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.GymMember;
import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.models.Tournament;
import com.venividicode.bilfit.models.TournamentRegistration;

import java.util.List;

public interface TournamentService
{
    //Tournament
    public Tournament saveTournament(Tournament tournament, List<Long> fieldID);
    public Tournament deleteTournamentByID(long id);
    public List<Tournament> getAllTournaments();
    public List<Tournament> getTournamentByID(long id);
    public List<Tournament> getTournamentByName(String name);
    public Tournament patchTournament(Tournament editedTournament, long oldTournamentID);
    //TournamentRegistration
    public TournamentRegistration saveTournamentRegistration(TournamentRegistration registration, long tournamentID, List<Long> teamID);
    public TournamentRegistration deleteTournamentRegistrationByID(long id, long tournamentID);
    public List<TournamentRegistration> getAllTournamentRegistrations();
    public List<TournamentRegistration> getTournamentRegistrationByID(long id);
    public List<TournamentRegistration> getTournamentRegistrationByRegisterer(long registererID);
    //public TournamentRegistration patchTournamentRegistration(TournamentRegistration editedRegistration, long oldRegistrationID); are we going to need it?
}

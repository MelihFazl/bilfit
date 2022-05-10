package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.models.Tournament;
import com.venividicode.bilfit.models.TournamentRegistration;
import com.venividicode.bilfit.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * A controller class for handling requests related
 * to Tournament model
 * @author Veni Vidi Code
 */
@RestController
@RequestMapping("/tournaments")
@CrossOrigin
public class TournamentController
{
    @Autowired
    TournamentService tournamentService;

    //Tournament

    /**
     * Post method saving a new Tournament entity to the database
     * @param tournament Tournament that is to be saved
     * @param fieldID id of the Field that this Tournament will be carried out in
     * @return String indicating success or failure
     */
    @PostMapping("/add")
    public String saveTournament(@RequestBody Tournament tournament, @RequestParam(value="sportCenterID") long sportCenterID)
    {
        try
        {
            tournamentService.saveTournament(tournament,sportCenterID);
            return "Tournament with name " + tournament.getName() + " has been added.";
        } catch (Exception e)
        {
            return "Something has gone wrong: " + e.toString() ;
        }
    }

    /**
     * Delete method used to delete a Tournament from the database
     * @param id id of the Tournament that is to be deleted
     * @return String indicating success or fail
     */
    @DeleteMapping("/delete/{id}")
    public String deleteTournament(@PathVariable("id") long id)
    {
        List<Tournament> tournamentsWithSpecifiedID = tournamentService.getTournamentByID(id);
        if (tournamentsWithSpecifiedID == null) {
            return "Tournament with specified ID " + id + " was not found.";
        }
        tournamentService.deleteTournamentByID(id);
        return "Tournament with specified ID " + id + " has been successfully deleted.";
    }

    @GetMapping("/teamMember/{id}")
    public List<Tournament> getTournamentByTeamMember(@PathVariable("id") long id)
    {
        return tournamentService.getTournamentByTeamMember(id);
    }
  
    @GetMapping
    public List<Tournament> getAllTournaments()
    {
        return tournamentService.getAllTournaments();
    }

    /**
     * Get method returns Tournament by specified id
     * @param id id of the Tournament that is to be returned
     * @return list of all the Tournaments with specified id (only one)
     */
    @GetMapping("/{id}")
    public List<Tournament> getTournamentByID(@PathVariable("id") long id)
    {
        return tournamentService.getTournamentByID(id);
    }

    /**
     * Get method returns all the tournament with specified name
     * @param name name of the tournament
     * @return list of all the tournaments with specified id
     */
    @GetMapping("/name/{name}")
    public List<Tournament> getTournamentByID(@PathVariable("name") String name)
    {
        return tournamentService.getTournamentByName(name);
    }

    /**
     * Post method used to edit Tournament
     * @param editedTournament the edited Tournament object
     * @param tournamentID id of the tournament that is to be edited
     * @return String indicating success or failure
     */
    @PostMapping("/edit/{id}")
    public String editTournamentWithID(@RequestBody Tournament editedTournament, @PathVariable("id") long tournamentID)
    {
        List<Tournament> tournaments = tournamentService.getTournamentByID(tournamentID);
        if(tournaments ==  null)
            return "There is no SportCourse with ID " + tournaments;
        Tournament oldTournament = tournaments.get(0);
        System.out.println(oldTournament.getID());
        try{
            tournamentService.patchTournament(editedTournament, oldTournament.getID());
            return  "Tournament with ID " + tournamentID + " was successfully edited.";
        }
        catch (Exception e)
        {
            System.out.println(e.toString());
            return "An error occurred.";
        }
    }

    //TournamentRegistration

    /**
     * Post method used for Tournament registration
     * @param tournamentRegistration
     * @param tournamentID id of the Tournament Registration
     * @param teamID id of the team
     * @return String indicating success or fail
     */
    @PostMapping("/{tournamentID}/registration/add")
    public String saveTournamentRegistration(@RequestBody TournamentRegistration tournamentRegistration,@PathVariable("tournamentID") long tournamentID, @RequestParam(value="teamID") List<Long> teamID)
    {
        try
        {
            return tournamentService.saveTournamentRegistration(tournamentRegistration, tournamentID, teamID);
        } catch (Exception e)
        {
        return "Something has gone wrong: " + e.toString() ;
        }
    }

    /**
     * Delete method used to delete a Tournament Registration
     * @param id id of the Tournament Registration
     * @param tournamentID id of the Tournament
     * @return String indicating success or failure
     */
    @DeleteMapping("/{tournamentID}/registration/delete/{id}")
    public String deleteTournamentRegistration(@PathVariable("id") long id, @PathVariable("tournamentID") long tournamentID)
    {
        List<TournamentRegistration> tournamentRegistrationsWithSpecifiedID = tournamentService.getTournamentRegistrationByID(id);
        if (tournamentRegistrationsWithSpecifiedID == null) {
            return "TournamentRegistration with specified ID " + id + " was not found.";
        }
        tournamentService.deleteTournamentRegistrationByID(id, tournamentID);
        return "TournamentRegistration with specified ID " + id + " has been successfully deleted.";
    }

    /**
     * Get method used to get all the Tournament Registrations
     * @return list of all the Tournament Registrations
     */
    @GetMapping("/registration")
    public List<TournamentRegistration> getAllTournamentRegistrations()
    {
        return tournamentService.getAllTournamentRegistrations();
    }

    /**
     * Get method for returning Tournament Registrations with specified id
     * @param id id of the Tournament Registration
     * @return list of all the Tournament Registrations with specified id (length one)
     */
    @GetMapping("/registration/{id}")
    public List<TournamentRegistration> getTournamentRegistrationByID(@PathVariable("id") long id)
    {
        return tournamentService.getTournamentRegistrationByID(id);
    }

    @GetMapping("/registration/teamMember/{id}")
    public List<TournamentRegistration> getTournamentRegistrationByTeamMember(@PathVariable("id") long id)

    {
        return tournamentService.getTournamentRegistrationByMemberID(id);
    }
}

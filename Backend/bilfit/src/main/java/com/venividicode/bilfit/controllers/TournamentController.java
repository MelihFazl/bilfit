package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.SportCourse;
import com.venividicode.bilfit.models.Tournament;
import com.venividicode.bilfit.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tournaments")
@CrossOrigin
public class TournamentController
{
    @Autowired
    TournamentService tournamentService;

    @PostMapping("/add")
    public String saveTournament(@RequestBody Tournament tournament, @RequestParam(value="field") List<Long> fieldID)
    {
        try
        {
            tournamentService.saveTournament(tournament, fieldID);
            return "Tournament with name " + tournament.getName() + " has been added.";
        } catch (Exception e)
        {
            return "Something has gone wrong: " + e.toString() ;
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTournament(@PathVariable("id") long id)
    {
        List<Tournament> tournamentsWithSpecifiedID = tournamentService.getTournamentByID(id);
        if (tournamentsWithSpecifiedID == null) {
            return "Tournament with specified ID " + id + " was not found.";
        }
        tournamentService.deleteSportCourseByID(id);
        return "Tournament with specified ID " + id + " has been successfully deleted.";
    }

    @GetMapping
    public List<Tournament> getAllTournaments()
    {
        return tournamentService.getAllTournaments();
    }

    @GetMapping("/{id}")
    public List<Tournament> getTournamentByID(@PathVariable("id") long id)
    {
        return tournamentService.getTournamentByID(id);
    }

    @GetMapping("/name/{name}")
    public List<Tournament> getTournamentByID(@PathVariable("name") String name)
    {
        return tournamentService.getTournamentByName(name);
    }

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
}

package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.Admin;
import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.services.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/announcement")
@CrossOrigin
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    /**
     * 	private long ID;
     * 	private String title;
     * 	private String description;
     * 	private LocalDateTime date;
     */

    @PostMapping("/make")
    public String makeAnnouncement(@RequestBody Announcement announcement) {
        System.out.println(announcement.getDate());
        announcement.setDate(LocalDateTime.now());
        announcementService.saveAnnouncement(announcement);
        return "Announcement with title \"" + announcement.getTitle()
                + "\" has been successfully added.";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAnnouncement(@PathVariable("id") long id) {
        List<Announcement> announcementsWithSpecifiedID = announcementService.getAnnouncementByID(id);
        if (announcementsWithSpecifiedID == null)
            return "Announcement with specified ID " + id + " was not found.";
        announcementService.deleteAnnouncementByID(id);
        return "Announcement with specified ID " + id + " has been successfully deleted.";
    }

    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    @GetMapping("/{id}")
    public Announcement getAnnouncementWithID(@PathVariable("id") long id) {

        List<Announcement> announcementsWithSpecifedID = announcementService.getAnnouncementByID(id);

        if (announcementsWithSpecifedID == null) {
            return null;
        }

        return announcementsWithSpecifedID.get(0);

    }





}

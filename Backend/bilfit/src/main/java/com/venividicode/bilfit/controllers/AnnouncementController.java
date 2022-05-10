package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.models.Admin;
import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.services.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * A controller class for handling requests related
 * to Announcement model
 * @author Veni Vidi Code
 */

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

    /**
     * Post method adds announcement to the database
     * @param announcement Announcement entity that is to be saved into the database
     * @return String indicates success or fail
     */
    @PostMapping("/make")
    public String makeAnnouncement(@RequestBody Announcement announcement) {
        announcement.setDate(LocalDateTime.now());
        announcementService.saveAnnouncement(announcement);
        return "Announcement with title \"" + announcement.getTitle()
                + "\" has been successfully added.";
    }

    /**
     * Delete request used to delete announcement from the database
     * @param id id of the Announcement
     * @return String indicating success or fail
     */
    @DeleteMapping("/delete/{id}")
    public String deleteAnnouncement(@PathVariable("id") long id) {
        List<Announcement> announcementsWithSpecifiedID = announcementService.getAnnouncementByID(id);
        if (announcementsWithSpecifiedID == null)
            return "Announcement with specified ID " + id + " was not found.";
        announcementService.deleteAnnouncementByID(id);
        return "Announcement with specified ID " + id + " has been successfully deleted.";
    }

    /**
     * Get request returns all the Announcement objects
     * @return List<Announcement> list of all the announcements
     */
    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    /**
     * Get method returns the Announcement object specified by its id
     * @param id id of the Announcement
     * @return Announcement entity returned from the database
     */
    @GetMapping("/{id}")
    public Announcement getAnnouncementWithID(@PathVariable("id") long id) {

        List<Announcement> announcementsWithSpecifiedID = announcementService.getAnnouncementByID(id);

        if (announcementsWithSpecifiedID == null) {
            return null;
        }

        return announcementsWithSpecifiedID.get(0);

    }





}

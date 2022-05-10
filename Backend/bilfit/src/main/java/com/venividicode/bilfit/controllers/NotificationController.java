package com.venividicode.bilfit.controllers;


import com.venividicode.bilfit.models.Notification;
import com.venividicode.bilfit.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
@CrossOrigin
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    /**
     * 	private long ID;
     *  @ElementCollection(targetClass=Long.class)
     *  private List<Long> targetIDs;
     * 	private String content;
     * 	private String title;
     */
    @PostMapping("/send")
    public String sendNotification(@RequestBody Notification notification) {
        notificationService.saveNotification(notification);
        return "Notification with title \"" + notification.getTitle()
                + "\" has been successfully added.";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteNotification(@PathVariable("id") long id) {
        List<Notification> notificationsWithSpecifiedID = notificationService.getNotificationByID(id);
        if (notificationsWithSpecifiedID == null) {
            return "Notification with specified ID " + id + " was not found.";
        }
        notificationService.deleteNotificationByID(id);
        return "Notification with specified ID " + id + " has been successfully deleted.";
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Notification getNotificationWithID(@PathVariable("id") long id) {

        List<Notification> notificationsWithSpecifiedID = notificationService.getNotificationByID(id);

        if (notificationsWithSpecifiedID == null) {
            return null;
        }
        return notificationsWithSpecifiedID.get(0);
    }

    // below is TODO
    @PostMapping("/{id}")
    public String notifyWithID(@PathVariable("id") long id) {

        List<Notification> notificationsWithSpecifiedID = notificationService.getNotificationByID(id);

        return "this is TODO";

    }




}

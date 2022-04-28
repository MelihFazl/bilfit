package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Notification;

import java.util.List;

public interface NotificationService {




    public List<Notification> getAllNotifications();
    public List<Notification> getNotificationByID(long id);
    public List<Notification> getNotificationsByTitle(String title);
    public Notification saveNotification(Notification notification);

    // made return Announcement rather than boolean
    public Notification deleteNotificationByID(long id);
}

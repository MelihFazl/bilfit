package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Notification;
import com.venividicode.bilfit.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class NotificationServiceImplementation implements NotificationService{

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public List<Notification> getNotificationByID(long id) {
        return notificationRepository.findById(id);
    }

    @Override
    public List<Notification> getNotificationsByTitle(String title) {
        return notificationRepository.findByTitle(title);
    }

    @Override
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification deleteNotificationByID(long id) {
        return notificationRepository.deleteById(id);
    }
}

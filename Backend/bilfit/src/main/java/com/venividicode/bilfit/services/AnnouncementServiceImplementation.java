package com.venividicode.bilfit.services;


import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.repositories.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementServiceImplementation implements AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Override
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    @Override
    public List<Announcement> getAnnouncementByID(long id) {
        return announcementRepository.findById(id);
    }

    @Override
    public List<Announcement> getAnnouncementsByTitle(String title) {
        return announcementRepository.findByTitle(title);
    }

    @Override
    public Announcement saveAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    @Override
    public Announcement deleteAnnouncementByID(long id) {
        return announcementRepository.deleteById(id);
    }
}

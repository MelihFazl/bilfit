package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Announcement;

import java.util.List;

public interface AnnouncementService {

    public List<Announcement> getAllAnnouncements();
    public List<Announcement> getAnnouncementByID(long id);
    public List<Announcement> getAnnouncementsByTitle(String title);
    public Announcement saveAnnouncement(Announcement announcement);

    // made return Announcement rather than boolean
    public Announcement deleteAnnouncementByID(long id);


}

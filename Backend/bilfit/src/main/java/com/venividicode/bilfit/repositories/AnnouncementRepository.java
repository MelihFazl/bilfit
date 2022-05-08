package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * AnnouncementRepository to access the database and do
 * operations related to Announcement object
 * @author Veni Vidi Code
 */
@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    public List<Announcement> findById(long id);
    public Announcement deleteById(long id);
    public List<Announcement> findByTitle(String title);




}

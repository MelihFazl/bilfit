package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    //TODO
}

package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    //TODO
}

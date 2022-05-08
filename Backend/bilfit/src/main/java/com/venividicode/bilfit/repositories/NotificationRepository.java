package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * NotificationRepository to access the database and do
 * operations related to Notification object
 * @author Veni Vidi Code
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {


    public List<Notification> findById(long id);
    public Notification deleteById(long id);
    public List<Notification> findByTitle(String title);
}

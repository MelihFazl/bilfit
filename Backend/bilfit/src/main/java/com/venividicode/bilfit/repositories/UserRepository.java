package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //TODO
}


package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * UserRepository to access the database and do
 * operations related to User object
 * @author Veni Vidi Code
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /*
    public List<User> findByID(long userID);
    public List<User> findByName(String name);
    public User deleteByID(long userID);
     */
    //Throws error since User is not an entity. It is a MappedSuperClass. Examine this later.

}


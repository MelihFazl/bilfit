package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>
{
    //TODO
}

package com.venividicode.bilfit.repositories;
import com.venividicode.bilfit.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * AdminRepository to access the database and do
 * operations related to Admin object
 * @author Veni Vidi Code
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>
{
    public List<Admin> findById(long id);
    public Admin deleteById(long id);
}

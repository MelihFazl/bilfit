package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.Announcement;
import com.venividicode.bilfit.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long>
{
    public List<Token> findById(long id);
}

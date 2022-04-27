package com.venividicode.bilfit.repositories;

import com.venividicode.bilfit.models.GymMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymMemberRepository extends JpaRepository<GymMember, Long> {
     //TODO
}

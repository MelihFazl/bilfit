package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Admin;
import com.venividicode.bilfit.repositories.AdminRepository;
import com.venividicode.bilfit.security.AdminDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDetailsServiceImplementation implements UserDetailsService
{
    private AdminRepository adminRepo;

    public AdminDetailsServiceImplementation(AdminRepository adminRepo)
    {
        this.adminRepo = adminRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        List<Admin> checkList = adminRepo.findById(Long.parseLong(username));
        if(checkList != null)
        {
            Admin admin = checkList.get(0);
            return AdminDetails.create(admin);
        }
        return null;
    }
}

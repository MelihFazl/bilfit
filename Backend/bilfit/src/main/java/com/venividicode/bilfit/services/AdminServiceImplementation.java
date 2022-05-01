package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Admin;
import com.venividicode.bilfit.models.Token;
import com.venividicode.bilfit.repositories.AdminRepository;
import com.venividicode.bilfit.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminServiceImplementation implements AdminService
{
    @Autowired
    private AdminRepository adminRepository;


    @Override
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public List<Admin> getAdminByID(long adminID) {
        return adminRepository.findById(adminID);
    }

    @Override
    public Admin patchAdmin(Admin admin) {
       return adminRepository.save(admin);
    }

    @Override
    public Admin deleteAdminByID(long adminID)
    {
        return adminRepository.deleteById(adminID);
    }
}

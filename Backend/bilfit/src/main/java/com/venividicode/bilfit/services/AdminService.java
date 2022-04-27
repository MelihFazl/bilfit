package com.venividicode.bilfit.services;


import com.venividicode.bilfit.models.Admin;

import java.util.List;

public interface AdminService {
    public Admin saveAdmin(Admin admin);
    public List<Admin> getAllAdmins();
    public List<Admin> getAdminByID(long adminID);
    public Admin patchAdmin(Admin admin);
    public Admin deleteAdminByID(long adminID);
}


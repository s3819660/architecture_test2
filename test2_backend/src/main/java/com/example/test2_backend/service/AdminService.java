package com.example.test2_backend.service;

import com.example.test2_backend.model.Admin;
import com.example.test2_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;
    
    public Admin createAdmin(Admin employee) {
        return adminRepository.save(employee);
    }

    public Admin updateAdmin(Admin employee) {
        return adminRepository.save(employee);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Page<Admin> getAllAdminsPage(int page, int size) {
        return adminRepository.findAll(PageRequest.of(page, size));
    }

    public Admin getAdminById(long id) {
        try {
            return adminRepository.findById(id).get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String deleteAdmin(long id) {
        try {
            adminRepository.deleteById(id);
            return "Successfully deleted admin";
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail to delete admin";
        }
    }
}

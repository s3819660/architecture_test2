package com.example.test2_backend.service;

import com.example.test2_backend.model.Admin;
import com.example.test2_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Random;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;

//    private final String ADMIN_CACHE = "ADMIN";

//    @Autowired
//    RedisTemplate<String , Object> redisTemplate;
//    private HashOperations<String, Long, Admin> hashOperations;
//
//    @PostConstruct
//    private void initializeHashOperations(){
//        hashOperations = redisTemplate.opsForHash();
//    }
//
//    public void saveToCache(Admin admin) {
//        hashOperations.put(ADMIN_CACHE, admin.getId(), admin);
//    }

    public Admin signUp(String phone, String name) {
        // if not unique, return null
        if (!isPhoneUnique(phone))
            return null;

        Admin admin = new Admin(name, phone, randomOTP());
        return adminRepository.save(admin);
    }

    private boolean isPhoneUnique(String phone) {
        if (adminRepository.findAllByPhone(phone) != null) {
            return false;
        }

        return true;
    }

    public Admin logIn(String phone, String pin) {
        Admin admin = adminRepository.findAllByPhone(phone);

        if (admin.getPin().equals(pin))
            return admin;

        return null;

    }

    private String randomOTP() {
        Random random = new Random();
        // 0 + 1000 => + 8999 + 1000
        return String.valueOf(random.nextInt(9000) + 1000);
    }

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Admin admin) {
//        saveToCache(admin);
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Page<Admin> getAllAdminsPage(int page, int size) {
        return adminRepository.findAll(PageRequest.of(page, size));
    }

    public Admin getAdminById(long id) {
        try {
            // if admin was already stored in cache
//            Admin admin = hashOperations.get(ADMIN_CACHE, id);
//            if (admin != null) return admin;

            // else, get admin from database
            Admin admin = adminRepository.findById(id).get();
//            saveToCache(admin);
            return admin;
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

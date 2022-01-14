package com.example.test2_backend.controller;

import com.example.test2_backend.model.Admin;
import com.example.test2_backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {
    @Autowired
    AdminService adminService;

    @GetMapping(value = "/admins/{page}/{size}")
    public Page<Admin> getAllAdminsPage(@PathVariable int page, @PathVariable int size) {
        return adminService.getAllAdminsPage(page, size);
    }

    @GetMapping(value = "/admins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping(value = "/admin/{id}")
    public Admin getAdminById(@PathVariable int id) {
        return adminService.getAdminById(id);
    }

    @PostMapping(value = "/admin")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @PutMapping(value = "/admin")
    public Admin updateAdmin(@RequestBody Admin admin) {
        return adminService.updateAdmin(admin);
    }

    @DeleteMapping(value = "/admin/{id}")
    public String deleteAdmin(@PathVariable int id) {
        return adminService.deleteAdmin(id);
    }
}

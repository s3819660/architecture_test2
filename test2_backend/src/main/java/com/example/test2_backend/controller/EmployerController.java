package com.example.test2_backend.controller;

import com.example.test2_backend.model.Employer;
import com.example.test2_backend.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployerController {
    @Autowired
    EmployerService employerService;

    @GetMapping(value = "/employers/{page}/{size}")
    public Page<Employer> getAllEmployersPage(@PathVariable int page, @PathVariable int size) {
        return employerService.getAllEmployersPage(page, size);
    }

    @GetMapping(value = "/employers")
    public List<Employer> getAllEmployers() {
        return employerService.getAllEmployers();
    }

    @GetMapping(value = "/employer/{id}")
    public Employer getEmployerById(@PathVariable int id) {
        return employerService.getEmployerById(id);
    }

    @PostMapping(value = "/employer")
    public Employer createEmployer(@RequestBody Employer employer) {
        return employerService.createEmployer(employer);
    }

    @PutMapping(value = "/employer")
    public Employer updateEmployer(@RequestBody Employer employer) {
        return employerService.updateEmployer(employer);
    }

    @DeleteMapping(value = "/employer/{id}")
    public String deleteEmployer(@PathVariable int id) {
        return employerService.deleteEmployer(id);
    }
}

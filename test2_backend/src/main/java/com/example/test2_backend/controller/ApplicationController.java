package com.example.test2_backend.controller;

import com.example.test2_backend.model.Application;
import com.example.test2_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ApplicationController {
    @Autowired
    ApplicationService applicationService;

//    @GetMapping(value = "/employers/{page}/{size}")
//    public Page<Application> getAllEmployersPage(@PathVariable int page, @PathVariable int size) {
//        return applicationService.getAllEmployersPage(page, size);
//    }

    @GetMapping(value = "/applications")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping(value = "/application/{id}")
    public Application getApplicationById(@PathVariable int id) {
        return applicationService.getApplicationById(id);
    }

    @PostMapping(value = "/application")
    public Application createApplication(@RequestBody Application application) {
        return applicationService.createApplication(application);
    }

    @PutMapping(value = "/application")
    public Application updateApplication(@RequestBody Application application) {
        return applicationService.updateApplication(application);
    }

    @DeleteMapping(value = "/application/{id}")
    public String deleteApplication(@PathVariable int id) {
        return applicationService.deleteApplication(id);
    }
}

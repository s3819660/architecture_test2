package com.example.test2_backend.controller;

import com.example.test2_backend.model.Application;
import com.example.test2_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ApplicationController {
    @Autowired
    ApplicationService applicationService;

    @GetMapping(value = "/applications/job={jobId}/des/{page}/{size}")
    public Page<Application> getAllEmployersPage(@PathVariable int jobId, @PathVariable int page, @PathVariable int size) {
        return applicationService.getAllByJobIdOrderByDateAsc(jobId, page, size);
    }

    @GetMapping(value = "/applications/employee={employeeId}/des/{page}/{size}")
    public Page<Application> getAllByEmployeeIdOrderByDateAsc(@PathVariable int employeeId, @PathVariable int page, @PathVariable int size) {
        return applicationService.getAllByEmployeeIdOrderByDateAsc(employeeId, page, size);
    }

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

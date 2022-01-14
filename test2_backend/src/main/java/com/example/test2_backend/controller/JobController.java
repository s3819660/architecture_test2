package com.example.test2_backend.controller;

import com.example.test2_backend.model.Job;
import com.example.test2_backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JobController {
    @Autowired
    JobService jobService;

    @GetMapping(value = "/jobs/{page}/{size}")
    public Page<Job> getAllJobsPage(@PathVariable int page, @PathVariable int size) {
        return jobService.getAllJobsPage(page, size);
    }

    @GetMapping(value = "/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping(value = "/job/{id}")
    public Job getJobById(@PathVariable int id) {
        return jobService.getJobById(id);
    }

    @PostMapping(value = "/job")
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    @PutMapping(value = "/job")
    public Job updateJob(@RequestBody Job job) {
        return jobService.updateJob(job);
    }

    @DeleteMapping(value = "/job/{id}")
    public String deleteJob(@PathVariable int id) {
        return jobService.deleteJob(id);
    }
}

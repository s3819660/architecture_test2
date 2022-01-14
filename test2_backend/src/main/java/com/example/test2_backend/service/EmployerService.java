package com.example.test2_backend.service;

import com.example.test2_backend.model.Employer;
import com.example.test2_backend.repository.EmployerRepository;
import com.example.test2_backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerService {
    @Autowired
    EmployerRepository employerRepository;

    @Autowired
    JobRepository jobRepository;

    public Employer createEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    public Employer updateEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    public Page<Employer> getAllEmployersPage(int page, int size) {
        return employerRepository.findAll(PageRequest.of(page, size));
    }

    public Employer getEmployerById(long id) {
        try {
            return employerRepository.findById(id).get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String deleteEmployer(long id) {
        try {
            // delete all job by this employer
            jobRepository.deleteAll();

            employerRepository.deleteById(id);

            return "Successfully deleted employer and all jobs posted by this employer";
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail to delete employer";
        }
    }
}

package com.example.test2_backend.service;

import com.example.test2_backend.model.Job;
import com.example.test2_backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class JobService {
    @Autowired
    JobRepository jobRepository;

    public Job createJob(Job job) {
        job.setDate(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        return jobRepository.save(job);
    }

    public Job updateJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Page<Job> getAllJobsPage(int page, int size) {
        return jobRepository.findAll(PageRequest.of(page, size));
    }

    public Job getJobById(long id) {
        try {
            return jobRepository.findById(id).get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String deleteJob(long id) {
        try {
            jobRepository.deleteById(id);
            return "Successfully deleted job";
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail to delete job";
        }
    }

    public Page<Job> getJobsByCategoryContainingPageDateAsc(String category, int page, int size) {
        return jobRepository.findAllByCategoryContainingPageDateAsc(category, PageRequest.of(page, size));
    }

    public Page<Job> getJobsByCategoryContainingPageDateDesc(String category, int page, int size) {
        return jobRepository.findAllByCategoryContainingPageDateDes(category, PageRequest.of(page, size));
    }
}

package com.example.test2_backend.service;

import com.example.test2_backend.model.Job;
import com.example.test2_backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class JobService {
    @Autowired
    JobRepository jobRepository;

    private final String JOB_CACHE = "JOB";

//    @Autowired
//    RedisTemplate<String , Object> redisTemplate;
//    private HashOperations<String, Long, Job> hashOperations;
//
//    @PostConstruct
//    private void initializeHashOperations(){
//        hashOperations = redisTemplate.opsForHash();
//    }
//
//    public void saveToCache(Job job) {
//        hashOperations.put(JOB_CACHE, job.getId(), job);
//    }

    public Job createJob(Job job) {
        job.setDate(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        return jobRepository.save(job);
    }

    public Job updateJob(Job job) {
//        saveToCache(job);
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
//            Job job = hashOperations.get(JOB_CACHE, id);
//            if (job != null) return job;

            Job job = jobRepository.findById(id).get();
//            saveToCache(job);
            return job;
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

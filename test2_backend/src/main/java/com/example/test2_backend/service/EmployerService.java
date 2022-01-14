package com.example.test2_backend.service;

import com.example.test2_backend.model.Employer;
import com.example.test2_backend.model.Job;
import com.example.test2_backend.repository.EmployerRepository;
import com.example.test2_backend.repository.JobRepository;
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
public class EmployerService {
    @Autowired
    EmployerRepository employerRepository;

    @Autowired
    JobRepository jobRepository;

    private final String EMPLOYER_CACHE = "EMPLOYER";

//    @Autowired
//    RedisTemplate<String , Object> redisTemplate;
//    private HashOperations<String, Long, Employer> hashOperations;
//
//    @PostConstruct
//    private void initializeHashOperations(){
//        hashOperations = redisTemplate.opsForHash();
//    }
//
//    public void saveToCache(Employer Employer) {
//        hashOperations.put(EMPLOYER_CACHE, Employer.getId(), Employer);
//    }

    public Employer signUp(String name,
                           String phone,
                           String address) {
        // if not unique, return null
        if (!isPhoneUnique(phone)) {
            System.out.println("not unique");
            return null;
        }

        Employer employee = new Employer(name,
                phone,
                randomOTP(),
                address);
        return employerRepository.save(employee);
    }

    private boolean isPhoneUnique(String phone) {
        if (employerRepository.findByPhone(phone) != null) {
            return false;
        }

        return true;
    }

    public Employer logIn(String phone, String pin) {
        Employer employer = employerRepository.findByPhone(phone);

        if (employer.getPin().equals(pin))
            return employer;

        return null;
    }

    private String randomOTP() {
        Random random = new Random();
        // 0 + 1000 => + 8999 + 1000
        return String.valueOf(random.nextInt(9000) + 1000);
    }

    public Employer createEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    public Employer updateEmployer(Employer employer) {
//        saveToCache(employer);
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
//            Employer employer = hashOperations.get(EMPLOYER_CACHE, id);
//            if (employer != null) return employer;

            Employer employer = employerRepository.findById(id).get();
//            saveToCache(employer);
            return employer;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String deleteEmployer(long id) {
        try {
            // delete all job by this employer
            List<Job> jobs = jobRepository.findAllByEmployerId(id);
            for (Job job: jobs) {
                jobRepository.deleteById(job.getId());
            }

            employerRepository.deleteById(id);

            return "Successfully deleted employer and all jobs posted by this employer";
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail to delete employer";
        }
    }
}

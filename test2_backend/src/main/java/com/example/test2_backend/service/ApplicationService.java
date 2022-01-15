package com.example.test2_backend.service;

import com.example.test2_backend.model.Application;
import com.example.test2_backend.repository.ApplicationRepository;
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
public class ApplicationService {
    @Autowired
    ApplicationRepository applicationRepository;

    private final String APPLICATION_CACHE = "APPLICATION";
//    @Autowired
//    RedisTemplate<String , Object> redisTemplate;
//    private HashOperations<String, Long, Application> hashOperations;
//
//    @PostConstruct
//    private void initializeHashOperations(){
//        hashOperations = redisTemplate.opsForHash();
//    }
//
//    public void saveToCache(Application application) {
//        hashOperations.put(APPLICATION_CACHE, application.getId(), application);
//    }

    public Application createApplication(Application application) {
        application.setDate(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        return applicationRepository.save(application);
    }

    public Application updateApplication(Application application) {
//        saveToCache(application);
        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Page<Application> getAllByJobIdOrderByDateAsc(long id, int page, int size) {
        return applicationRepository.findAllByJobIdOrderByDateDesc(id, PageRequest.of(page, size));
    }

    public Page<Application> getAllByEmployeeIdOrderByDateAsc(long id, int page, int size) {
        return applicationRepository.findAllByEmployeeIdOrderByDateDesc(id, PageRequest.of(page, size));
    }

    public Application getApplicationById(long id) {
        try {
//            Application application = hashOperations.get(APPLICATION_CACHE, id);
//            if (application != null) return application;

            Application application = applicationRepository.findById(id).get();
//            saveToCache(application);
            return application;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String deleteApplication(long id) {
        try {
            applicationRepository.deleteById(id);
            return "Successfully deleted application";
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail to delete application";
        }
    }
}

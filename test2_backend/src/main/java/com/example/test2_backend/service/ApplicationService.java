package com.example.test2_backend.service;

import com.example.test2_backend.model.Application;
import com.example.test2_backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ApplicationService {
    @Autowired
    ApplicationRepository applicationRepository;

    public Application createApplication(Application application) {
        application.setDate(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        return applicationRepository.save(application);
    }

    public Application updateApplication(Application application) {
        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

//    public Page<Application> getAllEmployersPage(int page, int size) {
//        return applicationRepository.findAll(PageRequest.of(page, size));
//    }

    public Application getApplicationById(long id) {
        try {
            return applicationRepository.findById(id).get();
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

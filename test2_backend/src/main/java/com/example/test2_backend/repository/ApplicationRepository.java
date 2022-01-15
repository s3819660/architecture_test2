package com.example.test2_backend.repository;

import com.example.test2_backend.model.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    public Page<Application> findAllByJobIdOrderByDateDesc(long id, Pageable pageable);
}

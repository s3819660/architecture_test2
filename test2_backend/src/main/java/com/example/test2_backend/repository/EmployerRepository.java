package com.example.test2_backend.repository;

import com.example.test2_backend.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer, Long> {
    public Employer findByPhone(String phone);
}

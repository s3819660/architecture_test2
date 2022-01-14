package com.example.test2_backend.repository;

import com.example.test2_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//    The criteria for matching is:
//    Job Specialization (Job Category)
//    Location
//    Experience level

    public List<Employee> findAllByCategoryContaining(String category);
    public List<Employee> findAllByAddressContaining(String address);
    public List<Employee> findAllByExperience(int experience);
}

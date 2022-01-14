package com.example.test2_backend.repository;

import com.example.test2_backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
//    The criteria for matching is:
//    Job Specialization (Job Category)
//    Location
//    Experience level

    public List<Job> findAllByCategoryContaining(String category);
    public List<Job> findAllByLocationContaining(String location);
    public List<Job> findAllByCareerLevel(int careerLevel);
    public List<Job> findAllBySalaryMinGreaterThanEqual(double min);
    public List<Job> findAllBySalaryMaxLessThanEqual(double max);
}

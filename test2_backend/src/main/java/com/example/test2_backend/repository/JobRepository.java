package com.example.test2_backend.repository;

import com.example.test2_backend.model.Employer;
import com.example.test2_backend.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    public List<Job> findAllByEmployer(Employer employer);
    public List<Job> findAllByEmployerId(Long employerId);

    @Query("SELECT j FROM Job j WHERE LOWER(j.category) LIKE LOWER(CONCAT('%',:category,'%'))")
    public Page<Job> findAllByCategoryContainingPage(@Param("category") String category, Pageable pageable);
    @Query("SELECT j FROM Job j WHERE LOWER(j.category) LIKE LOWER(CONCAT('%',:category,'%')) ORDER BY j.date")
    public Page<Job> findAllByCategoryContainingPageDateAsc(@Param("category") String category, Pageable pageable);
    @Query("SELECT j FROM Job j WHERE LOWER(j.category) LIKE LOWER(CONCAT('%',:category,'%')) ORDER BY j.date DESC")
    public Page<Job> findAllByCategoryContainingPageDateDes(@Param("category") String category, Pageable pageable);
    @Query("SELECT j FROM Job j WHERE LOWER(j.category) LIKE LOWER(CONCAT('%',:category,'%')) ORDER BY j.salaryMax")
    public Page<Job> findAllByCategoryContainingPageMaxAsc(@Param("category") String category, Pageable pageable);
    @Query("SELECT j FROM Job j WHERE LOWER(j.category) LIKE LOWER(CONCAT('%',:category,'%')) ORDER BY j.salaryMax DESC")
    public Page<Job> findAllByCategoryContainingPageMaxDes(@Param("category") String category, Pageable pageable);

    public Page<Job> findAllByEmployerIdOrderByDateDesc(long id, Pageable pageable);
}

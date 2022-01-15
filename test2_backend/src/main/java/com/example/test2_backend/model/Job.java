package com.example.test2_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String location;

    @Column
    private String salaryRange;

    @Column
    private double salaryMin;

    @Column
    private double salaryMax;

    @Column
    private String category; // career specialization

    @Column
    private String description;

    @Column
    private int careerLevel; // years of experience

    @Column
    private String role; // full-time/part-time

    @Column
    private LocalDateTime date;

    @ManyToOne
    private Employer employer;

//    @OneToMany
//    @JsonIgnoreProperties({"job"})
//    private List<Application> applications;

    public Job() {
    }

//    public Job(String title, String location, String salaryRange, double salaryMin, double salaryMax, String category, String description, int careerLevel, String role, LocalDateTime date, Employer employer, List<Application> applications) {
//        this.title = title;
//        this.location = location;
//        this.salaryRange = salaryRange;
//        this.salaryMin = salaryMin;
//        this.salaryMax = salaryMax;
//        this.category = category;
//        this.description = description;
//        this.careerLevel = careerLevel;
//        this.role = role;
//        this.date = date;
//        this.employer = employer;
//        this.applications = applications;
//    }


    public Job(String title, String location, String salaryRange, double salaryMin, double salaryMax, String category, String description, int careerLevel, String role, LocalDateTime date, Employer employer) {
        this.title = title;
        this.location = location;
        this.salaryRange = salaryRange;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.category = category;
        this.description = description;
        this.careerLevel = careerLevel;
        this.role = role;
        this.date = date;
        this.employer = employer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalaryRange() {
        return salaryRange;
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public double getSalaryMin() {
        return salaryMin;
    }

    public void setSalaryMin(double salaryMin) {
        this.salaryMin = salaryMin;
    }

    public double getSalaryMax() {
        return salaryMax;
    }

    public void setSalaryMax(double salaryMax) {
        this.salaryMax = salaryMax;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCareerLevel() {
        return careerLevel;
    }

    public void setCareerLevel(int careerLevel) {
        this.careerLevel = careerLevel;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

//    public List<Application> getApplications() {
//        return applications;
//    }
//
//    public void setApplications(List<Application> applications) {
//        this.applications = applications;
//    }
}

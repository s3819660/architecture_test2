package com.example.test2_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String fullName;

    @Column
    private String phone;

    @Column
    private String pin;

    @Column
    private int age;

    @Column
    private String address;

    @Column
    private String category; // career specialization

    @Column
    private String qualification; // diploma/certificate/degree

    @Column
    private int experience; // Years of experience

//    @OneToMany
//    @JsonIgnoreProperties({"employee"})
//    private List<Application> applications;

    public Employee() {
    }

//    public Employee(String fullName, String phone, String pin, int age, String address, String category, String qualification, int experience, List<Application> applications) {
//        this.fullName = fullName;
//        this.phone = phone;
//        this.pin = pin;
//        this.age = age;
//        this.address = address;
//        this.category = category;
//        this.qualification = qualification;
//        this.experience = experience;
//        this.applications = applications;
//    }
    
    public Employee(String fullName, String phone, String pin, int age, String address, String category, String qualification, int experience) {
        this.fullName = fullName;
        this.phone = phone;
        this.pin = pin;
        this.age = age;
        this.address = address;
        this.category = category;
        this.qualification = qualification;
        this.experience = experience;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

//    public List<Application> getApplications() {
//        return applications;
//    }
//
//    public void setApplications(List<Application> applications) {
//        this.applications = applications;
//    }
}

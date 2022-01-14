package com.example.test2_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Employer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String phone;

    @Column
    private String pin;

    @Column
    private String address;

//    @OneToMany
//    @JsonIgnoreProperties({"employer"})
//    List<Job> jobs;

    public Employer() {
    }

//    public Employer(String name, String phone, String pin, String address, List<Job> jobs) {
//        this.name = name;
//        this.phone = phone;
//        this.pin = pin;
//        this.address = address;
//        this.jobs = jobs;
//    }


    public Employer(String name, String phone, String pin, String address) {
        this.name = name;
        this.phone = phone;
        this.pin = pin;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

//    public List<Job> getJobs() {
//        return jobs;
//    }
//
//    public void setJobs(List<Job> jobs) {
//        this.jobs = jobs;
//    }
}

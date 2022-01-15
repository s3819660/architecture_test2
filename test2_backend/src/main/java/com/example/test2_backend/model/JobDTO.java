package com.example.test2_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class JobDTO {

    private Long id;
    private String title = "";
    private Double salaryMin = 0.0;
    private Double salaryMax = 0.0;
    private String salaryRange = "";
    private String category = "";
    private String description = "";
    private String location = "";
    private int careerLevel ;
    private String role = "";
    private Long employerId;

    public JobDTO(){

    }

    @Override
    public String toString() {
        return "JobDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", minSalary=" + salaryMin +
                ", maxSalary=" + salaryMax +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", careerLevel=" + careerLevel +
                ", role='" + role + '\'' +
                ", employerId=" + employerId +
                '}';
    }
}
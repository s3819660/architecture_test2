package com.example.test2_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@Getter
@Setter
public class ApplicationDTO {

    private Long jobId;

    private Long employeeId;

    public ApplicationDTO(){}

    @Override
    public String toString() {
        return "ApplicationDTO{" +
                "jobId=" + jobId +
                ", employeeId=" + employeeId +
                '}';
    }
}

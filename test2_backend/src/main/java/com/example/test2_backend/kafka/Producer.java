package com.example.test2_backend.kafka;

import com.example.test2_backend.model.Application;
import com.example.test2_backend.model.ApplicationDTO;
import com.example.test2_backend.model.Employee;
import com.example.test2_backend.model.JobDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


@Service
public class Producer {

    private static final Logger logger = LoggerFactory.getLogger(Producer.class);

    @Autowired
    private KafkaTemplate<String , Object> kafkaTemplate;
    private static final String APPLICATION_TOPIC = "application";

    public boolean sendMessageApplicationDTO(ApplicationDTO applicationDTO){


        try {
            logger.info(String.format("#### -> Producing message -> application name -> %s", applicationDTO.getEmployeeId()));
            kafkaTemplate.send(APPLICATION_TOPIC, applicationDTO);

            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    private static final String EMPLOYEE_PUT_TOPIC = "employee_put";

    public boolean sendMessageUpdateEmployee(Employee employee){
        try {
            logger.info(String.format("#### -> Producing updating employee object message -> employee name -> %s", employee.getFullName()));
            kafkaTemplate.send(EMPLOYEE_PUT_TOPIC, employee);

            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    private static final String JOB_PUT_TOPIC = "job_put";

    public boolean sendMessageUpdateJob(JobDTO jobDTO){


        try {
            logger.info(String.format("#### -> Producing updating job object message -> job dto title -> %s", jobDTO.getTitle()));
            kafkaTemplate.send(JOB_PUT_TOPIC, jobDTO);

            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    private static final String JOB_CREATE_TOPIC = "job_create";
    public boolean sendMessageCreateJob(JobDTO jobDTO){


        try {
            logger.info(String.format("#### -> Producing creating job object message -> job dto title -> %s", jobDTO.getTitle()));
            kafkaTemplate.send(JOB_CREATE_TOPIC, jobDTO);

            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }
}
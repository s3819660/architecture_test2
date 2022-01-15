//package com.example.test2_backend.kafka;
//
//import com.example.test2_backend.model.*;
//import com.example.test2_backend.service.ApplicationService;
//import com.example.test2_backend.service.EmployeeService;
//import com.example.test2_backend.service.EmployerService;
//import com.example.test2_backend.service.JobService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.time.LocalDateTime;
//import java.time.temporal.ChronoUnit;
//
//@Service
//public class Consumer {
//    private final Logger logger = LoggerFactory.getLogger(Consumer.class);
//    private static final String APPLICATION_TOPIC = "application";
//    private static final String EMPLOYEE_PUT_TOPIC = "employee_put";
//
//    @Autowired
//    private ApplicationService applicationService;
//
//    @Autowired
//    private EmployeeService employeeService;
//
//    @Autowired
//    private JobService jobService;
//
//    @Autowired
//    private EmployerService employerService;
//
//    @KafkaListener(topics = APPLICATION_TOPIC, groupId = "application_group_id", containerFactory = "kafkaListenerContainerFactory")
////    @ConditionalOnMissingBean()
//    public void consume(ApplicationDTO applicationDTO) throws IOException {
//        logger.info(String.format("#### -> Consumed message: application toString-> %s", applicationDTO.toString()));
//
//        Job job = jobService.getJobById(applicationDTO.getJobId());
//        Employee employee = employeeService.getEmployeeById(applicationDTO.getJobId());
//
//        Application application = new Application();
//        application.setEmployee(employee);
//        application.setJob(job);
//
//        applicationService.createApplication(application);
//    }
//
//    @KafkaListener(topics = EMPLOYEE_PUT_TOPIC, groupId = "employee_put_group_id", containerFactory = "kafkaListenerContainerFactory")
////    @ConditionalOnMissingBean()
//    public void consume(Employee employee) throws IOException {
//        logger.info(String.format("#### -> Consumed message: employee toString-> %s", employee.toString()));
//
//        employeeService.updateEmployee(employee);
//
//    }
//
//    private static final String JOB_PUT_TOPIC = "job_put";
//
//    @KafkaListener(topics = JOB_PUT_TOPIC, groupId = "job_put_group_id", containerFactory = "kafkaListenerContainerFactory")
////    @ConditionalOnMissingBean()
//    public void consume(JobDTO jobDTO) throws IOException {
//        logger.info(String.format("#### -> Consumed message: employee toString-> %s", jobDTO.toString()));
//
//        Job job = new Job();
//        Employer employer = employerService.getEmployerById(jobDTO.getEmployerId());
//        job.setId(jobDTO.getId());
//        job.setDate(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
//        job.setTitle(jobDTO.getTitle());
//        job.setCareerLevel(jobDTO.getCareerLevel());
//        job.setDescription(jobDTO.getDescription());
//        job.setLocation(jobDTO.getLocation());
//        job.setEmployer(employer);
//        job.setSalaryMin(jobDTO.getSalaryMin());
//        job.setSalaryMax(jobDTO.getSalaryMax());
//        job.setRole(jobDTO.getRole());
//        job.setCategory(jobDTO.getCategory());
//
//        jobService.updateJob(job);
//    }
//
//    private static final String JOB_CREATE_TOPIC = "job_create";
//
//    @KafkaListener(topics = JOB_CREATE_TOPIC, groupId = "job_create_group_id", containerFactory = "kafkaListenerContainerFactory")
////    @ConditionalOnMissingBean()
//    public void consumeCreateJob(JobDTO jobDTO) throws IOException {
//        logger.info(String.format("#### -> Consumed message: employee toString-> %s", jobDTO.toString()));
//
//        Job job = new Job();
//        Employer employer = employerService.getEmployerById(jobDTO.getEmployerId());
//
//        job.setTitle(jobDTO.getTitle());
//        job.setCareerLevel(jobDTO.getCareerLevel());
//        job.setDescription(jobDTO.getDescription());
//        job.setDate(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
//        job.setLocation(jobDTO.getLocation());
//        job.setEmployer(employer);
//        job.setSalaryMin(jobDTO.getSalaryMin());
//        job.setSalaryMax(jobDTO.getSalaryMax());
//        job.setRole(jobDTO.getRole());
//        job.setCategory(jobDTO.getCategory());
//
//        jobService.createJob(job);
//    }
//}

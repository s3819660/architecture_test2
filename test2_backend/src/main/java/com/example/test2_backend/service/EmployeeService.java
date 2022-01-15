package com.example.test2_backend.service;

import com.example.test2_backend.model.Application;
import com.example.test2_backend.model.Employee;
import com.example.test2_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Random;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    private final String EMPLOYEE_CACHE = "EMPLOYEE";
//    @Autowired
//    RedisTemplate<String , Object> redisTemplate;
//    private HashOperations<String, Long, Employee> hashOperations;
//
//    @PostConstruct
//    private void initializeHashOperations(){
//        hashOperations = redisTemplate.opsForHash();
//    }
//
//    public void saveToCache(Employee application) {
//        hashOperations.put(EMPLOYEE_CACHE, application.getId(), application);
//    }

    public Employee signUp(String fullName,
                           String phone,
                           int age,
                           String address,
                           String category,
                           String qualification,
                           int experience) {
        // if not unique, return null
        if (!isPhoneUnique(phone))
            return null;

        Employee employee = new Employee(fullName,
                phone,
                randomOTP(),
                age,
                address,
                category,
                qualification,
                experience);
        return employeeRepository.save(employee);
    }

    private boolean isPhoneUnique(String phone) {
        if (employeeRepository.findAllByPhone(phone) != null) {
            return false;
        }

        return true;
    }

    public Employee logIn(String phone, String pin) {
        Employee admin = employeeRepository.findAllByPhone(phone);

        if (admin.getPin().equals(pin))
            return admin;

        return null;

    }

    private String randomOTP() {
        Random random = new Random();
        // 0 + 1000 => + 8999 + 1000
        return String.valueOf(random.nextInt(9000) + 1000);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Employee employee) {
//        saveToCache(employee);
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Page<Employee> getAllEmployeesPage(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page, size));
    }

    public Employee getEmployeeById(long id) {
        try {
//            Employee employee = hashOperations.get(EMPLOYEE_CACHE, id);
//            if (employee != null) return employee;

            Employee employee = employeeRepository.findById(id).get();
//            saveToCache(employee);
            return employee;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String deleteEmployee(long id) {
        try {
            employeeRepository.deleteById(id);
            return "Successfully deleted employee";
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail to delete employee";
        }
    }
}

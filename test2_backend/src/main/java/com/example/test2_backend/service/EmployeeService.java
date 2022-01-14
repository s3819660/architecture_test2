package com.example.test2_backend.service;

import com.example.test2_backend.model.Employee;
import com.example.test2_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Employee employee) {
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
            return employeeRepository.findById(id).get();
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

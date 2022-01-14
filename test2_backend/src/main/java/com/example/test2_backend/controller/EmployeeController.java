package com.example.test2_backend.controller;

import com.example.test2_backend.model.Employee;
import com.example.test2_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping(value = "/employees/{page}/{size}")
    public Page<Employee> getAllEmployeesPage(@PathVariable int page, @PathVariable int size) {
        return employeeService.getAllEmployeesPage(page, size);
    }

    @GetMapping(value = "/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping(value = "/employee/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping(value = "/employee")
    public Employee createEmployee(@RequestBody Employee employer) {
        return employeeService.createEmployee(employer);
    }

    @PutMapping(value = "/employee")
    public Employee updateEmployee(@RequestBody Employee employer) {
        return employeeService.updateEmployee(employer);
    }

    @DeleteMapping(value = "/employee/{id}")
    public String deleteEmployee(@PathVariable int id) {
        return employeeService.deleteEmployee(id);
    }

    @PostMapping(value = "/employee/signUp")
    public Employee signUp(@RequestBody Employee employee) {
        return employeeService.signUp(employee.getFullName(),
                employee.getPhone(),
                employee.getAge(),
                employee.getAddress(),
                employee.getCategory(),
                employee.getQualification(),
                employee.getExperience());
    }

    @GetMapping(value = "/employee/logIn/{phone}&{pin}")
    public Employee logIn(@PathVariable String phone, @PathVariable String pin) {
        return employeeService.logIn(phone, pin);
    }
}

package com.gpcodefusion.dhoni.controller;

import com.gpcodefusion.dhoni.entity.StudentInfo;
import com.gpcodefusion.dhoni.repository.StudentInfoRepository;
import com.gpcodefusion.dhoni.service.studentInfoservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentInfoController {

    @Autowired
    private StudentInfoRepository studentRepo;

    @Autowired
    private studentInfoservice studentService;

    @GetMapping
    public List<StudentInfo> getAllStudents() {
        return studentRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<StudentInfo> getStudentById(@PathVariable String id) {
        return studentRepo.findById(id);
    }

    @PostMapping
    public StudentInfo createStudent(@RequestBody StudentInfo student) {
        return studentRepo.save(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentInfo> updateStudent(@PathVariable String id, @RequestBody StudentInfo updatedStudent) {
        Optional<StudentInfo> existing = studentRepo.findById(id.trim());

        if (existing.isPresent()) {
            StudentInfo student = existing.get();
            student.setCourse(updatedStudent.getCourse());
            student.setEmail(updatedStudent.getEmail());
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());

            return ResponseEntity.ok(studentRepo.save(student));
        } else {
            return ResponseEntity.notFound().build(); // 404 response
        }
    }


    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable String id) {
        studentRepo.deleteById(id);
    }

    @GetMapping("/generate-id")
    public ResponseEntity<String> generateStudentId() {
        String newId = studentService.generateNextStudentId();
        return ResponseEntity.ok(newId);
    }

}

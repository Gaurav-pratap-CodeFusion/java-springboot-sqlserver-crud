package com.gpcodefusion.dhoni.service;

import com.gpcodefusion.dhoni.repository.StudentInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class studentInfoservice {

    @Autowired
    private StudentInfoRepository studentRepository;

    public String generateNextStudentId() {
        String lastId = studentRepository.findMaxStudentId(); // e.g., STU012

        int nextNumber = 1;
        if (lastId != null && lastId.startsWith("STU")) {
            try {
                nextNumber = Integer.parseInt(lastId.substring(3)) + 1;
            } catch (NumberFormatException e) {
                // fallback in case of corrupted ID
                nextNumber = 1;
            }
        }

        return String.format("STU%03d", nextNumber); // STU001, STU002...
    }
}

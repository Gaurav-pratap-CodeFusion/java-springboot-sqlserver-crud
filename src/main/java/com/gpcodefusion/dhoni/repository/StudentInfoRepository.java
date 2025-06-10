package com.gpcodefusion.dhoni.repository;

import com.gpcodefusion.dhoni.entity.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudentInfoRepository extends JpaRepository<StudentInfo, String> {

    @Query("SELECT MAX(s.studentid) FROM StudentInfo s")
    String findMaxStudentId();  // STU001, STU002...
}

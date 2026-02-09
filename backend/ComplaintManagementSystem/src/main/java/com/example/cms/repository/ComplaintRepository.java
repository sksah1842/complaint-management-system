package com.example.cms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cms.entity.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUsername(String username);
}

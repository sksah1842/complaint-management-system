package com.example.cms.service;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.cms.entity.Complaint;
import com.example.cms.repository.ComplaintRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    /**
     * USER: Create a new complaint
     */
    public Complaint createComplaint(Complaint complaint, String username) {
        complaint.setId(null);               // ensure new record
        complaint.setUsername(username);     // owner
        complaint.setStatus("OPEN");
        return complaintRepository.save(complaint);
    }

    /**
     * USER: Get complaints created by logged-in user
     */
    public List<Complaint> getComplaintsByUser(String username) {
        return complaintRepository.findByUsername(username);
    }

    /**
     * USER: Track complaint by ID (ownership check optional)
     */
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    /**
     * ADMIN: Get all complaints
     */
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    /**
     * ADMIN: Update complaint status
     */
    public Complaint updateComplaintStatus(Long id, Map<String, String> request) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        String status = request.get("status");

        if (!isValidStatus(status)) {
            throw new RuntimeException("Invalid complaint status");
        }

        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }

    /**
     * ADMIN: Delete complaint (optional)
     */
    public void deleteComplaint(Long id) {
        if (!complaintRepository.existsById(id)) {
            throw new RuntimeException("Complaint not found");
        }
        complaintRepository.deleteById(id);
    }

    /**
     * Internal validation
     */
    private boolean isValidStatus(String status) {
        return status != null &&
                (status.equals("OPEN")
                || status.equals("IN_PROGRESS")
                || status.equals("RESOLVED"));
    }
}

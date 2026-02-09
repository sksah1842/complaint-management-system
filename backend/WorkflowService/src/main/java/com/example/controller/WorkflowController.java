package com.example.controller;


import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.WorkflowComplaint;
import com.example.repository.WorkflowComplaintRepository;

@RestController
@RequestMapping("/workflow/complaints")
@PreAuthorize("hasRole('SUPPORT')")
public class WorkflowController {

    private final WorkflowComplaintRepository repo;

    // ✅ Constructor injection (BEST PRACTICE)
    public WorkflowController(WorkflowComplaintRepository repo) {
        this.repo = repo;
    }

    /**
     * Get all IN_PROGRESS complaints for backend team
     */
    @GetMapping("/in-progress")
    public List<WorkflowComplaint> getInProgress() {
        return repo.findByStatus("IN_PROGRESS");
    }

    /**
     * Backend team submits solution
     */
    @PostMapping("/{complaintId}/solution")
    public WorkflowComplaint submitSolution(
            @PathVariable Long complaintId,
            @RequestBody Map<String, String> body,
            Authentication auth) {

        WorkflowComplaint wc = repo.findByComplaintId(complaintId)
                .orElseThrow(() ->
                        new RuntimeException("Workflow complaint not found"));

        wc.setSolution(body.get("solution"));
        wc.setHandledBy(auth.getName());
        wc.setStatus("IN_PROGRESS"); // stays until admin resolves

        return repo.save(wc);
    }
}



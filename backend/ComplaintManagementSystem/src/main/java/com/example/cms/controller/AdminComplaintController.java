package com.example.cms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cms.entity.Complaint;
import com.example.cms.repository.ComplaintRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Admin Complaints", description = "Admin-only complaint management APIs")
@RestController
@RequestMapping("/api/admin/complaints")
public class AdminComplaintController {

    @Autowired
    private ComplaintRepository repo;
    
    @Operation(
    	    summary = "Get all complaints",
    	    description = "Admin can view all complaints submitted by users"
    	)
    @GetMapping
    public List<Complaint> all() {
        return repo.findAll();
    }

    
    @Operation(
    	    summary = "Update complaint status",
    	    description = "Admin updates complaint status (OPEN, IN_PROGRESS, RESOLVED)"
    	)
    @PutMapping("/{id}/status")
    public Complaint update(@PathVariable Long id,
                             @RequestBody Map<String, String> body) {

        Complaint c = repo.findById(id).orElseThrow();
        c.setStatus(body.get("status"));
        return repo.save(c);
    }
}

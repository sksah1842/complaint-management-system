package com.example.cms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cms.entity.Complaint;
import com.example.cms.service.ComplaintService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "UserController", description = "User complaint management APIs")
@RestController
@RequestMapping("/api/user/complaints")
public class UserComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Operation(
            summary = "Create complaints",
            description = "User can create complaints"
    )
    @PostMapping
    public Complaint create(@Valid @RequestBody Complaint c, Authentication auth) {

        if (auth == null) {
            throw new RuntimeException("Authentication is null");
        }

        return complaintService.createComplaint(c, auth.getName());
    }

    @Operation(
            summary = "Get my complaints",
            description = "Fetch all complaints created by the logged-in user"
    )
    @GetMapping
    public List<Complaint> getMyComplaints(Authentication auth) {

        if (auth == null) {
            throw new RuntimeException("Authentication is null");
        }

        return complaintService.getComplaintsByUser(auth.getName());
    }
}

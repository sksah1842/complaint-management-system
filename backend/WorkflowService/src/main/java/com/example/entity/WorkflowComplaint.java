package com.example.entity;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "workflow_complaints")
@Data
public class WorkflowComplaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Complaint ID from the main Complaint Service
     */
    @NotNull(message = "Complaint ID is required")
    @Column(nullable = false, unique = true)
    private Long complaintId;

    @NotBlank(message = "Title is required")
    @Size(max = 150)
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 1000)
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    /**
     * IN_PROGRESS / RESOLVED
     */
    @NotBlank(message = "Status is required")
    @Column(nullable = false)
    private String status;

    /**
     * Team responsible for handling the complaint
     */
    @Column(name = "assigned_team")
    private String assignedTeam;

    /**
     * Backend team member who handled it
     */
    @Column(name = "handled_by")
    private String handledBy;

    /**
     * Solution or feedback from backend team
     */
    @Column(columnDefinition = "TEXT")
    private String solution;

    /**
     * Timestamps
     */
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    /* =====================
       Lifecycle Callbacks
       ===================== */

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

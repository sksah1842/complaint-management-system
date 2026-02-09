package com.example.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.WorkflowComplaint;

@Repository
public interface WorkflowComplaintRepository
        extends JpaRepository<WorkflowComplaint, Long> {

    /**
     * Find workflow complaint by main complaint service ID
     */
    Optional<WorkflowComplaint> findByComplaintId(Long complaintId);

    /**
     * Fetch all complaints with given status (e.g. IN_PROGRESS)
     */
    List<WorkflowComplaint> findByStatus(String status);

    /**
     * Fetch all complaints assigned to a specific team
     */
    List<WorkflowComplaint> findByAssignedTeam(String assignedTeam);

    /**
     * Fetch complaints handled by a specific support user
     */
    List<WorkflowComplaint> findByHandledBy(String handledBy);
}

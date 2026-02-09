package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.SupportUser;

@Repository
public interface SupportUserRepository extends JpaRepository<SupportUser, Long> {

    Optional<SupportUser> findByUsername(String username);

    boolean existsByUsername(String username);
}


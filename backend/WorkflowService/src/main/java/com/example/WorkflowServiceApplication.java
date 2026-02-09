package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class WorkflowServiceApplication {

	public static void main(String[] args) {
		System.out.println(new BCryptPasswordEncoder().encode("support123"));
		SpringApplication.run(WorkflowServiceApplication.class, args);
	}

}

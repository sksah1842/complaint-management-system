package com.example.cms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ComplaintManagementSystemApplication {

	public static void main(String[] args) {
		System.out.println(new BCryptPasswordEncoder().encode("admin123"));
		SpringApplication.run(ComplaintManagementSystemApplication.class, args);
	}

}

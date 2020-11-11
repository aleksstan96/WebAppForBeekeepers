package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.User;
import com.example.demo.services.MailService;

@RestController
public class MailController {
	
	@Autowired
	MailService mailService;

	@Autowired
	UserRepository userRepo;
	
	@RequestMapping("/eventmail/{id}/{imeiprezime}")
	public ResponseEntity<?> eventMail(@PathVariable Long id, @PathVariable String imeiprezime) {
		User user = userRepo.findById(id).get();
	
		try {
			mailService.sendMail(user.getEmail() , "alexstan220196@gmail.com", imeiprezime);
		}catch(MailException e) {
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
		
	}

}
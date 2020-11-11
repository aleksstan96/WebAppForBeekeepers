package com.example.demo.controllers;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.dao.PcelarRepository;
import com.example.demo.dao.SubscriptionRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.entity.Subscription;

@RepositoryRestController
public class SubscriptionController {
	
	@Autowired
	private PcelarRepository pcelarRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private SubscriptionRepository subRepo;
	
	@RequestMapping(method = RequestMethod.GET, value = "/subscriptions/delete/{id}")
	public ResponseEntity<?> deleteSubscription(@PathVariable Long id){
		
		Subscription sub = subRepo.findById(id).get();
		subRepo.delete(sub);
		
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}

}

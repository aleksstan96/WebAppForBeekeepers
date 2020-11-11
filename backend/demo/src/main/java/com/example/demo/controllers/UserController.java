package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.User;

@RepositoryRestController
public class UserController {
	
	@Autowired
	private UserRepository userRepo;
	
	
	@PostMapping(consumes="application/json", path = "/users/update/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public User updateUser(@RequestBody User user, @PathVariable Long id) {
		User u = userRepo.findById(id).get();
		
		u.setUsername(user.getUsername());
		u.setPassword(user.getPassword());
		
		return userRepo.save(u);
	}
	

}

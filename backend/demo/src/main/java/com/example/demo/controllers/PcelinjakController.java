package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.dao.PcelarRepository;
import com.example.demo.dao.PcelinjakRepository;
import com.example.demo.entity.Pcelar;
import com.example.demo.entity.Pcelinjak;

@RepositoryRestController
public class PcelinjakController {
	
	@Autowired
	private PcelinjakRepository pcelinjakRepo;
	
	@Autowired
	private PcelarRepository pcelarRepo;
	
	

	@RequestMapping(method = RequestMethod.GET, value = "/pcelinjaci/update/{id}/{pcelarId}/{naziv}/{brojKosnica}/{lokacija}")
	public ResponseEntity<?> updatePcelinjacki(@PathVariable Long id, @PathVariable Long pcelarId,  @PathVariable String naziv, @PathVariable int brojKosnica, @PathVariable String lokacija){
		
		
		Pcelar pcelar = pcelarRepo.findById(pcelarId).get();
		Pcelinjak pcelinjak = pcelinjakRepo.findById(id).get();
		
		
		pcelinjak.setPcelar(pcelar);
	
		pcelinjak.setNaziv(naziv);
		pcelinjak.setBrojKosnica(brojKosnica);
		pcelinjak.setLokacija(lokacija);
		
		pcelinjakRepo.save(pcelinjak); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pcelinjaci/delete/{id}")
	public ResponseEntity<?> deletePcelinjaci(@PathVariable Long id){
		
		
		Pcelinjak pcelinjak = pcelinjakRepo.findById(id).get();
		
		
		
		pcelinjakRepo.delete(pcelinjak); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
}

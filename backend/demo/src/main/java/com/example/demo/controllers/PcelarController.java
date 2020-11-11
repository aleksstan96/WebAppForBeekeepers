package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.demo.dao.PcelarRepository;
import com.example.demo.entity.Pcelar;



@RepositoryRestController
public class PcelarController {
	
	@Autowired
	private PcelarRepository pcelarRepo;
	
	
	
	@RequestMapping(method = RequestMethod.GET, value = "/pcelari/update/{slika}/{id}")
	public ResponseEntity<?> updatePcelarProfilePicture( @PathVariable String slika, @PathVariable Long id){
		System.out.println(slika);

		Pcelar pcelar = pcelarRepo.findById(id).get();
		
		
		
		pcelar.setProfilePicture(slika);
		pcelarRepo.save(pcelar); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pcelari/updateG/{slike}/{id}")
	public ResponseEntity<?> updatePcelarGallery( @PathVariable String slike, @PathVariable Long id){
		System.out.println(slike);

		Pcelar pcelar = pcelarRepo.findById(id).get();
		
		
		
		pcelar.setSlike(slike);
		pcelarRepo.save(pcelar); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	

//	@RequestMapping(method = RequestMethod.GET, value = "/pcelari/update/{id}/{ime}/{prezime}/{datumRodjenja}/{adresa}/{telefon}/{email}/{slike}/{aboutMe}")
//	public ResponseEntity<?> updatePcelarProfile(@PathVariable Long id){
//		
//
//		Pcelar pcelar = pcelarRepo.findById(id).get();
//		
//		
//		pcelarRepo.save(pcelar); 
//		return ResponseEntity.ok(HttpStatus.ACCEPTED);
//		
//	}
//	
	@PostMapping(consumes="application/json", path = "/pcelari/update/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Pcelar updatePcelar(@RequestBody Pcelar pcelar, @PathVariable Long id) {
		Pcelar p = pcelarRepo.findById(id).get();
		
		p.setIme(pcelar.getIme());
		p.setPrezime(pcelar.getPrezime());
		p.setAdresa(pcelar.getAdresa());
		p.setEmail(pcelar.getEmail());
		p.setDatumRodjenja(pcelar.getDatumRodjenja());
		p.setTelefon(pcelar.getTelefon());
		p.setAboutMe(pcelar.getAboutMe());
		
		return pcelarRepo.save(p);
	}
	

}

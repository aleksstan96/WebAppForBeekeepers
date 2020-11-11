package com.example.demo.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.dao.DogadjajRepository;
import com.example.demo.dao.PcelarRepository;
import com.example.demo.entity.Dogadjaj;
import com.example.demo.entity.Pcelar;

@RepositoryRestController
public class DogadjajController {
	
	@Autowired
	DogadjajRepository dogadjajRepo;
	
	@Autowired
	PcelarRepository pcelarRepo;
	
	@RequestMapping(method = RequestMethod.GET, value = "/dogadjaji/delete/{id}")
	public ResponseEntity<?> deleteDogadjaj(@PathVariable Long id){
		
		Dogadjaj dogadjaj = dogadjajRepo.findById(id).get();
		
		dogadjajRepo.delete(dogadjaj);
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
//	naziv varchar(45) 
//	pcelar_id int(11) 
//	datum_pocetka datetime 
//	datum_kraja datetime 
//	lokacija varchar(45) 
//	opis varchar(45) 
//	status
//	
	@RequestMapping(method = RequestMethod.GET, value = "/dogadjaji/update/{id}/{pcelarId}/{naziv}/{datumPocetka}/{datumKraja}/{lokacija}/{opis}/{status}")
	public ResponseEntity<?> updateDogadjaj(@PathVariable Long id, @PathVariable Long pcelarId, @PathVariable String naziv, @PathVariable Date datumPocetka, @PathVariable Date datumKraja, @PathVariable String lokacija,@PathVariable String opis, @PathVariable String status){
		
		
		
		Dogadjaj dogadjaj = dogadjajRepo.findById(id).get();
		Pcelar pcelar = pcelarRepo.findById(pcelarId).get();
		
		dogadjaj.setPcelar(pcelar);
		dogadjaj.setNaziv(naziv);
		dogadjaj.setLokacija(lokacija);
		dogadjaj.setDatumPocetka(datumPocetka);
		dogadjaj.setDatumKraja(datumKraja);
		dogadjaj.setOpis(opis);
		dogadjaj.setStatus(status);
	
		
		dogadjajRepo.save(dogadjaj); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	

}

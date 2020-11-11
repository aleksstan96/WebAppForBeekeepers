package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.dao.KosnicaRepository;
import com.example.demo.dao.PcelinjakRepository;
import com.example.demo.entity.Kosnica;
import com.example.demo.entity.Pcelinjak;

@RepositoryRestController
public class KosnicaController {

	
	@Autowired
	private KosnicaRepository kosnicaRepo;
	
	@Autowired
	private PcelinjakRepository pcelinjakRepo;
	
	

	@RequestMapping(method = RequestMethod.GET, value = "/kosnice/update/{id}/{pcelinjakId}/{rbr}/{vrsta}/{velicinaHranilice}/{velicinaLegla}/{temperatura}/{opsteStanje}/{starostMatice}")
	public ResponseEntity<?> updateKosnicaId(@PathVariable Long id, @PathVariable Long pcelinjakId,  @PathVariable int rbr, @PathVariable String vrsta, @PathVariable double velicinaHranilice, @PathVariable int velicinaLegla, @PathVariable double temperatura, @PathVariable String opsteStanje, @PathVariable int starostMatice){
		
		
		
		Kosnica kosnica = kosnicaRepo.findById(id).get();
		Pcelinjak pcelinjak = pcelinjakRepo.findById(pcelinjakId).get();
		
		
		kosnica.setPcelinjak(pcelinjak);
	
		kosnica.setRbr(rbr);
		kosnica.setVrsta(vrsta);
		kosnica.setVelicinaHranilice(velicinaHranilice);
		kosnica.setVelicinaLegla(velicinaLegla);
		kosnica.setTemperatura(temperatura);
		kosnica.setOpsteStanje(opsteStanje);
		kosnica.setStarostMatice(starostMatice);
		
		kosnicaRepo.save(kosnica); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/kosnice/update/{id}/{pcelinjakId}/{rbr}/{vrsta}/{velicinaHranilice}/{velicinaLegla}/{temperatura}/{starostMatice}")
	public ResponseEntity<?> updateKosnicaIdNoState(@PathVariable Long id, @PathVariable Long pcelinjakId,  @PathVariable int rbr, @PathVariable String vrsta, @PathVariable double velicinaHranilice, @PathVariable int velicinaLegla, @PathVariable double temperatura, @PathVariable int starostMatice){
		
		
		Kosnica kosnica = kosnicaRepo.findById(id).get();
		Pcelinjak pcelinjak = pcelinjakRepo.findById(pcelinjakId).get();
		
		
		kosnica.setPcelinjak(pcelinjak);
	
		kosnica.setRbr(rbr);
		kosnica.setVrsta(vrsta);
		kosnica.setVelicinaHranilice(velicinaHranilice);
		kosnica.setVelicinaLegla(velicinaLegla);
		kosnica.setTemperatura(temperatura);
		kosnica.setStarostMatice(starostMatice);
		
		kosnicaRepo.save(kosnica); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
	
	
	@RequestMapping(method = RequestMethod.GET, value = "/kosnice/delete/{id}")
	public ResponseEntity<?> deleteKosnica(@PathVariable Long id){
		
		
		
		Kosnica kosnica = kosnicaRepo.findById(id).get();
		
		
		kosnicaRepo.delete(kosnica); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
}

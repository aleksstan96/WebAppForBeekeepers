package com.example.demo.controllers;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.dao.JeOcenioRepository;
import com.example.demo.dao.KupacRepositroy;
import com.example.demo.dao.PcelarRepository;
import com.example.demo.dao.ProizvodRepository;
import com.example.demo.entity.JeOcenio;
import com.example.demo.entity.JeOcenioKey;
import com.example.demo.entity.Kupac;
import com.example.demo.entity.Pcelar;
import com.example.demo.entity.Proizvod;

@RepositoryRestController
public class ProizvodController {
	@Autowired
	private KupacRepositroy userRepo;
	

	@Autowired
	private JeOcenioRepository jORepo;
	
	@Autowired
	private PcelarRepository pcelarRepo;
	
	@Autowired
	private ProizvodRepository proizvodRepo;

	@RequestMapping(method = RequestMethod.GET, value = "/proizvodi/update/{id}/{pcelarId}/{naziv}/{info}/{cena}/{kolicina}/{slika}/{kategorija}/{ocena}/{brOcena}")
	public ResponseEntity<?> updatePcelinjacki(@PathVariable Long id, @PathVariable Long pcelarId,  @PathVariable String naziv, @PathVariable int cena,
												@PathVariable String info, @PathVariable int kolicina,@PathVariable String slika, @PathVariable String kategorija, 
												@PathVariable BigDecimal ocena, @PathVariable int brOcena ){
		
		
		Pcelar pcelar = pcelarRepo.findById(pcelarId).get();
		Proizvod proizvod = proizvodRepo.findById(id).get();
		
		
		proizvod.setPcelar(pcelar);
	
		proizvod.setNaziv(naziv);
		proizvod.setInfo(info);
		proizvod.setBrOcena(brOcena);
		proizvod.setCena(cena);
		proizvod.setKategorija(kategorija);
		proizvod.setKolicina(kolicina);
		proizvod.setOcena(ocena);
		proizvod.setSlika(slika);
		
		proizvodRepo.save(proizvod); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/proizvodi/delete/{id}")
	public ResponseEntity<?> deleteproizvodi(@PathVariable Long id){
		
		
		Proizvod proizvod = proizvodRepo.findById(id).get();
		
		
		
		proizvodRepo.delete(proizvod); 
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/jeocenio/create/{proId}/{kupacId}/{komentar}/{ocena}")
	   // @ResponseBody
	    public  ResponseEntity<?> createJeOceni(@PathVariable Long proId, @PathVariable Long kupacId,@PathVariable String komentar , @PathVariable int ocena) {
			JeOcenio jo = new JeOcenio();
			JeOcenioKey jok = new JeOcenioKey();
			
			Kupac user  = userRepo.findById(kupacId).get();
			Proizvod pro = proizvodRepo.findById(proId).get();
			jok.setKupac_id(user.getId());
			jok.setProizvod_id(pro.getId());
			jo.setId(jok);
			jo.setKupac(user);
			jo.setProizvod(pro);
			jo.setKomentar(komentar);
			jo.setOcena(ocena);
			while(true) {
				try {
					jORepo.save(jo);
					break;
				}catch(Exception e) {
					System.out.println("Puklo");
				}
			}
			
			return ResponseEntity.ok(HttpStatus.NO_CONTENT);
					
	    }

}

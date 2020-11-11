package com.example.demo.dao;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Dogadjaj;


@CrossOrigin
@RepositoryRestResource(collectionResourceRel  = "dogadjaji",  path = "dogadjaji")
public interface DogadjajRepository extends JpaRepository<Dogadjaj, Long>{
	
	public Page<Dogadjaj> findByPcelarId(@RequestParam("id") Long id, Pageable pageable);
	
	public Page<Dogadjaj> findByStatus(@RequestParam("status") String status, Pageable pageable);
	
	public Page<Dogadjaj> findByStatusAndLokacijaContainingAndDatumPocetkaAfter(@RequestParam("status") String status,@RequestParam("name") String name,@RequestParam("date") Date date, Pageable pageable);
	
	public Page<Dogadjaj> findByStatusAndLokacijaContaining(@RequestParam("status") String status,@RequestParam("name") String name, Pageable pageable);

	public Page<Dogadjaj> findByDatumPocetkaAfter(@RequestParam("date") Date date, Pageable pageable);
}
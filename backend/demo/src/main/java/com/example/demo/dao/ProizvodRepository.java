package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Proizvod;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel  = "proizvodi",  path = "proizvodi")
public interface ProizvodRepository extends JpaRepository<Proizvod, Long>{
	
	public Page<Proizvod> findByNazivContaining(@RequestParam("name") String name, Pageable pageable);

	public Page<Proizvod> findByKategorija(@RequestParam("kategorija") String kategorija, Pageable pageable);
	
	public Page<Proizvod> findByPcelarId(@RequestParam("id") Long id, Pageable pageable);
}

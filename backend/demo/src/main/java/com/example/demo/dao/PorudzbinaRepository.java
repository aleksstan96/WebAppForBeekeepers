package com.example.demo.dao;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Porudzbina;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel  = "porudzbine",  path = "porudzbine")
public interface PorudzbinaRepository extends JpaRepository<Porudzbina, Long>{
	
	public Page<Porudzbina> findByUserId(@RequestParam("id") Long id, Pageable pageable);
	
	public Page<Porudzbina> findByUserIdAndProizvodId(@RequestParam("uid") Long uid,@RequestParam("pid") Long pid,
													  Pageable pageable);
	
	public Page<Porudzbina> findByPcelarIdAndDatumBetween(@RequestParam("id") Long id,
														  @RequestParam("startDate") Date startDate,
														  @RequestParam("endDate") Date endDate, Pageable pageable);

}

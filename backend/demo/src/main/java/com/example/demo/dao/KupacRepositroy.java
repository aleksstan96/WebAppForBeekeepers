package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Kupac;


@CrossOrigin 
@RepositoryRestResource(collectionResourceRel  = "kupci",  path = "kupci")
public interface KupacRepositroy extends JpaRepository<Kupac, Long>{
	
	public Page<Kupac> findByUserId(@RequestParam("id") Long id, Pageable pageable);

}

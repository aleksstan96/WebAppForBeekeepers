package com.example.demo.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.JeOcenio;
import com.example.demo.entity.JeOcenioKey;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel  = "jeocenio",  path = "jeocenio")
public interface JeOcenioRepository extends JpaRepository<JeOcenio, JeOcenioKey>{
	
	@Query("select jo from JeOcenio jo where jo.kupac.id=:id")
	public Page<JeOcenio> findByKupacId(@Param("id") Long id, Pageable pageable);
	
	@Query("select jo from JeOcenio jo where jo.proizvod.id=:id")
	public Page<JeOcenio> findByProizvodId(@Param("id") Long id, Pageable pageable);
	
	@Query("select jo from JeOcenio jo where jo.kupac.id=:kid and jo.proizvod.id=:pid")
	public Page<JeOcenio> findByKupacIdAndProizvodId(@Param("kid") Long kid, @Param("pid") Long pid, Pageable pageable);
	
	
	
}

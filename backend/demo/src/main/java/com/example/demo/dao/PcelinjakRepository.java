package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Pcelinjak;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel  = "pcelinjaci",  path = "pcelinjaci")
public interface PcelinjakRepository extends JpaRepository<Pcelinjak, Long>{

	public Page<Pcelinjak> findByPcelarId(@RequestParam("id") Long id, Pageable pageable);

}

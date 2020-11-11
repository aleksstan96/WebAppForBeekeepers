package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "porudzbina")
public class Porudzbina {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private Long id;
	
	@Column(name = "proizvod_id")
	private Long proizvodId;
	
	@Column(name = "user_id")
	private Long userId;
	
	@Column(name = "pcelar_id")
	private Long pcelarId;
	
	@Column(name = "kolicina")
	private int kolicina;
	
	@Column(name = "datum")
	private Date datum;

}

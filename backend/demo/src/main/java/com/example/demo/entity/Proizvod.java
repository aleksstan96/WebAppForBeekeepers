package com.example.demo.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "proizvod")
@Data
public class Proizvod {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private Long id;
	
	private String info;
	
	private String naziv;
	
	private int cena;
	
	private int kolicina;
	
	private String slika;
	
	private String kategorija;
	
	
	private BigDecimal ocena;
	
	private int brOcena;
	
	@ManyToOne
	@JoinColumn(name = "pcelar_id")
	private Pcelar pcelar;

}

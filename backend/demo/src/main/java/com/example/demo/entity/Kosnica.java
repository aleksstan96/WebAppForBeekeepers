package com.example.demo.entity;

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
@Table(name = "kosnica")
@Data
public class Kosnica {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id")
	 private Long id;
	 
	 private int rbr;
	 
	 private String vrsta;
	 
	 private double velicinaHranilice;
	 
	 private int velicinaLegla;
	 
	// private Date datumHranjenja;
	 
	 private double temperatura;
	 
	 private String opsteStanje;
	 
	 private int starostMatice;
	 
	 	 
	 @ManyToOne
	 //(fetch = FetchType.EAGER) //necu nista da bude cascade
	 @JoinColumn(name = "pcelinjak_id")
	 private Pcelinjak pcelinjak;

}

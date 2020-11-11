package com.example.demo.entity;

import java.util.Date;

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
@Data
@Table(name = "dogadjaj")
public class Dogadjaj {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id")
	private Long id;
	 
	 private String naziv;	 
	 private Date datumPocetka;
	 
	 private Date datumKraja;
	 
	 private String lokacija;
	 
	 private String opis;
	 
	 private String status;
	 
	 
	 @ManyToOne 
	 @JoinColumn(name = "pcelar_id")
	 private Pcelar pcelar;

}

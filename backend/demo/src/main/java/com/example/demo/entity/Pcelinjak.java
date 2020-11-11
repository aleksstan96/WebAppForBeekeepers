package com.example.demo.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "pcelinjak")
@Data
public class Pcelinjak {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id")
	 private Long id;
	 
	 private String naziv;
	 
	 private String lokacija;
	 
	 private int brojKosnica;
	 
	 
	 @ManyToOne //necu nista da bude cascade
	 @JoinColumn(name = "pcelar_id")
	 private Pcelar pcelar;
	 
	// @OneToMany(mappedBy = "rasadnik", cascade = CascadeType.ALL) //ovako ce valjda promena rasadnika da utice na sadnice
	 @OneToMany(mappedBy = "pcelinjak", cascade = CascadeType.ALL 
			 //,fetch = FetchType.EAGER
			 ) //neka ovako dok ne promenis i u bazi na cascade
	 private List<Kosnica> kosnice;
	 

}

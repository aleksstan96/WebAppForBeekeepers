package com.example.demo.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "pcelar")
public class Pcelar {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id")
	private Long id;
	
	private String ime;
	
	private String prezime;
	
	private Date datumRodjenja;
	
	private String adresa;
	
	private String telefon;
	
	private String email;
	
	private String aboutMe;
	
	private String slike;
	
	private String profilePicture;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	//@OneToMany(mappedBy = "poljoprivrednik", cascade = CascadeType.ALL) //neka ovako dok ne izmenis i u bazi da bude cascade
	@OneToMany(mappedBy = "pcelar", cascade = CascadeType.ALL)
	private List<Pcelinjak> pcelinjaci;
	
	//@OneToMany(mappedBy = "poljoprivrednik", cascade = CascadeType.ALL) //neka ovako dok ne izmenis i u bazi da bude cascade
		@OneToMany(mappedBy = "pcelar", cascade = CascadeType.ALL)
		private List<Dogadjaj> dogadjaji;
	
	@OneToMany(mappedBy = "pcelar", cascade = CascadeType.ALL) //zelim da ako mi se obrise/izmeni preduzece obrisem/izmenim i proizvode
	private List<Proizvod> proizvodi;
	

}

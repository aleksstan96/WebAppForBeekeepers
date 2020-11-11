package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "kupac")
public class Kupac {

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

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
}

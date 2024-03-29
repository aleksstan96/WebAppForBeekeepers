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
@Table(name = "zahtev")
public class Zahtev {

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
	
	private String username;
	
	private String password;
	
	private String role;
	
	private boolean prihvacen;
	
	private boolean nijePrihvacen;

}

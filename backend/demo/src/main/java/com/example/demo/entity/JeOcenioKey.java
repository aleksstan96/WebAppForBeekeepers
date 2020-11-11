package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class JeOcenioKey implements Serializable{
	

	@Column(name = "kupac_id")
	Long kupac_id;
	
	@Column(name = "proizvod_id")
	Long proizvod_id;




}

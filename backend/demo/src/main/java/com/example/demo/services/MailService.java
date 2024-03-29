package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	
	private JavaMailSender javaMailSender;
	
	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}


	public void sendMail(String sendTo, String sendFrom, String imeiprezime) throws MailException{
		SimpleMailMessage mail = new SimpleMailMessage();
		
		mail.setTo(sendTo);
		mail.setFrom(sendFrom);
		mail.setSubject("New Event");
		mail.setText(imeiprezime + " has created a new event! Check the app to see more details.");
		
		javaMailSender.send(mail);
		
	}
}

package com.chat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Forum {
	@Id@GeneratedValue
	private int question_Id;
	private String question_Name; 
	private String response;
	public int getQuestion_Id() {
		return question_Id;
	}
	public void setQuestion_Id(int question_Id) {
		this.question_Id = question_Id;
	}
	public String getQuestion_Name() {
		return question_Name;
	}
	public void setQuestion_Name(String question_Name) {
		this.question_Name = question_Name;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
		
	
}

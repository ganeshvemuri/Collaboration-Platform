package com.chat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class jobRegistration {
 
	@Id@GeneratedValue
	//private int student_Id;
	private int job_Id;
	private String name;
	private String stream;
	private String percentage;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getJob_Id() {
		return job_Id;
	}
	public void setJob_Id(int job_Id) {
		this.job_Id = job_Id;
	}
	public String getStream() {
		return stream;
	}
	public void setStream(String stream) {
		this.stream = stream;
	}
	public String getPercentage() {
		return percentage;
	}
	public void setPercentage(String percentage) {
		this.percentage = percentage;
	}
	
	
	
	
	
}

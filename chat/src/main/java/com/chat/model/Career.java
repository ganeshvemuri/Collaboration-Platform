package com.chat.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Career {
	@Id@GeneratedValue
	private int job_Id;
	private String job_Role;
	private String job_Description;
	private String eligibility;
	
	
	public int getJob_Id() {
		return job_Id;
	}
	public void setJob_Id(int job_Id) {
		this.job_Id = job_Id;
	}
	public String getJob_Role() {
		return job_Role;
	}
	public void setJob_Role(String job_Role) {
		this.job_Role = job_Role;
	}
	public String getJob_Description() {
		return job_Description;
	}
	public void setJob_Description(String job_Description) {
		this.job_Description = job_Description;
	}
	public String getEligibility() {
		return eligibility;
	}
	public void setEligibility(String eligibility) {
		this.eligibility = eligibility;
	}
	
	

}

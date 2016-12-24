package com.chat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Blog {
	@Id@GeneratedValue
	private int blog_Id;
	private String blog_Name;
	private String blog_Description;
	private String postedby;
	private boolean status;
	
	
	public String getPostedby() {
		return postedby;
	}
	public void setPostedby(String postedby) {
		this.postedby = postedby;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public int getBlog_Id() {
		return blog_Id;
	}
	public void setBlog_Id(int blog_Id) {
		this.blog_Id = blog_Id;
	}
	public String getBlog_Name() {
		return blog_Name;
	}
	public void setBlog_Name(String blog_Name) {
		this.blog_Name = blog_Name;
	}
	public String getBlog_Description() {
		return blog_Description;
	}
	public void setBlog_Description(String blog_Description) {
		this.blog_Description = blog_Description;
	}
	
				
	

}

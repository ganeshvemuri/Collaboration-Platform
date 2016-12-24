package com.chat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
@Id@GeneratedValue
 private int comment_Id;
 private int blog_Id;
 private String comment;
 private String username;
 
 
public int getComment_Id() {
	return comment_Id;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public void setComment_Id(int comment_Id) {
	this.comment_Id = comment_Id;
}
public String getComment() {
	return comment;
}
public int getBlog_Id() {
	return blog_Id;
}
public void setBlog_Id(int blog_Id) {
	this.blog_Id = blog_Id;
}
public void setComment(String comment) {
	this.comment = comment;
}
 
 
	
	
	
}

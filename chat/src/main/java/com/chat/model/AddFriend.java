package com.chat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AddFriend {
	
	@Id@GeneratedValue
	private int friend_Id;
		private String username;
		private String friend_Name;
		public int getFriend_Id() {
			return friend_Id;
		}
		public void setFriend_Id(int friend_Id) {
			this.friend_Id = friend_Id;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getFriend_Name() {
			return friend_Name;
		}
		public void setFriend_Name(String friend_Name) {
			this.friend_Name = friend_Name;
		}
		

	

}

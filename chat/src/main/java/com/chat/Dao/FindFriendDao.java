package com.chat.Dao;

import java.util.List;

import com.chat.model.AddFriend;

public interface FindFriendDao {
	
	void addFriend(AddFriend friend);
	void updateFriend(AddFriend friend);
	void deleteFriend(AddFriend friend);
	List<AddFriend> viewFriends(String username);

}

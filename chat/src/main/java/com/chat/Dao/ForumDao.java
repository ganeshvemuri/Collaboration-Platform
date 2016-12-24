package com.chat.Dao;

import java.util.List;

import com.chat.model.Forum;

public interface ForumDao {

	void createForum(Forum forum);
	List<Forum> viewForum();
	void updateForum(Forum forum);
	void deleteForum(int forum_Id);

}

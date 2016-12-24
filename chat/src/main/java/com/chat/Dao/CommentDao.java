package com.chat.Dao;

import java.util.List;

import com.chat.model.Comment;
//import com.chat.model.Friend;

public interface CommentDao {
	void addComment(Comment comment);
	void updateComment(Comment comment);
	void removeComment(Comment comment);

	List<Comment> viewComments(int blog_Id);

	
}

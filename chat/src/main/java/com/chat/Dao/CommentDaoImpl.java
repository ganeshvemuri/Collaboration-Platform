package com.chat.Dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chat.model.Comment;
//import com.chattiez.model.Friend;

@Transactional
@Repository
public class CommentDaoImpl implements CommentDao{

	@Autowired
	SessionFactory sessionfactory;
	
	public void addComment(Comment comment) {
		sessionfactory.getCurrentSession().save(comment);
		
	}

	
	public void removeComment(Comment comment) {
		sessionfactory.getCurrentSession().delete(comment);
		
	}

	public List<Comment> viewComments(int blog_Id) {
		
		Criteria crt=sessionfactory.getCurrentSession().createCriteria(Comment.class);
		crt.add(Restrictions.eq("blog_Id",blog_Id));
		List list=crt.list();
		return list;
		
	}

	public void updateComment(Comment comment) {
		sessionfactory.getCurrentSession().update(comment);
		
	}

}

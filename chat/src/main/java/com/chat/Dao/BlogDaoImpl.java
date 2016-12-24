package com.chat.Dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chat.model.Blog;
@Transactional
@Repository
public class BlogDaoImpl implements BlogDao {
	@Autowired
	SessionFactory sessionfactory;
	public void createBlog(Blog blog) {
		sessionfactory.getCurrentSession().save(blog);
		
	}
	public List<Blog> viewBlogs() {
        Session session=sessionfactory.getCurrentSession();
        String hql="from Blog";
		Query query=session.createQuery(hql);
		return query.list();
	}
	public void updateBlog(Blog blog) {
		Session session=sessionfactory.getCurrentSession();
		  /*Date date=new Date();
			 String data=date.toString();
			 blog.setDate(data);*/
		session.update(blog);

	}
	public void deleteBlog(int blog_Id) {
		Session session=sessionfactory.getCurrentSession();
		Blog blog=(Blog)session.get(Blog.class,new Integer(blog_Id));
		session.delete(blog);

	}
	
	
	/*public void deleteBlog(Blog blog) {
		Session session=sessionfactory.getCurrentSession();
		session.delete(blog);

	}*/
	/*public List<Blog> viewBlog(boolean status) {
		String hql="from Blog where status="+"'"+true+"'";
		Query query=sessionfactory.getCurrentSession().createQuery(hql);
		List<Blog> list=  query.list();
		return  list;
	}*/
	
	public List<Blog> viewMyBlogs(String postedby) {
		System.out.println("in view my blogs");
		Session session=sessionfactory.getCurrentSession();
		Criteria ct=session.createCriteria(Blog.class);
		ct.add(Restrictions.eq("postedby",postedby));
		ct.add(Restrictions.eq("status",true));
		List<Blog> list=ct.list();	
		return list;
		
	}
	

}

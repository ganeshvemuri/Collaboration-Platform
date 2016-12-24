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

import com.chat.model.Users;
@Transactional
@Repository
public class UserDaoImpl implements UserDao{

	@Autowired
	SessionFactory sessionfactory;
	public void registerUser(Users user) {
		user.setRole("ROLE_USER");
		sessionfactory.getCurrentSession().save(user);
		
	}
	public List<Users> getUsers() {
		Session session=sessionfactory.getCurrentSession();
		
		
		String hql="from Users";
		Query query=session.createQuery(hql);
		return query.list();
		/*  List<Users> list=session.createCriteria(Users.class).list();
		
		return list;*/
	}
	public int validateUser(String username, String password) {
		int res=0;
		Session session=sessionfactory.getCurrentSession();
		Query result=session.createQuery("from Users u where u.username='"+username+"'");
		
		List<Users> user=result.list();
		System.out.println("users:"+user);
		
		if(user.size()==0)
		{
			res=0;
		}
		else
		{
			for(int i=0;i<user.size();i++)
			{
				System.out.println("inside loop");
				String name=user.get(i).getUsername();
				String pwd=user.get(i).getPassword();
				String dbrole=user.get(i).getRole();
				if(name.equals(username) && pwd.equals(password) && dbrole.equals("ROLE_USER"))
				{
					res=1;
					System.out.println("The Result is:" +res);
				}
				else
					if(name.equals(username) && pwd.equals(password) && dbrole.equals("ROLE_ADMIN"))
					{
						res=2;
						System.out.println("The Result is:" +res);
					}
				
			}
		}
		return res;
	}
	public void updateUser(Users user) {
		// TODO Auto-generated method stub
		sessionfactory.getCurrentSession().update(user);
	}
	public Users viewUserById(int id) {
		// TODO Auto-generated method stub
		Session session=sessionfactory.getCurrentSession();
		Users users=(Users)session.get(Users.class, id);
		return users;
	}
	
	public List<Users> findFriends(String username) {
		Session session=sessionfactory.getCurrentSession();
		
		  Criteria ct=session.createCriteria(Users.class);
		  ct.add(Restrictions.ne("username",username));
		  ct.add(Restrictions.eq("role","ROLE_USER"));
		  List list=ct.list();
		return list;
	}
	
	
}

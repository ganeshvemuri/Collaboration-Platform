package com.chat.Dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chat.model.AddFriend;

@Transactional
@Repository
public class FindFriendDaoImpl implements FindFriendDao {

	@Autowired
	SessionFactory sessionfactory;
	
	public void addFriend(AddFriend friend) {
		sessionfactory.getCurrentSession().save(friend);		
	}

	public void updateFriend(AddFriend friend) {
		sessionfactory.getCurrentSession().update(friend);		
	}

	public void deleteFriend(AddFriend friend) {
		sessionfactory.getCurrentSession().delete(friend);		
	}

	public List<AddFriend> viewFriends(String username) {
		
		Criteria ct=sessionfactory.getCurrentSession().createCriteria(AddFriend.class);
		ct.add(Restrictions.eq("username",username));
		List list=ct.list();
			return list;

	}
	

}

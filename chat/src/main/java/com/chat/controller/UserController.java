package com.chat.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.chat.Dao.BlogDao;
import com.chat.Dao.CareerDao;
import com.chat.Dao.FindFriendDao;
import com.chat.Dao.ForumDao;
import com.chat.Dao.UserDao;
import com.chat.model.Blog;
import com.chat.model.Career;
import com.chat.model.AddFriend;
import com.chat.model.Forum;
import com.chat.model.Users;
import com.chat.model.jobRegistration;

@RestController
public class UserController {
	
	@Autowired
	UserDao userDao;
	
	
	
	
	/*REGISTER*/
	@RequestMapping(value="/fileUpload", method=RequestMethod.POST)
	public void addUser(@RequestParam("file") MultipartFile file,@RequestParam("username") String username,@RequestParam("email") String email,@RequestParam("password") String password,@RequestParam("country") String country)
	{
		System.out.println("Inside");
		System.out.println("file:"+file);
		System.out.println("UserName:"+username+"\t"+email+"\t"+password+"\t"+country);
		Users user=new Users();
		user.setUsername(username);
		user.setEmail(email);
		user.setPassword(password);
		user.setCountry(country);
		
		userDao.registerUser(user);
		//Path path=Paths.get("H://letzchaat//Letzchaatfront//WebContent//images//"+username+".jpg");
		Path path=Paths.get("C://Users//Sai Ganesh//Desktop//NIIT DT//project2.2//chatFront//WebContent//images//"+username+".jpg");
		if(file!=null)
		{
			try {
				file.transferTo(new File(path.toString()));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}

		
		//System.out.println("file:"+file.getContentType());
		/*System.out.println("file data:"+user.getImageData());
		userDao.addUser(user);*/
	}

	
	@RequestMapping(value = "/getUsers", method = RequestMethod.GET, headers = "Accept=application/json")  
	 public List<Users> getUsers()
	 {
		 List<Users> users=userDao.getUsers();
		return users;
	 }
	
	
	
	
	
	
	
	/*BLOG*/
	@Autowired
	BlogDao blogDao;
	
		@RequestMapping(value="/createBlog",headers="Accept=Application/json",method=RequestMethod.POST)
	
	public void saveBlog(@RequestBody Blog blog)
	{
		blogDao.createBlog(blog);
	}
	
		@RequestMapping(value="/viewBlogs",headers="Accept=application/json",method=RequestMethod.GET)
	public List<Blog> viewBlogs()
	{
		List<Blog> blog=blogDao.viewBlogs();
		return blog;
	}
		
	@RequestMapping(value="/viewMyBlogs/{postedby}",headers="Accept=Application/json",method=RequestMethod.GET)
	public List<Blog> viewMyBlogs(@PathVariable("postedby") String postedby)
	{
		return blogDao.viewMyBlogs(postedby);
			
	}
	@RequestMapping(value="/updateBlog",headers="Accept=application/json",method=RequestMethod.PUT)
	public void updateBlog(@RequestBody Blog blog)
	{
		System.out.println("Inside update blog");
		blogDao.updateBlog(blog);
	}
	@RequestMapping(value="/deleteBlog/{blog_Id}",headers="Accept=Application/json",method=RequestMethod.DELETE)
	public void deleteJob(@PathVariable int blog_Id)
	{
		blogDao.deleteBlog(blog_Id);
	}

	
		
	
	/*JOB*/
	@Autowired
	CareerDao careerDao;

	@RequestMapping(value="/createJob",headers="Accept=Application/json",method=RequestMethod.POST)
	
	public void saveCareer(@RequestBody Career career)
	{
		careerDao.createJob(career);
	}
	
	@RequestMapping(value="/viewCareers",headers="Accept=Application/json",method=RequestMethod.GET)
	
	public List<Career> viewJobs()
	{
		List<Career> career=careerDao.viewCareers();
		return career;
	}
	
	@RequestMapping(value="/updateCareers",headers="Accept=Application/json",method=RequestMethod.PUT)
	public void updateCareer(@RequestBody Career career)
	{
		careerDao.updateCareers(career);
	}
	
	@RequestMapping(value="deleteJobs/{job_Id}",headers="Accept=Application/json",method=RequestMethod.DELETE)
	public void deleteJobs(@PathVariable int job_Id)
	{
		careerDao.deleteJobs(job_Id);
		
	}
	@RequestMapping(value="/registerJob",headers="Accept=Application/json",method=RequestMethod.POST)
	public void registerJob(@RequestBody jobRegistration jobReg)
	{
		careerDao.registerJob(jobReg);
	}
	
	
	
	
	/*FORUM*/
	
	@Autowired
	ForumDao forumDao;
	@RequestMapping(value="/createForum",headers="Accept=Application/json",method=RequestMethod.POST)
	public void createForum(@RequestBody Forum forum ){

		forumDao.createForum(forum);
	}
	@RequestMapping(value="/viewForum",headers="Accept=Application/json",method=RequestMethod.GET)
	public List<Forum> viewForum(){
		
		return forumDao.viewForum();
		
	}
	@RequestMapping(value="/updateForum",headers="Accept=Application/json",method=RequestMethod.PUT)
	public void updateBlog(@RequestBody Forum forum)
	{
		System.out.println("Inside update forum");
		forumDao.updateForum(forum);
	}
	@RequestMapping(value="/deleteForum/{forum_Id}",headers="Accept=Application/json",method=RequestMethod.DELETE)
	public void deleteForum(@PathVariable int forum_Id)
	{
		forumDao.deleteForum(forum_Id);
	}
	

	
	
	
	/*AUTHENTICATION*/
	@RequestMapping(value="/authenticate", method=RequestMethod.POST,headers="Accept=application/json")
	public int authenticateUser(@RequestBody Users user)
	{
		System.out.println("In Authenticate");
		System.out.println("name:"+user.getUsername());
		System.out.println("password:"+user.getPassword());
		int result=0;
		result=userDao.validateUser(user.getUsername(), user.getPassword());
		System.out.println("result is:"+result);
		
		return result;
	}
	@RequestMapping(value = "/findFriends/{username}", method = RequestMethod.GET, headers = "Accept=application/json")  
	public List<Users> findFriends(@PathVariable String username)
	{
		 List<Users> users=userDao.findFriends(username);
		return users;
	}



	
	
	/*FIND FRIENDS*/
	@Autowired
	FindFriendDao friendDao;
	@RequestMapping(value="/addFriend",headers="accept=Application/json",method=RequestMethod.POST)
	public void addFriend(@RequestBody AddFriend friend)
	{
		friendDao.addFriend(friend);
	}

	
	@RequestMapping(value="/viewFriends/{username}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<AddFriend> viewFriends(@PathVariable("username") String username)
	{
		return friendDao.viewFriends(username);
	}
	
	@RequestMapping(value="/deleteFriend",headers="accept=Application/json",method=RequestMethod.POST)
	public void deleteFriend(@RequestBody AddFriend friend)
	{
		friendDao.deleteFriend(friend);
	}
	
	
	@RequestMapping(value="/updateFriend",headers="accept=Application/json",method=RequestMethod.PUT)
	public void updateFriend(@RequestBody AddFriend friend)
	{
		friendDao.updateFriend(friend);
	}

	
	
	
	
	
	
	
	
	
	

}






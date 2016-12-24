package com.chat.Dao;

import java.util.List;

import com.chat.model.Blog;

public interface BlogDao {

		void createBlog(Blog blog);
		List<Blog> viewBlogs();
		void updateBlog(Blog blog);
		void deleteBlog(int blog_Id);
		//List<Blog> viewBlog(boolean status);
		List<Blog> viewMyBlogs(String postedby);
}

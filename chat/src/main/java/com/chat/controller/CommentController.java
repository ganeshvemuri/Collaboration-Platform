package com.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chat.Dao.CommentDao;
import com.chat.model.Comment;


@RestController
public class CommentController {

	@Autowired
	CommentDao commentdao;
	
	@RequestMapping(value="/makeComment",headers="accept=Application/json",method=RequestMethod.POST)
	public void makeComment(@RequestBody Comment comment )
	{
		commentdao.addComment(comment);
			}
	@RequestMapping(value="/viewComments/{blog_Id}",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Comment> viewComments(@PathVariable("blog_Id") int blog_Id)
		{
			
			return commentdao.viewComments(blog_Id);
		}
}

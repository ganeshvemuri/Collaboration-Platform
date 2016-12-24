
var chatworld=angular.module("chat",["ngRoute"]);
chatworld.config(function($routeProvider)
{
	$routeProvider.when("/register",
			{
		templateUrl:"partials/register.html",
		controller:"registerController"
	
			})
			
	.when("/blog",
			{
		templateUrl:"partials/blog.html",
		controller:"blogController"
		
	        })
	 .when("/blogAdmin",
			{
		templateUrl:"partials/blogAdmin.html",
		controller:"adminBlogController"
		
	        })
	 .when("/allblogs",
			{
		templateUrl:"partials/allblogs.html",
		controller:"allblogsController"
		
			})
	 .when("/admin",
			{
		templateUrl:'partials/admin.html',
		controller:'adminController'					
			})
	.when("/userHome",
			{
		templateUrl:'partials/userHome.html',
		controller:'userHomeController'					
			})
	.when("/career",
			{
		templateUrl:"partials/career.html",
		controller:"careerController"
			})
	.when("/chat",
			{
		templateUrl:"partials/chat.html",
	controller:'chatController'
			})
	.when("/careeruser",
			{
		templateUrl:"partials/careeruser.html",
		controller:"careeruserController"
			})
	/*.when("/adminJobs",
			{
		templateUrl:"partials/adminJobs.html",
		controller:"adminJobsController"
			})*/
	.when("/forum",
			{
		templateUrl:"partials/forum.html",
	    controller:"forumController"
		    })

	.when("/login",
			{
		templateUrl:"partials/login.html",
		controller:"loginController"
			})
	.when("/logout",
			{
		templateUrl:"partials/logout.html",
		controller:"logoutController"
			});
});

/*chatworld.controller("registerController",function($scope,$http)
		{
			console.log("iam in register controller")
			$scope.register=function()
			{
				var users={
						username:$scope.username,
						email:$scope.email,
						password:$scope.password,
						country:$scope.country
							};
				var res=$http.post("http://localhost:8081/chat/registerUser",users);
				res.success(function(data, status, headers, config)
				{
			console.log("status:"+status);
				});
			}
		});
*/

chatworld.controller('registerController',['$scope','fileUpload',function($scope,fileUpload)
      {
	
	
         console.log("i'm in register");
         
         $scope.register=function()
              {
              	 	var file=$scope.myFile;
               		var	username=$scope.username;
              		var	email=$scope.email;
                    var	password=$scope.password;
                    var	country=$scope.country;
               		console.log("username:"+username);
                 	console.log("file is");
                 	console.dir(file);
                  	var uploadUrl="http://localhost:8081/chat/fileUpload";
                    fileUpload.uploadFileToUrl(file,uploadUrl,username,email,password,country);
                    console.log("link correct");
                  };
                            	
         }]);

chatworld.service('fileUpload',['$http','$location',function($http,$scope,$location)
          {
              this.uploadFileToUrl=function(file,uploadUrl,username,email,password,country)
                  {
                       console.log("link correct");
                       var fd=new FormData();
                       fd.append('file',file);
                       fd.append('username',username);
                       fd.append('email',email);
                       fd.append('password',password);
                       fd.append('country',country);
                       console.log("fd"+fd);
                       $http.post(uploadUrl,fd,{transformRequest:angular.identity,
                                          	    headers:{'Content-Type':undefined}
                                          		})
                                          	    .success(function()
                                          		  {
                                          			$scope.message="u r successfully registerd ..u can login now";
                                          			$scope.username="";
                                          			$scope.password="";
                                          		  })
                                          		.error(function(){});
                   }
                                          	
              }]);
 chatworld.directive('fileModel',['$parse',function($parse) {
                                          	return{
                                                  	  link: function(scope, element, attrs) 
                                                  	  {
                                                  	  var model = $parse(attrs.fileModel);
                                                  	  var modelSetter = model.assign;
                                                  	          
                                                  	  element.bind('change', function()
                                                  			  {
                                                  	  scope.$apply(function()
                                                  		{
                                                  	  modelSetter(scope, element[0].files[0]);
                                                  	    });
                                                  	        });
                                                  	   }
                                                   };
                                            }]);




chatworld.controller("blogController",function($scope,$http,$rootScope)
		{
	$rootScope.blog=true;
	$rootScope.forum=true;
	$rootScope.career=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	//$location.path('/logout');
		console.log("b4 link");
			$http.get("http://localhost:8081/chat/viewMyBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});
			console.log("after link");
			console.log("blog controller");
			$scope.blog=function()
			{
				var blog={
						blog_Name:$scope.blog_Name,
						blog_Description:$scope.blog_Description,
						postedby:$scope.uname
							}
				console.log("title:"+blog);
            var res=$http.post("http://localhost:8081/chat/createBlog",blog);
  			$http.get("http://localhost:8081/chat/viewMyBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});

              res.success(function(data, status, headers, config)
						{
            	  			$scope.message = data;
            	  			console.log("status:"+status);
						});
			
			}
			$scope.editBlog=function(blog)
			{
				console.log("inside editblog");
				console.log("blog:"+blog);
				$scope.blogDataToEdit=blog;
			}
						 		 
			$scope.saveEdit=function()
			{
				var blog = {
		    				blog_Name:$scope.blogDataToEdit.blog_Name,
		    				blog_Description:$scope.blogDataToEdit.blog_Description,
		 					blog_Id:$scope.blogDataToEdit.blog_Id
		 		};
				$http.put('http://localhost:8081/chat/updateBlog', blog);
				

			$http.get("http://localhost:8081/chat/viewMyBlogs/"+$rootScope.uname).then(function (response) 
					{
						$scope.blogs = response.data;
						console.log("data:"+response.data);});
					}
			
		$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("In the delete blog");
				blog_Id:$scope.blogDataToEdit.blog_Id;
				console.log("blog_Id:"+blogDataToEdit.blog_Id);
				//$http.delete('http://localhost:8081/chat/deleteBlog/'+blogDataToEdit.blog_Id);
				
				$http['delete']('http://localhost:8081/chat/deleteBlog/'+blogDataToEdit.blog_Id);
				$http.get("http://localhost:8081/chat/viewMyBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});
			}
			
		});
chatworld.controller("adminBlogController",function($scope,$http,$rootScope)	
		{	
			$rootScope.login=false;
			$rootScope.Users=false;
	
			$rootScope.home=false;
			$rootScope.logout=true;
			$rootScope.users=true;
			$rootScope.registeredUsers=true;
	
			console.log(" in adminblog controller");
	
			$http.get("http://localhost:8081/chat/viewBlogs").then(function (response) 
					{
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
					});
			
				$scope.AppDisapp=function(adminblog)
				{
					console.log("inside appdisappblog");
					console.log("adminblog:"+adminblog);
					$scope.blogstatus=adminblog;
				}
				$scope.approveBlog=function()
				{
					console.log("in approveblog");
					var edit=
					{
							blog_Id:$scope.blogstatus.blog_Id,
							blog_Name:$scope.blogstatus.blog_Name,
							blog_Description:$scope.blogstatus.blog_Description,
							postedby:$scope.blogstatus.postedby,
							status:true
					}
				$http.put("http://localhost:8081/chat/updateBlog",edit);
				$http.get("http://localhost:8081/chat/viewBlogs").then(function (response) 
						{
	    	
					$scope.blogs = response.data;
	    	
					console.log("data:"+response.data);
						});
				}
				
				
				
			$scope.disapproveBlog=function()
				{
					console.log("in disapproveblog");
					var edit=
					{
							blog_Id:$scope.blogstatus.blog_Id,
							blog_Name:$scope.blogstatus.blog_Name,
							blog_Description:$scope.blogstatus.blog_Description,
							postedby:$scope.blogstatus.postedby,
							status:false
					}
					$http.put("http://localhost:8081/chat/updateBlog",edit);
					$http.get("http://localhost:8081/chat/viewBlogs").then(function (response) 
					{
	    	
						$scope.blogs = response.data;
	    	
						console.log("data:"+response.data);
					});
					}

		});	


chatworld.controller("allblogsController",function($scope,$http,$rootScope)	
		{	
			$rootScope.userforum=false;
			$rootScope.userjobs=true;
			$rootScope.adminblog=false;
			$rootScope.adminforum=false;
			$rootScope.register=false;
			$rootScope.home=false;
			$rootScope.addjobs=false;
			$rootScope.login=false;
			$rootScope.jobs=false;
			$rootScope.blog=true;
			$rootScope.userforum=true;
			$rootScope.logout=true;
	
	
				console.log("username in allmyblog controller:"+$rootScope.username);
				$http.get("http://localhost:8081/chat/viewBlogs").then(function (response) 
						{
			    	
							$scope.blogs = response.data;
			    	
							console.log("data:"+response.data);
						});
				
			$rootScope.logout=true;
	    	console.log("in view blog")
	    	        
	    	$scope.makeComment=function(allblogs)
	    	      {
	                $scope.commentblog=allblogs;
	    	      }
	    	        
	    	$scope.newComment={}; 
	    	$scope.addComment=function(newComment)
				  {
						var comments = 
						{
				    			blog_Id:$scope.commentblog.blog_Id,
				    			comment:$scope.comment,
				    			username:$rootScope.uname		 				
						}
					console.log("title:"+comments);
			
						
			 $http.post("http://localhost:8081/chat/makeComment",comments)
			 $http.get("http://localhost:8081/chat/viewBlogs").then(function (response) 
						{
										$scope.allblogs = response.data;
									console.log("data:"+response.data);
						});
	    	        
	    /*	$http.get("http://localhost:8081/chat/viewBlogs").then(function (response) {$scope.blogs = response.data;});
	    	        console.log("root scope likes:"+$rootScope.likes);
	    	        console.log("this is viewblogs controller");
	    			$scope.message="you are in view blogs";
	    			$scope.likes=function () {
	    		    console.log("inside the like function");
	    			likes=likes+1;	
	    			console.log("no of likes:"+likes);
	    			$rootScope.likes=likes;
	    			console.log("root scope likes:"+$rootScope.likes);*/
	    		}
	    		    
	    			$scope.commentsList=function(allblogs)
	    			{ 
	    				console.log("xyzzz")
	    				$scope.viewcomments=allblogs
	    				
	    			$http.get("http://localhost:8081/chat/viewComments/"+$scope.viewcomments.blog_Id).then(function (response) 
	    						{
	    									    	
	    							$scope.commentlist = response.data;
	    									    	
	    							console.log("data:"+response.data);
	    						});
	    				
	    			}
	    			
	    			
	    			
	    			
	    
		});











chatworld.controller("careerController",function($scope,$http,$rootScope)
		{
	$rootScope.blog=true;
	$rootScope.forum=true;
	$rootScope.career=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	//$location.path('/logout');
			$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});
			console.log("in career controller");
			$scope.job=function()
			{
				var obj={
						job_Role:$scope.job_Role,
						job_Description:$scope.job_Description,
						eligibility:$scope.eligibility
							};
            var res=$http.post("http://localhost:8081/chat/createJob",obj);
  			$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});

              res.success(function(data, status, headers, config)
						{
            	  			$scope.message = data;
            	  			console.log("status:"+status);
						});
			
			}
			$scope.editJob=function(career)
			{
				console.log("inside editJob");
				console.log("Career:"+career);
				$scope.careerDataToEdit=career;
			}
						 		 
			$scope.saveEdit=function()
			{
				var job = {
							job_Id:$scope.careerDataToEdit.job_Id,
		    				job_Role:$scope.careerDataToEdit.job_Role,
		    				job_Description:$scope.careerDataToEdit.job_Description,
		 					eligibility:$scope.careerDataToEdit.eligibility
		 		};
				$http.put('http://localhost:8081/chat/updateCareers', job);
				

			$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});
			}
			
			
			$scope.deleteJob=function(careerDataToEdit)
			{
				console.log("In the delete Job");
				job_Id:$scope.careerDataToEdit.job_Id;
				console.log("job_Id:"+careerDataToEdit.job_Id);
				//$http.delete('http://localhost:8081/chat/deleteCareers'+careerDataToEdit.job_Id);
				$http['delete']('http://localhost:8081/chat/deleteJobs/'+careerDataToEdit.job_Id);
				$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});
			}
			
		});


/*chatworld.controller("careeruserController",function($scope,$http,$rootScope)
		{
	$rootScope.blog=true;
	$rootScope.forum=true;
	$rootScope.career=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	//$location.path('/logout');
			$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});
			console.log("in career controller");
			$scope.applyJob=function()
			{
				var obj={
						job_Id:$scope.job_Id,
						name:$scope.name,
						stream:$scope.stream,
						percentage:$scope.percentage
						};
            var res=$http.post("http://localhost:8081/chat/createJob",obj);
  			$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});

              res.success(function(data, status, headers, config)
						{
            	  			$scope.message = data;
            	  			console.log("status:"+status);
						});
			
			}
			$scope.editJob=function(career)
			{
				console.log("inside editJob");
				console.log("Career:"+career);
				$scope.careerDataToEdit=career;
			}
						 		 
			$scope.saveEdit=function()
			{
				var job = {
							job_Id:$scope.careerDataToEdit.job_Id,
		    				job_Role:$scope.careerDataToEdit.job_Role,
		    				job_Description:$scope.careerDataToEdit.job_Description,
		 					eligibility:$scope.careerDataToEdit.eligibility
		 		};
				$http.put('http://localhost:8081/chat/updateCareers', job);
				

			$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});
			}
			
			
			$scope.deleteJob=function(careerDataToEdit)
			{
				console.log("In the delete Job");
				job_Id:$scope.careerDataToEdit.job_Id;
				console.log("job_Id:"+careerDataToEdit.job_Id);
				//$http.delete('http://localhost:8081/chat/deleteCareers'+careerDataToEdit.job_Id);
				$http['delete']('http://localhost:8081/chat/deleteJobs/'+careerDataToEdit.job_Id);
				$http.get("http://localhost:8081/chat/viewCareers").then(function (response) {$scope.careers = response.data;});
			}
			
		});
*/

chatworld.controller("adminController",function($scope,$http)
		{
			$scope.message="this is admin home"
		});








/*chatworld.controller("loginController",function($scope,$http)
		{
			console.log("in login controller");
			$scope.login=function()
			{
				var login={
						
						username:$scope.username,
						password:$scope.password
								};
			var res=$http.post("http://localhost:8081/chat/authenticate",login);
					res.success(function(data, status, headers, config)
						{
					console.log("status:"+status);
						});
			}
			
		
		
		});

*/
chatworld.controller("loginController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)
              {
              	console.log("in login controller");
              	$scope.login=function()
              		{
              		
              			var login={
              			username:$scope.username,
              			password:$scope.password
              							
              		} 
             	$http.post("http://localhost:8081/chat/authenticate",login).then(function(response)
             		{
             			console.log("result data:"+response.data);
                 		 var r=response.data.toString();
             			 console.log("response:"+r);
                				     
                			if(r==1)
                				{

                							
                					$rootScope.blog=true;
                					
                			     	$rootScope.careeruser=true;
                			     	$rootScope.career=false;
                            		$rootScope.login=false;
                					$rootScope.register=false;
                					$rootScope.allblogs=true;		
                					$rootScope.logout=true;
                					$rootScope.chat=true;
                					$rootScope.forum=true;		
                					console.log('logout:'+$rootScope.logout);
                					console.log("logged out:"+response.data);
                					console.log("uname from root scope:"+$rootScope.uname);
        							$rootScope.uname=$scope.username;
        							$rootScope.id=$scope.id;
        							console.log("uname:"+$rootScope.uname);
                					$location.path('/userHome');
                							}
                						if(r==0)
                							{
                							$scope.username="";
                							$scope.password="";
                							$scope.message="username/password incorrect";
                							$location.path('/login');
                							}
                						if(r==2)
                						{
                							$rootScope.login=false;
                							$rootScope.register=false;
                							$rootScope.blogAdmin=true;
                							$rootScope.forum=true;
                							$rootScope.users=false;
                							$rootScope.blog=false;
                							$rootScope.logout=true;
                							$rootScope.career=true;
                							$rootScope.careeruser=true;
                						$location.path('/admin');
                						}
                							}	
                				 ); 
                							 }
                						}]);
                						
/*chatworld.controller("forumController",function($scope,$http,$rootScope)
		{
	console.log("in forum");
	$rootScope.login=false;
	$rootScope.register=false;
	$scope.forum=function()
	{
		var forum={
				questionName:$scope.questionName,
				response:$scope.response
				
		};
		var res=$http.post("http://localhost:8081/chat/createForum",forum); 
		res.success(function(data, status, headers, config) {
		console.log("status:"+status);
	});
	}
	
	});
*/


chatworld.controller("forumController",function($scope,$http,$rootScope)
		{
	$http.get("http://localhost:8081/chat/viewForum").then(function (response) {$scope.forums= response.data;});

	console.log("in forum");
	$rootScope.blogs=true;
	$rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	
	$scope.addForum=function()
	{
		var forum={
				question_Name:$scope.question_Name
				//question_Description:$scope.question_Description
				
					};
		var res=$http.post("http://localhost:8081/chat/createForum",forum); 
		$http.get("http://localhost:8081/chat/viewForum").then(function (response) {$scope.forums = response.data;});
		res.success(function(data, status, headers, config) 
				{
					$scope.message = data;
					console.log("status:"+status);
				});
	}
	$scope.editForum=function(forum)
	{
		console.log("inside editforum");
		console.log("forum:"+forum);
		$scope.forumDataToEdit=forum;
	}
	$scope.saveEdit=function()
	{
		var forum={
				question_Id:$scope.forumDataToEdit.question_Id,
				question_Name:$scope.forumDataToEdit.question_Name
				//question_Description:$scope.forumDataToEdit.question_Description
		};
	$http.put('http://localhost:8081/chat/updateForum',forum);
	$http.get("http://localhost:8081/chat/viewForum").then(function (response) {$scope.forums = response.data;});
	}
	$scope.deleteForum=function(forumDataToEdit)
	{
		console.log("delete forum called");
		question_Id:$scope.forumDataToEdit.question_Id;
		console.log("question_Id:"+forumDataToEdit.question_Id);
		$http['delete']('http://localhost:8081/chat/deleteForum/'+forumDataToEdit.question_Id);
		$http.get("http://localhost:8081/chat/viewForum").then(function (response) {$scope.forums = response.data;});
	}
	});
chatworld.controller("userHomeController",function($scope,$http,$rootScope)	
		{	
	$rootScope.careeruser=true;
	$rootScope.career=false;
	$rootScope.blog=true;
	$rootScope.logout=true;
	$rootScope.allblogs=true;
	console.log("in userHome controller");
	$scope.findfriends=function()
	{
	console.log(" in findfriends function");
	console.log("name in  findfriends:"+$rootScope.uname);
			 $http.get("http://localhost:8081/chat/findFriends/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.friends = response.data;
			    	
			    	console.log("data:"+response.data);
			    
			    });
	}
	$scope.addfriend=function(user)
	{
		console.log("in addfriend");
		$scope.friend=user;
		
		console.log("friendname:"+$scope.friend.username);
		console.log("username:"+$rootScope.uname);
		var dosth=
			{
				username:$rootScope.uname,
				friend_Name:$scope.friend.username
			}
		$http.post("http://localhost:8081/chat/addFriend/",dosth);
	}
	$scope.friendslist=function()
	{
	console.log(" in friendslist function");
	console.log("name in  friendslist:"+$rootScope.uname);
			 $http.get("http://localhost:8081/chat/viewFriends/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.friendslist = response.data;
			    	
			    	console.log("data:"+response.data);
			    
			    });
	}
	});

chatworld.controller('logoutController',function($scope,$rootScope,$http) 
					{
	$rootScope.careeruser=false;
 	$rootScope.career=false;
	$rootScope.login=true;
	$rootScope.register=true;
	$rootScope.allblogs=false;		
	$rootScope.logout=false;
	$rootScope.blog=false;
	$rootScope.forum=false;
			});
		
		



chatworld.service("ChatService", function($q, $timeout) {
    
    var service = {}, listener = $q.defer(), socket = {
      client: null,
      stomp: null
    }, messageIds = [];
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/chat/chat";
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";
    
    service.receive = function() {
      return listener.promise;
    };
    
    service.send = function(message) {
    	console.log("in send function");
      var id = Math.floor(Math.random() * 1000000);
      socket.stomp.send(service.CHAT_BROKER, {
        priority: 9
      }, JSON.stringify({
        message: message,
        id: id
      }));
      messageIds.push(id);
    };
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
      var message = JSON.parse(data), out = {};
      out.message = message.message;
      out.username = message.username;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)) {
        out.self = true;
        messageIds = _.remove(messageIds, message.id);
      }
      return out;
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getMessage(data.body));
      });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };
    
    initialize();
    return service;
  });
chatworld.controller("chatController",function($scope,$http,ChatService)
		{
	console.log("in chat  controller");
	$scope.messages = [];
	  $scope.message = "";
	  $scope.max = 140;
	  
	  $scope.addMessage = function() {
		  console.log("in addmessage fn");
	    ChatService.send($scope.message);
	    $scope.message = "";
	  };

	  ChatService.receive().then(null, null, function(message) {
		  console.log("inside recieeve:"+message);
		  console.log("inside recieeve:"+$scope.message);
	    $scope.messages.push(message);
	  });
	}
		);















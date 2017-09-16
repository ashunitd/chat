var User =require('../model/user');
var jsonwebtoken=require('jsonwebtoken');
var config=require('../../config');
var secretkey=config.secretKey;



function createToken(user){

	var token=jsonwebtoken.sign({
		_id:user._id,
		firstname:user.firstname,
		lastname:user.lastname
	}, secretkey,{
		expiresIn:1440
	});

	return token;

}

module.exports=function(app,express){
	var api=express.Router();
	api.post('/signup',function(req,res){
		var user=new User({
			firstname:req.body.firstname,
			lastname:req.body.lastname,
			email:req.body.email,
			phone:req.body.phone,
			password:req.body.password
		});
		var token=createToken(user);
		user.save(function(err){
			if(err){
				res.send(err);
				return
			}
			
			
			res.json({
				success:true,
				message:'user has been created',
				token:token
			});
		});
	});

	api.post('/users',function(req,res){

		User.find({},function(err,users){
			if(err){
				res.send(err);return;

			}
			res.json(users);

		});

	});

	api.post('/login',function(req,res){
		
		User.findOne({ email:req.body.email
		}).select('firstname lastname email phone password').exec(function(err,user){
			if(err)throw err;
			if(!user){

				res.send({message:"User Doesn't exist"});
			}else if(user){
				password=req.body.password;
				var validPassword=user.comparePassword(password);

				if(!validPassword){
					res.send({message:"invalid password"})
				}else{
					var token=createToken(user);

					res.json({
						success:true,
						message:"Succefully Logged In",
						token:token
					})
				}
			}
		});
	});

	api.use(function(req,res,next){
		console.log('somebody just come to our app');
		var token = req.body.token || req.param.token || req.headers['x-access-token'];
		
		
		if(token){

			jsonwebtoken.verify(token,secretkey,function(err,decoded){
				if(err){
					res.status(403).send({success:false,message:"failed to authenticate user"});

				}else{
					
					req.decoded=decoded;
					next();
				}
			});
		}else{
			
			res.status(403).send({success:false,message:'no token provided'});
		}
	});

	// api.route('/')
	// 	.post(function(req,res){
	// 		//console.log("hello");
	// 		var story= new Story({
	// 			creator:req.decoded.id,
	// 			content:req.body.content
	// 		});
	// 		story.save(function(err,newStory){
	// 			if(err){
	// 				res.send(err);
	// 				return;

	// 			}
	// 			io.emit('story',newStory); 
	// 			res.json({message:"New Story Created!"});

	// 		});
	// 	})

	// 	.get(function(req,res){
	// 		console.log("hello india");
	// 		Story.find({creator:req.decoded.id},function(err,stories){
	// 			if(err){
	// 				res.send(err);
	// 				return;
	// 			}
	// 			res.json(stories);
	// 		});
	// 	});

	api.get('/me',function(req,res){
		res.json(req.decoded);

	});

	return api
}
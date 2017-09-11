var config=require('./config');
var mongoose=require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var nicknames=[];

mongoose.connect(config.database,function(err){
	if(err){
		console.log(err)
	}else{
		console.log("Database Connected Successfully");
	}
})



io.on("connection",function(socket){

	socket.on("new-message",function(msg,id){
		
	io.emit("recieved",msg,id);

})
})


io.on("connection",function(socket){

 	socket.on("my-message",function(msg){
 		io.sockets.connected[msg.id].emit("message",msg);
 		
 	})
})


io.on("connection",function(socket){

		socket.on('connected',function(data){
			
			if(nicknames.indexOf(data) !=-1){
				


			}else{
				
				socket.nickname=data;

			var users={
					username:socket.nickname,
					id:socket.id
			};
					
				

				//nicknames.push(users);
				updatenickNames(users);



			}
		});

	function updatenickNames(users){
			io.emit('usernames',users);
	}

	socket.on('disconnect',function(data,users){
		
		if(!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname),1);
		updatenickNames(users);

	});

});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(express.static(__dirname + '/public'));

var api=require('./app/routes/api')(app,express);
app.use('/api',api)


app.get('*',function(req,res){
	res.sendFile(__dirname+'/public/views/index.html');

});



http.listen(config.port,function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('listening on port', http.address().port);

	}
})


var express = require('express');

var router = express.Router();


var mongoose = require('mongoose');

mongoose.connect('localhost:27017/sunil');
var Schema = mongoose.Schema;

var userData = new Schema({
name:String,
mobile:Number,
password:String,
email:String
});

var User = mongoose.model('user',userData);

/* GET home page. */

router.get('/', function(req, res, next) {
 
 	res.render('index', { title: 'Express' });

});

router.post('/signup', function(req, res, next) {
 
	var item = {
		email:req.body.username,
		password:req.body.password
		};
	var uData = new User(item);
	uData.save();
 	res.render('login', { message: 'Sign up successful'});

});



router.get('/login', function(req, res, next) {
 
 	res.render('login', { message: null});

});

router.post('/login', function(req, res, next) {
	
	User.find({email:req.body.email,password:req.body.password}).then(function(record,error){
		if(record && record.length>0){
			res.render('login', { message: 'login success'});


		}else{
			res.render('login', { message: 'login failed'});


		}	
	})
 ;
});


module.exports = router;

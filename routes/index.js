var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB', {useMongoClient:true});
var commentSchema = mongoose.Schema({
	Name:String,
	Comment:String
});

var Comment = mongoose.model('Comment', commentSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',function() {
	console.log("connected");
});

router.get('/comment', function(req,res,next) {
	console.log("In Comment Get");
	Comment.find(function(err,commentList) {
		if(err) return console.error(err);
		else res.json(commentList);
	});
});

router.post('/comment', function(req,res,next) {
	console.log("In Comment");
	console.log(req.body);
	var newcomment = new Comment(req.body);
	newcomment.save(function(err,post) {
		if(err) return console.error(err);
		console.log(post);
		res.sendStatus(200);
	});
});

router.delete('/comment', function(req, res, next) {
	console.log("In Comment Delete");
	Comment.remove(function(err) {
		if(err) return console.error(err);
		else res.sendStatus(200);
	});
});

module.exports = router;

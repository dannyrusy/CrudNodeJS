var express = require("express");
var crud = require("./CrudDB.js");
var app = express();

var router = express.Router();
var path = __dirname + '/views/';

crud.init();

router.use(function (req,res,next) {
  //console.log("/" + req.method);
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

router.get("/indirizzi",function(req,res){
	var result = crud.selectAll("indirizzi", function (data) {
	    res.send(data);
	});
});

router.get("/indirizziByID/:id",function(req,res){
	var id = req.params.id;
	var result = crud.selectAllByID("indirizzi", id, function (data) {
	   res.send(data);
	});
});

router.get("/addIndirizzo",function(req,res){
	var params = req.query;
	crud.insert("indirizzi", params, function (data) {
		res.send(data);
	});
});

router.get("/updateIndirizzo/:id",function(req,res){
	var id = req.params.id;
	var params = req.query;
	crud.update("indirizzi", id, params, function (data) {
		res.send(data);
	});
});

router.get("/deleteIndirizziByID/:id",function(req,res){
	var id = req.params.id;
	var result = crud.selectAllByID("indirizzi", id, function (data) {
		res.send(data);
	});
});

app.use("/",router);

app.use("*",function(req,res){
	res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

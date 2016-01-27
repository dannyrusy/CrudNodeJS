var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var connection;

module.exports = {

	init : function() {
		try {
			var configurationFile = 'configuration.json';
			var configuration = JSON.parse(
				    fs.readFileSync("config/"+configurationFile)
				);
			connection = mysql.createConnection({
				host : configuration.host,
				user : configuration.username,
				password : configuration.password,
				database : configuration.database,
			});
			connection.connect();
			console.log("Connessione stabilita correttamente");
		} catch (e) {
			console.log(e.message);
		}
	},
	selectAll : function(tableName, callback) {
		var queryString = 'SELECT * FROM ' + tableName;

		connection.query(queryString, function(err, rows, fields) {
			if (err) {
				callback (err);
			} else {
				callback(rows);
			}
		});
	},
	selectAllByID : function(tableName, id, callback) {
		var queryString = "SELECT * FROM "+tableName+" where id = ? ";

		connection.query(queryString, [id], function(err, rows, fields) {
			if (err) {
				callback (err);
			} else {
				callback(rows);
			}
		});
	},
	insert : function(tableName, fields, callback) {
		
		//preparazione query di insert
		var queryString = 'INSERT INTO ' + tableName + ' ';
		var sep = "";
		var campi = ' ( ';
		var valori = ' VALUES ( ';
		var valoriArr = [];
		for ( var key in fields) {
			campi += sep + key;
			if (key == "GEO" ) {
				valori += sep + "ST_GeomFromText(?)";
				valoriArr.push("POINT("+fields[key].replace(',', ' ')+")");
			} else {
				valori += sep + "?";
				valoriArr.push(fields[key]);
			}
			sep = ", ";
		}
		campi += ') ';
		valori += ') ';
		queryString += campi + valori;
		
		//esecuzione con protezione da sql injection
		connection.query(queryString, valoriArr, function(err, rows, fields) {
			if (err) {
				callback (err);
			} else {
				var result = [];
				result.push("OK");
				callback(result);
			}
		});
		
	},
	update : function(tableName, id, fields, callback) {
		
		//preparazione query di insert
		var queryString = 'UPDATE ' + tableName + ' ';
		var sep = "";
		var campi = ' SET ';
		var valoriArr = [];
		for ( var key in fields) {
			if (key == "GEO" ) {
				campi += sep + key + " = ST_GeomFromText(?) ";
				valoriArr.push("POINT("+fields[key].replace(',', ' ')+")");
			} else {
				campi += sep + key + " = ? ";
				valoriArr.push(fields[key]);
			}
			
			sep = ", ";
		}
		queryString += campi;
		queryString += " WHERE ID = ? ";
		valoriArr.push(id);
		
		//esecuzione con protezione da sql injection
		var query = connection.query(queryString, valoriArr, function(err, rows, fields) {
			if (err) {
				callback (err);
			} else {
				var result = [];
				result.push("OK");
				callback(result);
			}
		});
		console.log(query.sql);
	},
	deleteAllByID : function(tableName, id, callback) {
		var queryString = "DELETE FROM "+tableName+" where id = ? ";

		connection.query(queryString, [id], function(err, rows, fields) {
			if (err) {
				callback (err);
			} else {
				var result = [];
				result.push("OK");
				callback(result);
			}
		});
	}

};
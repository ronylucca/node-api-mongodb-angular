var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

// Mongoose connection
//mongod --dbpath ./data/db


mongoose.connect('mongodb://localhost/bookstore')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Mongo connected!')
    });
    var bookSchema = new mongoose.Schema({
        title: String
      });

    var Book = mongoose.model('Book', bookSchema);


//Get request

app.get('/', function(req, res){
    //var books = Book.find({title:"*"}, callback)
    
    Book.find(function (err, allBooks) {
        if (err) return console.error(err);
        console.log(allBooks);
        res.send("Hello World!" + allBooks);
      })

    
});

//server config
app.listen(3000);
console.log('Running server on 3000 port.');
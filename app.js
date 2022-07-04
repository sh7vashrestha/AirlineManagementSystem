const path = require('path');
const mysql=require('mysql');

//for express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//controller imported
const errorController = require('./controllers/error');


//For EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

//For css and JSON parsing 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes imported
const indexRoutes = require('./routes/home');

app.use('/', indexRoutes);
app.use(errorController.get404);

app.listen(5000, () =>{
    console.log("Port 5000 has been activated!");
})
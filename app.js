const path = require('path');

//for express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//For EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

//For css and JSON parsing 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//controller imported
const errorController = require('./controllers/error');

//Routes imported
const indexRoutes = require('./routes/home');
const passengerRoutes = require('./routes/passenger');
const adminRoutes = require('./routes/admin');

//Using Routes
app.use(indexRoutes);
app.use(adminRoutes);
app.use(passengerRoutes);
app.use(errorController.get404);

app.listen(5000, () =>{
    console.log("Port 5000 has been activated!");
})
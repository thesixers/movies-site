const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const requestIp = require('request-ip');
const authRoutes = require('./routes/authRoutes');
const otherRoutes = require('./routes/otherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { pageAuth, checkUser } = require('./middleware/authmiddleware');
const multer = require('multer');
const path = require('path');
const User = require('./models/user');
const  jwt = require('jsonwebtoken');
const { error } = require('console');


const app = express();
  
const myDB = 'mongodb+srv://GX-movie-admin:Amaga2003@genesix.yplxhqc.mongodb.net/';

mongoose.connect(myDB)
  .then((result) => {app.listen(2003); console.log('Connected!')})
  .catch((error) => { console.log(error) });
 
  app.set('view engine', 'ejs');

  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true })); 
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev')); 
  app.use(requestIp.mw());

  app.get('/', (req,res) => {
    res.redirect('/genesix');  
  }); 

  app.use('/genesix',otherRoutes); 

  app.use('/admin', adminRoutes);

  app.use(authRoutes); 

  app.use((req,res)=>{
    res.status(404).render('404'); 
    console.log(error.message); 
  });  


  
   

  


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
const fileUploader = require('express-fileupload');
require('dotenv').config();

const app = express();
const myDB = process.env.DATABASE_URL;

mongoose.connect(myDB)
  .then((result) => {app.listen(process.env.PORT || 2003); console.log('Connected!')})
  .catch((error) => { console.error(error) });
 
  app.set('view engine', 'ejs');

  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true })); 
  app.use(express.json());
  app.use(cookieParser());
  morgan.token('custom', (req, res) => {
    if (!req.url.includes('.jpg') && !req.url.includes('.png')) {
      return `${req.method} ${req.url} ${res.statusCode}`;
    }
    return null;
  });
  app.use(morgan(':custom')); 
  // app.use(requestIp.mw());
  app.use(fileUploader({useTempFiles: true}))

  app.get('/', (req,res) => {
     let ip = req.headers['cf-connecting-ip'] || 
      req.headers['x-real-ip'] || 
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress || '';
    console.log(`this is the user ip => ${ip}`);
    res.redirect('/genesix');  
  }); 

  app.use('/genesix',otherRoutes); 

  app.use('/admin', adminRoutes);

  app.use(authRoutes); 

  app.use((req,res)=>{
    res.status(404).render('404');  
  });  


  
   

  


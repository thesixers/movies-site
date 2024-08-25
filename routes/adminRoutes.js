const express = require('express');
const User = require('../models/user');
const path = require('path');
const  jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { handleError, adminAuth, adminToken, checkAdmin } = require('../middleware/authmiddleware');
const Movie  = require('../models/movies');
const multer = require('multer');
const {uploadMoviesImage, uploadFile, uploadImage} = require('../middleware/uploadmiddleware');
const Movies = require('../models/movies');


const router = express.Router();

router.get('*', checkAdmin );



//movieUpload

const maxAge = 1 * 24 * 60 * 60;

router.get('/login', async (req, res)=>{
 
  res.render('admin/adminLogin')
  
}); 

router.get('/', adminAuth, async (req, res)=>{
  try{
    let user = await User.find();
    res.render('admin/admin', {User : user});

  }
  catch(err){
    console.log(err.message);  
  }
  
});

router.get('/movies-upload',  (req, res)=>{
  res.render('movie-upload')  
});

router.get('/logout',  (req, res)=>{
  res.cookie('GenesixAdmin', '', {maxAge: 1});
  res.redirect('/admin/login')
});

router.get('/users', async (req,res) =>{
  try{
    let users = await User.find();
    if(users){
      res.render('admin/adminuser-list.ejs', {users: users, title: 'Users'})
    }
  }catch(err){
    console.log(err);
  }
})

router.get('/user/:id', adminAuth, (req, res)=>{

  const id = req.params.id;
 
  User.findById(id)  
  .then(result => {
    res.render('usersdetails', {user : result})

    res.send(result);
  })
  .catch(err =>{
    console.log(err.message);
  })
  
});

router.delete('/:id', adminAuth, (req,res) =>{
  const id = req.params.id;

  User.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect : '/admin' })
  })
  .catch(err =>{
    console.log(err.message)
  })
 
});

router.post('/adminStatus/:id', adminAuth, async (req,res) =>{
  const id = req.params.id;

  let { status } = req.body;

  let user = await User.findById(id);

  try{

    let Status = await user.updateOne({ status })


    res.json({ redirect : '/admin' })

 }
  catch(err){
    console.log(err.message); 
  } 
 
 
});

router.post('/login', async (req, res)=>{
 
  const { email, password } = req.body;

  try{
    const admin = await User.login({email, password});

    if(admin.status == 'ADMIN'){

      console.log(admin.status);

      const adminT = adminToken(admin._id);
      res.cookie('GenesixAdmin', adminT, {httpOnly: true, maxAge: maxAge * 1000});
      res.status(400).json({ admin: admin._id})
    }else{
      res.json({adminError: 'u are not an admin so piss off'})
    }

    // res.cookie('sign', token, {httpOnly: true, maxAge: maxAge * 1000});
    
  }
  catch(err){
    console.log(err);
    let errors = handleError(err);
    res.status(400).json({errors});
  }
});

router.post('/moviesupload', async (req, res)=>{
  let movieUrl;
  let movieImg;
  let episodes = [];
  let {title, description, language, quality, year, genre} = req.body;

  if(req.files){
    let {img,moviefile, epfile} = req.files;

    if(moviefile){
      console.log(moviefile);
      let mF = req.files.moviefile;

      let url = await uploadFile(mF);
      movieUrl = url
    }

    if(img){
      let mF = req.files.img;

      let url = await uploadImage(mF.tempFilePath);

      movieImg = url
    }

    if(epfile){
      let files =  Array.isArray(epfile)? epfile : [epfile];
      let count = 0;

      for(let file of files){
        let url = await uploadFile(file);
        episodes.push({
          episode: count++,
          url: url
        })
      }
    }

    console.log(episodes);
  }

    try{
      let upload = await Movies.create({
        title: title,
        filePath: movieUrl,
        description:description,
        language:language,
        quality:quality,
        year:year,
        image: movieImg,
        type:(movieUrl) ? 'Movie' : 'Series',
        genre:genre,
        episodes: episodes,
      })
  
      if(upload){

        res.json({
          message: 'upload successfull!!'
        })
        
      }else{
        res.json({error: 'this error occurred:' + err})
      }

    }
    catch(err){
      // gx.log(err)
      res.json({error: 'this error occurred:' + err});
    }
  });
  
router.post('/moviesupload/:id' , async (req,res) =>{
  const id = req.params.id;
  const {episodeNumber} = req.body
  console.log(id,req.files, req.body);
  if(!req.files) res.json({E: 'The files input field is empty nothing to upload'});

  if(!episodeNumber || episodeNumber.length === 0) res.json({E: 'the episode number field cant be empty'});

  
})  

module.exports = router; 

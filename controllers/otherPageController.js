const User = require('../models/user');
const Movie  = require('../models/movies');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const gx = require('genesix');
const uploadImage = require('../middleware/uploadmiddleware');



module.exports.home_get = (req, res) =>{

  Movie.find()
  .then(result =>{
    res.render('home',{movies: result});
  })
  .catch(err =>{
    console.log(err); 
  });

}

module.exports.movie_get = (req, res)=>{
  
  Movie.find()
  .then(result =>{
    res.render('movies',{movies: result});
  })
  .catch(err =>{
    console.log(err);
  });

}

module.exports.animation_get = (req, res)=>{

  Movie.find()
  .then(result =>{
    res.render('animation',{movies: result});
  })
  .catch(err =>{
    console.log(err);
  });
}

module.exports.series_get = (req, res)=>{

  Movie.find()
  .then(result =>{
    res.render('series',{movies: result});
  })
  .catch(err =>{ 
    console.log(err);
  });
} 

module.exports.picUpload_get = (req, res) =>{
  res.render('pic-upload');
}

module.exports.profileUpdate_get = (req, res) =>{
  res.render('profileUpdate', {title: 'profile update'});
}

module.exports.id = async (req,res) =>{
  const id = req.params.id;

  let movie = await Movie.findById(id);
  if(movie) res.render('movie-page', { movie });
 
}

module.exports.profileUpdate_post = async (req, res) =>{
  let {firstName,lastName,middleName,dob,gender} = req.body;

  const token = req.cookies.sign;

  if(token){
    jwt.verify( token,'Is Obi a boy?',async (err, decodedtoken) =>{
      if(err){
        console.log(err.message);
        res.redirect('/login')     
      }
      else{
        console.log(decodedtoken);
        let user = await User.findById(decodedtoken.id);

        try{       
           let saved = await user.updateOne({firstname: firstName,lastname: lastName,middlename: middleName,dob,gender});

           saved ? res.status(200).json({message: 'profile updated successfully!!!'}) 
           :
           res.status(400).json({error: 'this error occured while updating details'})
        }
        catch(err){
          res.status(500).json({error: 'server error'})
        }
        
      }

    })
  }
  else{
    res.redirect('/login');
  } 

}

module.exports.picUpload_post =  (req, res) =>{
  let token = req.cookies.sign;
      if(token){ 
        jwt.verify( token,'Is Obi a boy?',async (err, decodedtoken) =>{
          if(err){
            console.log(err.message);
            res.redirect('/login')    
          }
          else{
            // console.log(decodedtoken);
            let user = await User.findById(decodedtoken.id);
    
            try{       
              let file  = req.files.profileImage

             let uploaded =  await uploadImage(file.tempFilePath);

             if(uploaded){
              let url = uploaded;
               let isImageSaved = await user.updateOne({ imag: url });

               if(isImageSaved){
                  res.redirect('/genesix')
               }else{
                  gx.log('error in uploading image')
               }


             }

            // gx.log(file)
              
            }
            catch(err){
              console.log(err)
            }
            
          }
    
        })
      }else{
        res.json({
          message: 'Login Token is no longer valid!'
        })
      }
}

module.exports.movieSearch_post = async (req,res) =>{
  let nameUp = req.body;
  let all = [];
  
  let name = nameUp.nameUp;

  try{
    let result = await Movie.find(); 
    for(i = 0; i < result.length; i++){
      let single = result[i];

      if(single.title.toUpperCase().includes(name) && name !== ''){
        all.push(single);
        
      }

    }

    res.json({all});

  }
  catch(err){
    console.log(err.message)
  }
}
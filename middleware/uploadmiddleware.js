const cloudinary = require('cloudinary').v2;
require('dotenv').config();

let secret = process.env.CLOUDINARY_SECRET;
let api_key = process.env.CLOUDINARY_API_KEY;
let id = process.env.CLOUDINARY_ID;

const uploadImage =  async(image) =>{

    // Configuration
    cloudinary.config({ 
        cloud_name: id, 
        api_key: api_key, 
        api_secret: secret // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
            image,
            { folder: 'gx-users' }
       )
       .catch((error) => {
           console.log(error);
           return error;
       });
    
    
       let it = uploadResult.secure_url;
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(it, {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    return optimizeUrl; 

}

const uploadMovies =  async(movieImg,movie) =>{

    // Configuration
    cloudinary.config({ 
        cloud_name: id, 
        api_key: api_key, 
        api_secret: secret // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
            {movieImg,movie},
            { folder: 'gx-movies' }
       )
       .catch((error) => {
           console.log(error);
           return {err: error};
       });
    
    
       let it = uploadResult.secure_url;
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(it, {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    return {url: optimizeUrl}; 

}


module.exports = uploadImage, uploadMovies;
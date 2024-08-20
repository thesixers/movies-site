const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const drive = require('./serviceaccount');
const fs = require('fs');
const { Readable } = require('stream');

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

const uploadMoviesImage =  async(movie,dest) =>{

    // Configuration
    cloudinary.config({ 
        cloud_name: id, 
        api_key: api_key, 
        api_secret: secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
            movie,
            { folder: 'gx-movies' }
       )
       .catch((error) => {
           console.log(error);
           return {err: error};
       });
    
    
    return uploadResult.secure_url; 

}



async function uploadFile(file) {
    // let {name, data,mimetype} = file;
  try {
    const fileMetadata = {
        name: file.name,
        parents: ['12z75rPCyaziu8lgdgHox9MiD729wQc_A'], // Replace with the ID of the folder you shared with the service account
      };
      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.tempFilePath), // Directly use file.data which is a Buffer
      };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });


    // console.log('File Id:', response.data.id);
    makeFilePublic(response.data.id);
    let url = getShareableLink(response.data.id)
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

function bufferToStream(buffer) {
    const readable = new Readable();
    readable._read = () => {}; // _read is a no-op function
    readable.push(buffer);
    readable.push(null); // Indicates end of stream
    return readable;
  }

  

async function makeFilePublic(fileId) {

    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
    //   console.log(`File is now publicly accessible. File ID: ${fileId}`);
    } catch (error) {
      console.error('Error making file public:', error);
    }
  }

  function getShareableLink(fileId) {
    const shareableLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    return shareableLink;
  }
  
  


module.exports = {uploadImage, uploadMoviesImage, uploadFile};
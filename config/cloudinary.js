const cloudinary= require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

//configuration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY,
})

//instance for storage

const storage= new CloudinaryStorage({
    cloudinary,
    allowedFormats:['jpg','jpeg','png'],
    params:{
        folder:'blog-api',
        transformation:[{width:500, height:500, crop:"limit"}],
    }
})

module.exports= storage
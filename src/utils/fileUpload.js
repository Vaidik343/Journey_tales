require('dotenv').config();
const {v2 : cloudinary} = require('cloudinary')
const fs = require('fs')

const fileUpload = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" 
        })

        //file has been uploaded successfull


          if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

        console.log("file is uploaded on cloudinary", response.url)
        return {
            url:response.secure_url,
            public_id: response.public_id

        }
    } catch (error) {
         // ✅ SAFE DELETE (failure)
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
        // remove the locally saved temporary file as the upload failed
        console.log("🚀 ~ upload ~ error:", error)
        return null;
    }
}

    
const deleteFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: "image",
        });

        console.log("Delete from cloudinary", result);
        return result; 
    } catch (error) {
        console.log("🚀 ~ deleteFromCloudinary ~ error:", error)
        return null;
        
    }
}

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


module.exports = { fileUpload, deleteFromCloudinary };
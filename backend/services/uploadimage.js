const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        });

        // File uploaded successfully
        console.log("File is uploaded on Cloudinary:", response.url);

        return response;
    } catch (error) {
        // Log the error
        console.error("Error uploading to Cloudinary:", error);
 
        // Remove the locally saved file if upload fails
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        } 

        return null;
    }
};

module.exports = uploadOnCloudinary;

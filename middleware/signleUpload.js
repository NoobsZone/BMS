const multer = require("multer");
const path = require("path");

let  FIELD_NAME = "";
let UPLOAD_DIRECTORY = "";
let FILE_TYPES = [];

const storage = multer.diskStorage({
    //This is configuration object
    destination: (req, file, cb) => {
        //cb(error, directory);
        cb(null, UPLOAD_DIRECTORY);
    },
    filename: (req, file, cb) => {
        //File name after uploaded
        //cb(error, filename);
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                            .replace(fileExt, "")
                            .toLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();

        cb(null, file.fieldname + "-" + fileName + fileExt);
    }
}); 

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: (req, file, cb) => {
        // const types = /jpeg|jpg|png/;
        const extName = FILE_TYPES.test(path.extname(file.originalname).toLowerCase());
        const mimeType = FILE_TYPES.test(file.mimetype);

        if(extName && mimeType){
            //cb(error, upload or not)
            cb(null, true); //error back pattern 
        }
        else{
            cb(new Error("Only jpeg, png, jpg file support"));
        }
    }
});

const singleUpload = (fieldName, directory, fileTypes = []) => {

    FIELD_NAME = fieldName;
    UPLOAD_DIRECTORY = directory;
    if(fileTypes.length > 0){
        FILE_TYPES = "/";
        for(let i=0; i<fileTypes.length - 1; i++){
            FILE_TYPES += fileTypes[i];
        }
        FILE_TYPES = fileTypes[fileTypes.length - 1] + "/";
    }

    upload.single(FIELD_NAME);
    
};

module.exports = singleUpload;
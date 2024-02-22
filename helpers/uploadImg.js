const express = require('express');
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const whiteList = ['.jpg', '.jpeg', '.png'];

    const extname = path.extname(file.originalname).toLowerCase();
    if (whiteList.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueFilename = file.fieldname + '-' + Date.now() + Math.floor(Math.random() * 1000) + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});



const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

module.exports = upload;

const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");

const AWS = require("aws-sdk");
const {awsAccessId, awsAccessKey} = require("../config/env");

const aws_access_key_id = awsAccessId;
const secret_access_key = awsAccessKey;
//Config multer
const storage = multer.memoryStorage({
  destination(req, file, cb) {
    cb(null, "");
  },
});

const upload = multer({
  storage,
}).single("img");

//S3
const s3 = new AWS.S3({
  accessKeyId: aws_access_key_id,
  secretAccessKey: secret_access_key,
});

const uploadMiddleware = async (req, res, next) => {
  const fileName = req.file.originalname;
  console.log(fileName);
  const extention = fileName.split(".")[1];
  const newFile = uuid() + "." + extention;

  const uploadFileToS3 = await s3.upload({
    Bucket: "webmyngheha",
    Key: newFile,
    Body: req.file.buffer,
    ACL: "public-read",
  });

  const des = (await uploadFileToS3.promise()).Location;
  if (!req.upload) req.upload = {};
  if (!req.upload.file) req.upload.file = des;
  next();
};

module.exports = {
  uploadMiddleware,
  upload,
};
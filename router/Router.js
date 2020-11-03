const express= require("express");
const {
    getMain,
    getDogo,
    getNoithat,
    getSanvuon,
    getBlog,
    getArticle,
} = require("../controller/site");
const {
    postBlog,
    postUpload,
    postContinue,
    postDelete,
} = require("../controller/admin");

const {
    getPageAdmin,
    getSignin,
    postSignin,
    getRegister,
    postRegister,
    getLogout,
} = require("../controller/validate");


const {upload, uploadMiddleware} = require("../middleware/upload");
const Webproduct = require("../Models/Products");

const Router= express.Router();

Router.route("/").get(getMain);
Router.route("/do-go-my-nghe").get(getDogo);
Router.route("/noi-that").get(getNoithat);
Router.route("/san-vuon").get(getSanvuon);
Router.route("/blog").get(getBlog);
Router.route("/blog/:id").get(getArticle).post(getArticle);

Router.route("/admin-blog").post(upload,uploadMiddleware, postBlog);
Router.route("/admin-upload").post(upload, uploadMiddleware, postUpload);
Router.route("/redirect-to-admin").post(postContinue);
Router.route("/delete").post(postDelete);

Router.route("/page-admin").get(getPageAdmin);
Router.route("/signin").get(getSignin).post(postSignin);
Router.route("/register").get(getRegister).post(postRegister);
Router.route("/logout").get(getLogout);

module.exports = Router;
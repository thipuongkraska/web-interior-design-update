const {id,password} = require("../config/env");
const WebProduct = require("../Models/Products");
const BlogPost = require("../Models/Blog");

const postBlog = async function(req,res) {
    try {
        const {article, content, title, meta,alt} = req.body;
        const subContent = content.substr(0,5);
        const generateParam = article.toLowerCase();
        const generateString = generateParam.split(" ");
        const param = generateString.join("-");
        const date = new Date();
        const newBlog = new BlogPost({
            article: article,
            title: title,
            meta: meta,
            param: param,
            content: content,
            subContent: subContent,
            imgLink: req.upload.file,
            alt: alt,
            date: date,
        });
        await newBlog.save();
        return res.sendFile(__dirname + "/success.html");
    } catch (error) {
        console.log(error);
    }
}
const postUpload = async function(req,res,next) {
    console.log("admin is posting");
    try {
        const newProduct = new WebProduct({
            dogo: req.body.dogo,
            noithat: req.body.noithat,
            sanvuon: req.body.sanvuon,
            name: req.body.product,
            price: req.body.price,
            detail: req.body.detail,
            alt: req.body.alt,
            link: req.upload.file,
        });
        await newProduct.save();
        console.log(newProduct);
        return res.sendFile(__dirname + "/success.html");
    } catch (error) {
        console.log(error);
    }
};

const postContinue = function(req,res) {
    res.redirect("/page-admin");
};
const postDelete = async function(req,res) {
    const toDelete =req.body.tick;
    await WebProduct.findOneAndDelete({_id: toDelete});
    res.redirect("/page-admin");
}
module.exports = {
    postBlog,
    postUpload,
    postContinue,
    postDelete,
};

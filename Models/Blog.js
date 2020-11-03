const {Schema, model} = require("mongoose");

const blogSchema = new Schema({
    article: String,
    param: String,
    content: String,
    subContent: String,
    imgLink: String,
    alt: String,
    title: String,
    meta: String,
    date: String,
});

const BlogPost = model("BlogPost", blogSchema);

module.exports = BlogPost;
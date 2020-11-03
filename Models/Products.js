const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    dogo: String,
    noithat: String,
    sanvuon: String,
    name: String,
    price: String,
    detail: String,
    link: String,
    alt: String,
});

const WebProduct = model("Webproduct", productSchema);

module.exports = WebProduct;
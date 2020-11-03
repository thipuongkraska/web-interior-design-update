require("dotenv").config();
module.exports={
    id: process.env.ID,
    password: process.env.PASSWORD,
    url: process.env.DB_URL,
    secret: process.env.SECRET,
    awsAccessId: process.env.AWS_ACCESS_ID,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
};
const mongoose = require('mongoose');//Requiring Mongoose library to connect node.js and mongodb server
require('dotenv').config();

// const mongoUrl = process.env.mongodb_url_local;//This is the url of MongoDB server >> this you can get from cmd my giving command mongosh 
const mongoUrl = process.env.mongodb_url_online; //ye humne env file se url liya hain ...ye mongodb server jo online hain (mongodb atlas) yahan se iss database ko koi bhi access kar sakta hain...locolhost server se sirf hum he access kar sakte the

mongoose.connect(mongoUrl);

const db = mongoose.connection;//this is a default connection object of mongoose which is used to connect to the database


db.on('connected',()=>{ //connected is an event of Mongodb jo tab emit hota hai jab connection successful hota hai
    console.log("Connected to MongoDB successfully");//This will print when the connection is successful
})

db.on('error',(err)=>{ //error is an event of Mongodb jo tab emit hota hai jab connection successful nahi hota hai
    console.log("Error connecting to MongoDB",err);// 
});
//ye event db ko already pata hain db samjh jata hain inn word se 
db.on('disconnected',()=>{
    console.log("Disconnected from MongoDB successfully");//This will print when the connection is disconnected
})

// setTimeout(() => {
//     mongoose.disconnect(); // Disconnect from MongoDB after 5 seconds
// }, 5000);


module.exports = db;
const express = require("express");
const app = express();
const mongoDB = require('./db.js');
require('dotenv').config();//ye humne env file se variable lene ke liye kiya hain jo humne .env file main likha hain vo hum yahan use kar sakte hain
const passport = require('./auth');

// const Person = require('./models/person');//isko yahan require karne ke koi jaruart nhi hain kyuki ye file humne routes wale file main kare hain hamra schema vo route wali file main define hain....jahan schema use karna hain vahan ye files require hote hain 

// const MenuItem = require('./models/menuItem');
// const instaUser = require('./models/instaUser');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

let port  = process.env.Port || 3000;//ye port number humne environment(.env file ) variable se liya hain agar vo nahi hain toh 3000 use karega

// app.use((req,res,next)=>{
//     console.log("request received");
//     next();
// })

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made at :${req.originalUrl}`);
    next();
}
app.use(logRequest);//ye middleware hain jo har request pe chalega aur kab login huva mtlb kab uss url pe request hit hui uska timing likh dega...
console.log("before initialize");

app.use(passport.initialize());
console.log("after initialize");

const localMiddlewareAuth = passport.authenticate('local',{session:false});

app.get("/",(req,res)=>{
    console.log("root path accessed");
    res.send("Welcome!!");
})


// app.get("/search",(req,res)=>{
//     // console.log(req.query);//ye jo query iss search path pe bhejenge usse console pe print karega
//     let{q} = req.query;
//     res.send(`<h1>searching for ${q}</h1>`);
    
// })


const personRoutes = require("./routes/personRoutes");
app.use("/person",personRoutes);

const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menu",menuItemRoutes);

const instaUserRoutes = require("./routes/instaUserRoutes");
// const Person = require("./models/person.js");
app.use("/instagram",instaUserRoutes);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

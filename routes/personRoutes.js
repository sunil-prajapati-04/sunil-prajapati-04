const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const {jwtAuthMiddelware,generateToken} = require("./../jwt");

router.post("/signup", async(req,res)=>{
    try {
      const data = req.body;//aasuming that req body contains the person data
      let newPerson = new Person(data);//yahan Person ke andar data dene se vo data prefilled ho jayeaga acc to field
   //    newPerson.name = data.name; //hum aise bhi person ka data save kar sakte hian but it is not a good practiceto save in database
      let response = await newPerson.save();
      const payload={
        id:response.id,
        username:response.username
    }
      console.log("payload is:",JSON.stringify(payload));   
      
      const token = generateToken(payload);
      console.log("data saved",response,token);
      res.status(200).json({success:"Data saved successfully",response:response,token:token});
    } catch (err) {
      console.log("error in saving data", err);
      res.status(500).json({error:"Internal server error"}); 
    }
})

router.post("/login",async(req,res)=>{
    try {
        //extract username and password from request body
        const {username,password} = req.body;
        //finding user in db using username
        const user = await Person.findOne({username:username});
       //check if user present in db or not
       if(!user || (! await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"});
        }
        //generate token
        const payload = {
            id:user.id,
            username:user.username
        }
        const token = generateToken(payload);
        res.json(token);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});  
    }
})


router.get("/",async(req,res)=>{
    try {
        let data = await Person.find();
        console.log("data fetched",data);
        res.status(200).json(data);
    } catch (error) {
        console.log("error in fetching data", error);
        res.status(500).json({error:"Internal server error"}); 
    }
})

//query ke through data lene ke liye iss route pe hit kar sakte hain //ek baat yadd rakhna routes ke order matter karte hain express main
router.get("/query",async(req,res)=>{
    try {
        console.log(req.originalUrl);
        
        console.log("Query Params:", req.query);
        //jo key name query main likha hoga vahi let ke aage{} iss brackett main likhna hain
        let {name}=req.query;
        console.log(name);
        
        let response = await Person.findOne({name});
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        console.log(response);
        res.status(200).json(response);
        
    } catch (error) {
        console.log("data not found",error);
        res.status(500).json({error:"Internal server error"});
    }
})



router.get("/:worktype",async(req,res)=>{
    try {
        let worktype = req.params.worktype;
        if(worktype == "chef" || worktype == "waiter" || worktype == "manager"){
            let response = await Person.find({work:worktype});
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"invalid worktype"});
        }
    } catch (error) {
        console.log("data not found",error);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get("/profile",async(req,res)=>{
    try {
        let userData= req.user;
        console.log("user data is:",userData);
        
        let userDataId = userData.id;
        let response = await Person.findById(userDataId);
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        res.status(200).json({response});
    } catch (error) {
        console.log("data not found",error);
        res.status(500).json({error:"Internal server error"});
    }
})


router.put("/:id",async(req,res)=>{
    try {
        let personId = req.params.id;
        let updatedData = req.body;
        let response = await Person.findById(personId);
        // {
        //     new:true, //ye option dene se updated data milta hai otherwise old data milega
        //     runValidators:true //ye option dene se agar koi field ki value nahi di hai to vo error dega otherwise nahi dega
        // });
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        //object.assign ke through maine upadted data ko response ke andar assign kiya hain
        //kaise huva?-----> findyid se maine pura schema/model le liya aur usse reponse save karva diya agar response main nhi aata toh vo if condition main chala jata >>>>but find huva toh kya hoga >>object.assign do parameter lega aur usmain updatedData ka value object ke andar save ho jayega aur vo object response schema main compare hoke save ho jayega phir hum uss response jo update ho chuka usse save karva denge >>>ye isliye kiya kyuki mujhe update main agar password aaya toh usse hash karvana tha....
        Object.assign(response,updatedData);
        let updatedPerson = await response.save();

        console.log("data updated",updatedPerson);
        res.status(200).json(updatedPerson);
        } catch (error) {
        console.log("data not found",error);
        res.status(500).json({error:"Internal server error"});
        }
})

router.delete("/:email",async(req,res)=>{
    try {
        let personEmail = req.params.email;
        let response = await Person.findOneAndDelete({email:personEmail});

        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        console.log("data deleted",response);
        res.status(200).json({success:"data deleted successfully"});
        
    } catch (error) {
        console.log("data not found",error);
        res.status(500).json({error:"Internal server error"});
    }
})

module.exports = router;
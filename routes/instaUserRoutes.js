const express = require("express");
const router = express.Router();
const instaUser = require("../models/instaUser");


router.post("/signup", async(req,res)=>{
    try {
        const data = req.body;
        let newInstaUser = new instaUser(data);
        let response = await newInstaUser.save();
        console.log("data saved",response);
        res.status(200).json({success:"data saved successfully",response});
    } catch (error) {
        console.log("error in saving menu data", error);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get("/",async(req,res)=>{
    try {
        let data  = await instaUser.find();
        console.log("data fetched",data);
        res.status(200).json(data);
    } catch (error) {
        console.log("error in fetching data", error);
        res.status(500).json({error:"Internal server error"}); 
    }
})

router.get("/:username",async(req,res)=>{
    try {
     let username = req.params.username;
     let data = await instaUser.findOne({Username:username});
     console.log("data fetched",data);
     res.status(200).json(data);
    } catch (error) {
     console.log("error in fetching data", error);
     res.status(500).json({error:"Internal server error"}); 
    }
 })

router.put("/:email/:password",async(req,res)=>{
    try {
        let Email =req.params;//agar main req.params.email likha hota toh ye sirf email ki value he leta but jab hume dono ke value chaiye like email and password from parameter toh hum aise likh sakte hain bss hume variable ka naam likhna hain aur vo dono ke parameter ki value store kar lega >>ek baar screeshot bhi dekh lena
        let updatedInstaUser = req.body;
        let response = await instaUser.findOneAndUpdate(Email,updatedInstaUser,{
            new:true,
            runValidators:true
        }) 
        if(!response){
            return res.status(404).json({error:"user not found"});
        }
        console.log("data updated",response);
        res.status(200).json(response);
    } catch (error) {
        console.log("error in updating data", error);
        res.status(500).json({error:"Internal server error"});    
    }
})

 module.exports = router;
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");


router.post("/",async(req,res)=>{
    try {
        const data = req.body;
        let newMenuItem = new MenuItem(data);
        let response = await newMenuItem.save();
        console.log("menu data saved",response);
        res.status(200).json({success:"Menu data saved successfully",response});
    } catch (err) {
        console.log("error in saving menu data", err);
        res.status(500).json({error:"Internal server error"});
        
    }
})

router.get("/", async(req,res)=>{
    try {
        let data = await MenuItem.find();
        console.log("menu data fetched",data);
        res.status(200).json(data);
    } catch (error) {
        console.log("error in fetching data", error);
        res.status(500).json({error:"Internal server error"}); 
    }
})


router.get("/:dishType", async(req,res)=>{
    try {
        let dishType = req.params.dishType;
        if(dishType ==="starter" || dishType=="main course"||dishType=="dessert"){
        let data = await MenuItem.find();
        console.log("menu data fetched",data);
        res.status(200).json(data);
        }else{
            res.status(404).json({error:"invaild category"});
        }
    } catch (error) {
        console.log("error in fetching data", error);
        res.status(500).json({error:"Internal server error"}); 
    }
})


module.exports = router;
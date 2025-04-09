const express = require("express");
const router = express.Router();
const Person = require("../models/person");


router.post("/", async(req,res)=>{
    try {
      const data = req.body;//aasuming that req body contains the person data
      let newPerson = new Person(data);//yahan Person ke andar data dene se vo data prefilled ho jayeaga acc to field
   //    newPerson.name = data.name; //hum aise bhi person ka data save kar sakte hian but it is not a good practiceto save in database
      let response = await newPerson.save();
      console.log("data saved",response);
      res.status(200).json({success:"Data saved successfully",response});
    } catch (err) {
      console.log("error in saving data", err);
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

router.put("/:id",async(req,res)=>{
    try {
        let personId = req.params.id;
        let updatedData = req.body;
        let response = await Person.findByIdAndUpdate(personId,updatedData,{
            new:true, //ye option dene se updated data milta hai otherwise old data milega
            runValidators:true //ye option dene se agar koi field ki value nahi di hai to vo error dega otherwise nahi dega
        });
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        console.log("data updated",response);
        res.status(200).json(response);
        } catch (error) {
        console.log("data not found",error);
        res.status(500).json({error:"Internal server error"});
        }
})

module.exports = router;
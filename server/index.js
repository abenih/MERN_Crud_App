const express = require("express");
const app=express();
const cors = require("cors")
const mongoose = require("mongoose");
const FoodeModel = require("./models/Food")
app.use(express.json());
app.use(cors())
mongoose.connect(
    "mongodb+srv://abneihhh:iG3WD1MUjjd2h8by@cluster0.9gvivxx.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser:true,
})


app.post("/insert", async (req,res)=>{
    const foodName= req.body.foodName
    const days= req.body.days
 const food = new FoodeModel({foodName: foodName, daysSinceIAte:days})
 try{
    await food.save(); 
 }
 catch(err){
     console.log(err)
 }
})

app.get("/read", async (req,res)=>{
   FoodeModel.find({},(err,result)=>{
    if(err){
        res.send(err)
    }
    res.send(result)
   })
})

app.put("/update", async (req,res)=>{
    const newDays= req.body.newDays
    const newFoodName= req.body.newFoodName
    const id= req.body.id
    
 try{
     await FoodeModel.findById(id, (err, updatedFood)=>{
        updatedFood.foodName = newFoodName;
        updatedFood.days = newDays
        updatedFood.save();
        res.send("update");
        
 })
 
 }
 catch(err){
     console.log(err)
 }
})

app.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id
    await FoodeModel.findByIdAndRemove(id).exec()
    res.send(id)
})

app.listen(3001, ()=>{
    console.log("server running on port 3001...");
})
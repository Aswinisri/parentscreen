import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
mongoose.set('strictQuery', false);
const eventSchema=mongoose.Schema(
    {
   date:{
        type:String,
  
        },  
        day:{
         type:String,
  
     },
    function:{
        type:String,
 
    },               
            
           
     })
const Event=mongoose.model("Event",eventSchema);
eventSchema.plugin(Event);

// connectDB();
const router=express.Router();
// app.use(express.json());

const event={
    date:"26-01-2022",
    day:"tuesday",
    function:"independence day"
}




router.get("/",(req,res) =>
{
    try{
        res.status(200).send(event);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Event.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            event:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})

router.post("/",async(req,res)=>{
    try{
        const event={
        
            date:req.body.date,
            day:req.body.day,
            function:req.body.function
        }
      
        
        console.log(event);
       
        var create=new Event(event);
        var eventCreated=await create.save();

   if(eventCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Event.findOneAndUpdate({_id:req.params.id},{
        $set:{
            date:req.body.date,
            day:req.body.day,
            function:req.body.function,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_event:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    router.delete("/:id",(req,res)=>{
        console.log(req.params.id);
        Event.deleteOne({_id:req.params.id},{
            $set:{
                date:req.body.date,
                day:req.body.day,
                function:req.body.function,
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_event:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        router.delete("/",(req,res)=>{
    
            Event.deleteMany({event},(err,result)=>{
            if(err) throw err
            res.send(event)
            })
        })
export default router;
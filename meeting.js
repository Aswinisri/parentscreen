import express from "express";
// import connectDB from "./db.js";
import mongoose from "mongoose";
const router=express.Router();
mongoose.set("strictQuery", false);
//connectDB();
const meetingSchema=mongoose.Schema([
    {
       toMeet:{
            type:String,
            // required:true
           },
        reason:{
            type:String,
            // required:true
           },
        date:{
            type:String,
            // required:true
           },
        time:{
            type:String,
            // required:true
           }
        
    }]
)

const Meeting=mongoose.model("Meeting",meetingSchema);
meetingSchema.plugin(Meeting);

const meeting=[{
    toMeet:"principal",
    reason:"leave",
    date :"01.03.2023",
    time:"1 clk"
}]
     

// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(meeting);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Meeting.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            meeting:result
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
        const details=  {
                toMeet:req.body.toMeet,
                reason:req.body.reason,
                date:req.body.date,
                time:req.body.time   
               }
               
            
console.log(details);
 const meeting=new Meeting(details);
const meetingCreated=await meeting.save();
if(meetingCreated){
    console.log("created");
res.status(201).json({message:"successfully created"});
}
else{
    res.status(401);
    throw new error("not found ");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
//update
router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Meeting.findOneAndUpdate({_id:req.params.id},{
        $set:{
            toMeet:req.body.toMeet,
            reason:req.body.reason,
            date:req.body.date,
            time:req.body.time             
                   
                }
            
            })
            .then(result=>{
                res.status(200).json({
                    updated_meeting:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
    })

    //delete
    router.delete('/:id',(req,res)=>{
        console.log(req.params.id);
        Meeting.findByIdAndRemove({_id:req.params.id},{
            $set:{
                toMeet:req.body.toMeet,
                reason:req.body.reason,
                date:req.body.date,
                time:req.body.time   
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_meetingDetails:result       
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
    
            Meeting.deleteMany({meeting},(err,result)=>{
            if(err) throw err
            res.send(meeting)
            })
        })

 export default router;       


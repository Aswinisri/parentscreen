import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";

mongoose.set("strictQuery", false);
// connectDB();
const router=express.Router();
// app.use(express.json());
const timetableSchema=mongoose.Schema({
    detail:[{
  
     day       :{
                 type:String,
               },
   
   subjectName:{
                 type:String,
               },
   subjectTeacher:{
                  type:String,
                },
   schedule    :{
                  type:String,
                 },
             } ]
        
})
const Timetable=mongoose.model("Timetable",timetableSchema);
timetableSchema.plugin(Timetable);
const timetable={
      detail:[{
        day:"monday",
        subjectName:"Tamil",
        subjectTeacher:"Harish",
        schedule:"10.45 AM-11.30 AM"
              },
          {     
     day:"tuesday",
      subjectName:"English",
      subjectTeacher:"Harish",
     schedule:"10.45 AM-11.30 AM"

         }]
    }
//get
router.get("/",(req,res) =>
{
    try{
        res.status(200).send(timetable);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
router.post("/",async(req,res)=>{
    try{
        const timetable={
         detail:req.body.detail

        }
        console.log(timetable);
        var create=new Timetable(timetable);
        var timetableCreated=await create.save();
      
        if(timetableCreated){
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
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Profile.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            profile:result
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
  router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Timetable.findOneAndUpdate({_id:req.params.id},{
        $set:{
            detail:req.body.detail

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_timetable:result       
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
        Timetable.deleteOne({_id:req.params.id},{
            $set:{
                detail:req.body.detail

    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_timetable:result       
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
    
            Timetable.deleteMany({timetable},(err,result)=>{
            if(err) throw err
            res.send(timetable)
            })
        })
  export default router;
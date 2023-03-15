import express from "express";
// import connectDB from "./db.js";
import mongoose from "mongoose";
const router=express.Router();

mongoose.set("strictQuery", false);
// connectDB();
//Attendance
const attendanceSchema=mongoose.Schema( [{
            monthName:{
                type:String,
            },
            totalWorkingDays:{
                type:String,
            },
            attendedDays    :{
                type:String,
            },
            officialLeaves  :{
                type:String,
            },
            absentDays  :{
                type:String,
            },
               }]
            )

const Attendance=mongoose.model("Attendance",attendanceSchema);
attendanceSchema.plugin(Attendance);
const attendance=[{
              monthName        :"january",
              totalWorkingDays:"100 days",
              attendedDays    :"74 days",
              officialLeaves  :"6 days",
              absentDays      :"3 days"
         },
     {
              monthName        :"february",
              totalWorkingDays:"100 days",
              attendedDays    :"74 days",
              officialLeaves  :"6 days",
              absentDays      :"3 days"
             },
             {
                 monthName        :"march",
                 totalWorkingDays:"100 days",
                 attendedDays    :"74 days",
                 officialLeaves  :"6 days",
                 absentDays      :"3 days"
                 }]


// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(attendance);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Attendance.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            attendance:result
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
        const attenddetails={
            monthName        :req.body.monthName,
              totalWorkingDays:req.body.totalWorkingDays,
              attendedDays    :req.body.attendedDays,
              officialLeaves  :req.body.officialLeaves,
              absentDays      :req.body.absentDays
            
        };
        console.log(attenddetails);
        const attendance=new Attendance(attenddetails);
const attendanceCreated=await attendance.save();
if(attendanceCreated){
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
    Attendance.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            monthName        :req.body.monthName,
            totalWorkingDays:req.body.totalWorkingDays,
            attendedDays    :req.body.attendedDays,
            officialLeaves  :req.body.officialLeaves,
            absentDays      :req.body.absentDays
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_attendDetails:result       
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
        Attendance.findByIdAndRemove({_id:req.params.id},{
            $set:{
               
                months:req.body.months
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_attendDetails:result       
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
    
            Attendance.deleteMany({attendance},(err,result)=>{
            if(err) throw err
            res.send(attendance)
            })
        })
export default router;

import express from "express";
// import connectDB from "./db.js";
import mongoose from "mongoose";
const router=express.Router();
mongoose.set("strictQuery", false);
// connectDB();
const homeworkSchema=mongoose.Schema([
    {
        months:[{
            monthName:{
                type:String,
            },
            class:{
                type:String,
            },
            subject :{
                type:String,
            },
            dateOfHomework:{
                type:String,
            },
            dateOfSubmit:{
                type:String,
            },
            status :{
                type:String,
            }
     }]
    }
])

const Homework=mongoose.model("Homework",homeworkSchema);
homeworkSchema.plugin(Homework);
const homework=[{
    months:[
        {
          month          :"January",
          class          :"1st Standard",
          subject        :"English",
          dateOfHomework :"23-9-2022",
          dateOfSubmit   :"25-9-2022",
          status         :"pending"          
      },
      {
        month          :"February",
        class          :"1st Standard",
        subject        :"English",
        dateOfHomework :"23-9-2022",
        dateOfSubmit   :"25-9-2022",
        status         :"pending"          
    },
   {
         month          :"March",
         class          :"1st Standard",
         subject        :"English",
         dateOfHomework :"23-9-2022",
         dateOfSubmit   :"25-9-2022",
          status         :"pending"          
   }
]
}]
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(homework);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Homework.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            homework:result
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
     const homeworkdetails={
            months:req.body.months
            
        };
        console.log(homeworkdetails);
        const homework=new Homework(homeworkdetails);
const homeworkCreated=await homework.save();
if(homeworkCreated){
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
    Homework.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            months:req.body.months
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_homeworkDetails:result       
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
        Homework.findByIdAndRemove({_id:req.params.id},{
            $set:{
               
                months:req.body.months
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_homeworkDetails:result       
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
    
            Homework.deleteMany({homework},(err,result)=>{
            if(err) throw err
            res.send(homework)
            })
        })    
    
export default router;

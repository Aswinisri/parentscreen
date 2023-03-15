import express from "express";
// import connectDB from "./db.js";
import mongoose from "mongoose";
const router=express.Router();
mongoose.set("strictQuery", false);
// connectDB();
const remarkSchema=mongoose.Schema(
    {
        attitude:{
            type:String,
            // required:true
                 },
        
    }
)

const Remark=mongoose.model("Remark",remarkSchema);
remarkSchema.plugin(Remark);

const remark=
     {
       attitude :"He is an enthusiastic learner who seems to enjoy school"
        
     }

// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(remark);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Remark.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            remark:result
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
        const details= 
                {
                   attitude:req.body.attitude
               }
               
            
console.log(details);
 const remark=new Remark(details);
const remarkCreated=await remark.save();
if(remarkCreated){
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
    Remark.findOneAndUpdate({_id:req.params.id},{
        $set:{
              attitude:req.body.attitude              
                   
                }
            
            })
            .then(result=>{
                res.status(200).json({
                    updated_remark:result       
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
        Remark.findByIdAndRemove({_id:req.params.id},{
            $set:{
               attitude:req.body.attitude
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_remarkDetails:result       
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
    
            Remark.deleteMany({remark},(err,result)=>{
            if(err) throw err
            res.send(remark)
            })
        })

 export default router;       

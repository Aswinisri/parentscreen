import  express  from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
mongoose.set("strictQuery", false);
const leaveSchema=mongoose.Schema([{
    totalWorkingdays:{
        type:String,
         },
    reason:{
        type:String,
    },
    leaveDetail:[{
        attendedDays:{
            type:String,
        },
       absentDays:{
        type:String,
            },
       selectDate:{
        type:String,
         }       
         }]
    }])

 const Leave=mongoose.model('Leave',leaveSchema);
 leaveSchema.plugin(Leave);

const leave=[{
    totalWorkingdays:"100",
    reason:"enter your reason",
    leaveDetail:[{
        attendedDays:"74",
        absentDays:"3",
        selectDate:"01.03.2023"
      }]

}]
//get
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(leave);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Leave.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          Leave:result
      })
  })
  .catch(err=> {
  console.log(err);
  res.status(505).json({
      error:err
  })
  }
)
});
//post
router.post("/",async(req,res)=>{
    try{
      const leave={
        totalWorkingdays:req.body.totalWorkingdays,
        reason:req.body.reason,
       leaveDetail:req.body.leaveDetail
      };
      console.log(leave);
      const menu=new Leave(leave);
      const leaveCreated=await menu.save();
      if(leaveCreated){
        console.log("Created");
        res.status(201).json({message:"request created"});
    }else
    {
        res.status(401);
        throw new Error("not available");
    }
  } catch (err){
          return res.status(500).json({message: err.message});
        }});
//update
router.put('/:id',(req,res)=>{
  console.log(req.params.id);
  Leave.findOneAndUpdate({_id:req.params.id},{
      $set:{
        totalWorkingdays:req.body.totalWorkingdays,
       reason:req.body.reason,
       leaveDetail:req.body.leaveDetail
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_leaveDetails:result       
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
    Leave.findByIdAndRemove({_id:req.params.id},{
        $set:{
            totalWorkingdays:req.body.totalWorkingdays,
            reason:req.body.reason,
            leaveDetail:req.body.leaveDetail
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_leaveDetails:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
export default router;
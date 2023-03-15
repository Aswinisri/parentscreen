import  express  from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
mongoose.set("strictQuery", false);
// connectDB();
const sportsSchema=mongoose.Schema([{
    events:{
        type:String,
         },
    recentEvent:{
        type:String,
    },
    venue:{
            type:String,
        },
    achievement:{
        type:String,
            },
    position:{
        type:String,
         }       
         }])

 const Sports=mongoose.model('sports',sportsSchema);
 sportsSchema.plugin(Sports);

const sports=[{
       events:"Upcomming Competitions",
       recentEvent:"Swimming contest",
       venue:"Star Stadium",
       achievement:"Running Race",
       position:"1st place"
}]
//get
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(sports);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Sports.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          sports:result
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
      const sports={
        events:req.body.events,
       recentEvent:req.body.recentEvent,
       venue:req.body.venue,
       achievement:req.body.achievement,
       position:req.body.position,
      };
      console.log(sports);
      const menu=new Sports(sports);
      const sportsCreated=await menu.save();
      if(sportsCreated){
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
  Sports.findOneAndUpdate({_id:req.params.id},{
      $set:{
        events:req.body.events,
        recentEvent:req.body.recentEvent,
        venue:req.body.venue,
        achievement:req.body.achievement,
        position:req.body.position,
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_sportsDetails:result       
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
    Sports.findByIdAndRemove({_id:req.params.id},{
        $set:{
            events:req.body.events,
            recentEvent:req.body.recentEvent,
            venue:req.body.venue,
            achievement:req.body.achievement,
            position:req.body.position,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_sportsDetails:result       
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
import express from "express";
import mongoose from "mongoose";
const router=express.Router();

const todayclassSchema=mongoose.Schema([
    {
       subject:{
        type:String,
       },
       lesson:{
        type:String,
       },
       range:{
        type:String,
       }
}])

var Todayclass=mongoose.model("Todayclass",todayclassSchema);
todayclassSchema.plugin(Todayclass);

const todayclass=[
    {
      subject:"Tamil",
      lesson:"unit-3",
      range:"completed"
    },
    {
        subject:"English",
        lesson:"unit-3",
        range:"completed"
      },
      {
        subject:"Maths",
        lesson:"unit-3",
        range:"completed"
      },
      {
        subject:"Science",
        lesson:"unit-3",
        range:"completed"
      },
      {
        subject:"History",
        lesson:"unit-3",
        range:"completed"
      },
]

const workSchema=mongoose.Schema([
    {
       subject:{
        type:String,
       },
       lesson:{
        type:String,
       },
       homework:{
        type:String,
       }
}])

var Work=mongoose.model("Work",workSchema);
workSchema.plugin(Work);

const work=[
    {
        subject:"Tamil",
        lesson:"unit-3",
        homework:"Ex:12"
      },
      {
          subject:"English",
          lesson:"unit-3",
          homework:"Ex:12"
        },
        {
          subject:"Maths",
          lesson:"unit-3",
          homework:"Ex:12"
        },
        {
          subject:"Science",
          lesson:"unit-3",
          homework:"Ex:12"
        },
        {
          subject:"History",
          lesson:"unit-3",
          homework:"Ex:12"
        },
]

const assignmentSchema=mongoose.Schema([
    {
       subject:{
        type:String,
       },
       lesson:{
        type:String,
       },
       assignment:{
        type:String,
       }
}])

var Assignment=mongoose.model("Assignment",assignmentSchema);
assignmentSchema.plugin(Assignment);

const assignment=[
    {
        subject:"Tamil",
        lesson:"unit-3",
        assignment:"Ex:15"
      },
      {
          subject:"English",
          lesson:"unit-3",
          assignment:"Ex:15"
        },
        {
          subject:"Maths",
          lesson:"unit-3",
          assignment:"Ex:15"
        },
        {
          subject:"Science",
          lesson:"unit-3",
          assignment:"Ex:15"
        },
        {
          subject:"History",
          lesson:"unit-3",
          assignment:"Ex:15"
        },
]

const scheduleSchema=mongoose.Schema([{
         date:{
            type:String,
         },
         session:{
            type:String,
         },
         lesson:{
            type:String,
         },
         unit:{
            type:String,
         },
}])

var Schedule=mongoose.model("Schedule",scheduleSchema);
scheduleSchema.plugin(Schedule);

const tomorrowSchedule=[
    {
    date:"10-06-2022",
    session:"09:30-10:15",
    lesson:"History",
    unit:"unit-1"
   },
   {
    date:"10-06-2022",
    session:"09:30-10:15",
    lesson:"Science",
    unit:"unit-1"
   },
   {
    date:"10-06-2022",
    session:"09:30-10:15",
    lesson:"Maths",
    unit:"unit-1"
   },
   {
    date:"10-06-2022",
    session:"09:30-10:15",
    lesson:"English",
    unit:"unit-1"
   },
   {
    date:"10-06-2022",
    session:"09:30-10:15",
    lesson:"Tamil",
    unit:"unit-1"
   }
]

//homeworkroutes-------------------->
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(work);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Work.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          work:result
      })
  })
  .catch(err=> {
  console.log(err);
  res.status(505).json({
      error:err
  })
  }
)
}
)
//post
router.post("/",async(req,res)=>{
  try{
   const workdetails={
            subject:req.body.subject,
            lesson:req.body.lesson,
            homework:req.body.homework
          
      };
      console.log(workdetails);
      const work=new Work(workdetails);
const workCreated=await work.save();
if(workCreated){
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
  Work.findOneAndUpdate({_id:req.params.id},{
      $set:{
         
        subject:req.body.subject,
        lesson:req.body.lesson,
        homework:req.body.homework
          
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_workDetails:result       
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
      Work.findByIdAndRemove({_id:req.params.id},{
          $set:{
             
            subject:req.body.subject,
            lesson:req.body.lesson,
            homework:req.body.homework
              
          }
      })
      .then(result=>{
          res.status(200).json({
              Deleted_workDetails:result       
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
  
          Work.deleteMany({work},(err,result)=>{
          if(err) throw err
          res.send(work)
          })
      })    
//todayclass-------------------->
router.get("/",(req,res)=>{
    try{
        res.status(200).send(todayclass);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Todayclass.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          todayclass:result
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
//post
router.post("/",async(req,res)=>{
  try{
   const todayclassdetails={
            subject:req.body.subject,
            lesson:req.body.lesson,
            range:req.body.range
          
      };
      console.log(todayclassdetails);
      const todayclass=new Todayclass(todayclassdetails);
const todayclassCreated=await todayclass.save();
if(todayclassCreated){
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
  Todayclass.findOneAndUpdate({_id:req.params.id},{
      $set:{
         
        subject:req.body.subject,
        lesson:req.body.lesson,
        range:req.body.range
          
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_todayclassDetails:result       
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
      Todayclass.findByIdAndRemove({_id:req.params.id},{
          $set:{
             
            subject:req.body.subject,
            lesson:req.body.lesson,
            range:req.body.range
              
          }
      })
      .then(result=>{
          res.status(200).json({
              Deleted_todayclassDetails:result       
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
  
          Todayclass.deleteMany({todayclass},(err,result)=>{
          if(err) throw err
          res.send(todayclass)
          })
      })    
//assignment-------------------------------->
router.get("/",(req,res)=>{
  try{
      res.status(200).send(assignment);
  }catch(error)
  {
      res.json({message:"unable to create"});

  }

});
// specific data
router.get("/:id",(req,res)=>{
console.log(req.params.id);
Assignment.findById(req.params.id)

.then(result=>{
    res.status(200).json({
        assignment:result
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
//post
router.post("/",async(req,res)=>{
  try{
   const assignmentdetails={
            subject:req.body.subject,
            lesson:req.body.lesson,
            assignment:req.body.assignment
          
      };
      console.log(assignmentdetails);
      const assignment=new Assignment(assignmentdetails);
const assignmentCreated=await assignment.save();
if(assignmentCreated){
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
  Assignment.findOneAndUpdate({_id:req.params.id},{
      $set:{
         
        subject:req.body.subject,
        lesson:req.body.lesson,
        assignment:req.body.assignment
          
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_assignmentDetails:result       
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
      Assignment.findByIdAndRemove({_id:req.params.id},{
          $set:{
             
            subject:req.body.subject,
            lesson:req.body.lesson,
            assignment:req.body.assignment
              
          }
      })
      .then(result=>{
          res.status(200).json({
              Deleted_assignmentDetails:result       
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
  
          Assignment.deleteMany({assignment},(err,result)=>{
          if(err) throw err
          res.send(assignment)
          })
      })    
//tomorrow schedule------------------------------>
router.get("/",(req,res)=>{
  try{
      res.status(200).send(tomorrowSchedule);
  }catch(error)
  {
      res.json({message:"unable to create"});

  }

});
// specific data
router.get("/:id",(req,res)=>{
console.log(req.params.id);
Schedule.findById(req.params.id)

.then(result=>{
    res.status(200).json({
        tomorrowSchedule:result
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
     const tomorrowdetails={
              date:req.body.date,
              session:req.body.session,
              lesson:req.body.lesson,
              unit:req.body.unit
            
        };
        console.log(tomorrowdetails);
        const tomorrowSchedule=new Schedule(tomorrowdetails);
const tomorrowScheduleCreated=await tomorrowSchedule.save();
if(tomorrowScheduleCreated){
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
    Schedule.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
              date:req.body.date,
              session:req.body.session,
              lesson:req.body.lesson,
              unit:req.body.unit
            
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_tomorrowScheduleDetails:result       
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
        Schedule.findByIdAndRemove({_id:req.params.id},{
            $set:{
               
              date:req.body.date,
              session:req.body.session,
              lesson:req.body.lesson,
              unit:req.body.unit
            
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_tomorrowScheduleDetails:result       
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
    
            Schedule.deleteMany({tomorrowSchedule},(err,result)=>{
            if(err) throw err
            res.send(tomorrowSchedule)
            })
        })    
    export default router;
   //export default{todayclass,homework,assignment,tomorrowSchedule};

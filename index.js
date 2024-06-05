const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer')
const Port = 5050;
const {
  addStudent,
  findStudentEvenPincode,
  getStudent,
  updateStudent,
  deleteStudent,
  getStudentdetailsbyid,
  getTotalStudent,
  changeFieldName,
  deleteField,
  addNewField,
  getdatabyage,
  conditionData
} = require("./StudentCrud");
const {
  addCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  findCourseFees
} = require("./Course");  
const {
  addFees,
  updateFees,
  deleteFees,
  FeesbystdId,
  getPendingFeesbyStdid,
  getcompleteFees,
  getPendingFeesStdDetails,
  addDiscountStdFees
} = require("./studentFees");

//  Student fees details


app.patch('/addDiscountStdFees/:id', async (req,res)=>{

     const result = await addDiscountStdFees(req.params.id,req.body)
     res.status(200).send({"Msg":"Success",data:result})
})
app.get('/getPendingFeesStdDetails',async (req,res)=>{

   const result = await getPendingFeesStdDetails()
   res.status(200).send({msg:"Success",data:result})
})

app.get('/getcompleteFees/:id', async (req,res)=>{

   const result = await getcompleteFees()
   res.status(200).send({msg:"Success",data:result})
})

app.post("/studentFees", async (req, res) => {
  const result = await addFees(req.body);
  res.status(201).send({ msg: "add Success", data: result });
});

app.patch("/studentFees/:id", async (req, res) => {
  const result = await updateFees(req.params.id, req.body);
  res.status(200).send({ Msg: "Update Success", data: result });
});

app.delete("/studentFees/:id", async (req, res) => {
  const result = await deleteFees(req.params.id);
  res.status(200).send({ Msg: "Delete Success", data:result});
});

app.get("/FeesbystdId/:id", async (req,res) => {
  const result = await FeesbystdId(req.params.id);
  res.status(200).send({ Msg: "Success", data: result });
});

app.get("/getPendingFeesbyStdId/:id", async (req, res) => {
  const result = await getPendingFeesbyStdid(req.params.id);
  res.status(200).send({ Msg: "Success", data: result });
});

// course Add details

app.post("/course", async (req, res) => {
  const result = await addCourse(req.body);
  res.status(201).send({ msg: "Add succcess full", data: result });
});

app.patch("/course/:id", async (req, res) => {
  const result = await updateCourse(req.params.id, req.body);
  res.status(200).send({ Msg: "Update Success", data: result });
});

app.delete("/course/:id", async (req, res) => {
  const result = await deleteCourse(req.params.id);
  res.status(200).send({ Msg: "Delete Success", data: result });
});

app.get("/course/:id", async (req, res) => {
  const result = await getCourse(req.params.id);
  res.status(200).send({ Msg: "Success get Data", data: result });
});

app.get("/findCourseFeesminandmax",async (req,res)=>{

   const result = await findCourseFees()
   res.status(200).send({msg:"Successfully Data Get",data:result})
})
//  Student Info collection details

app.post("/Student", async (req, res) => {
  const result = await addStudent(req.body);
  res.status(201).send({ Msg: "Add Success", body: result });
});
app.get("/Student/:id", async (req, res) => {
  const result = await getStudent(req.params.id);
  res.status(200).send({ Msg: "Success", body:result});
  console.log(result);
});

app.patch("/Student/:id", async (req, res) => {
  const result = await updateStudent(req.params.id, req.body);
  res.status(200).send({ Msg: "Update Success", body: result });
});

app.delete("/Student/:id", async (req, res) => {
  const result = await deleteStudent(req.params.id);
  res.status(200).send({ Msg: "Delete Success", body: result });
});

app.get("/getStudentInfoByStdId/:id", async (req, res) => {
  const result = await getStudentdetailsbyid(req.params.id);
  console.log(result);
  res.status(200).send({ msg: "Success", data: result });
});

app.get("/getTotalStudentCategoryByid", async (req, res) => {
  const result = await getTotalStudent(req.params.id);
  res.status(200).send({ msg: "Success", data: result });
});

app.get("/getEvenPincodeStudent/:id", async (req, res) => {
  const result = await findStudentEvenPincode();
  res.status(200).send({ msg: "result", data: result });
});

app.patch('/changeFieldName/:id',async (req,res) =>{

     const result = await changeFieldName(req.params.id)
  res.status(200).send({ msg: "result", data: result });

     
})

app.patch('/deleteFieldName/:id', async (req,res) =>{

    const result = await deleteField()
  res.status(200).send({ msg: "result", data: result });

})

app.patch('/addField/:id', async (req,res)=>{

    const result = await addNewField(req.body)
  res.status(200).send({ msg: "result", data: result });

})
app.get('/getdatabyage/:id',async (req,res)=>{

  const result = await getdatabyage()
  res.status(200).send({"msg":"Success",data:result})
})

app.get('/getstdInfobyconditon', async (req,res)=>{

  const result = await conditionData()
  res.status(200).send({"Msg":"Success",data:result})
})


var upload = multer.diskStorage({

  destination:function(req,file,cb) 
  {
    cb(null,'./uploads')
    
  },
  filename:function(req,file,cb)
  {
    cb(null,Date.now()+"_"+file.originalname)
  }
})

var uploadImage = multer({storage:upload}).single('img')

app.post('/upload',uploadImage,(req,res)=>{

  res.send({"Msg":"Success",data:req.file})
  
})




//  var upload = multer.diskStorage({
//    destination:function(req,file,cb) 
//    {
//         cb(null, './uploads')    
//    },
//    filename:function(req,file,cb) 
//    {
//      cb(null,Date.now()+"_"+file.originalname)
    
//    }
//  })

//  var uploadImage = multer({storage:upload}).single('img')

//  app.post('/upload',uploadImage,(req,res)=>{

//     res.send({"msg":"Success",data:req.file});
//  })





app.listen(Port, () => {
  console.log("Server is Running Port" + Port);
});

const { ObjectId } = require("mongodb");
const dbConnect = require("./dbConnect");
const collection = "Fees";

const addFees = async (data) => {
  const db = await dbConnect(collection);
  const date_time = new Date()
  let current_time = date_time.toLocaleDateString()+" "+date_time.toLocaleTimeString()
  const result = await db.insertOne({
    student_id: new ObjectId(data.student_id),
    course_id:new ObjectId(data.course_id)  ,
    payFees:Number(data.payFees),
    if(){

    },
    pendingFees: Number(data.pendingFees),
    payFeesDate:current_time
  
  })
  console.log(result);
  return result;
};

const updateFees = async (id,data) =>{

    const db = await dbConnect(collection)
    const result = await db.updateOne({student_id:new ObjectId(id)},{$set:data})
  console.log(result);

    return result;
}


const deleteFees = async (id) =>{

    const db =await dbConnect(collection)
    let result = await db.deleteMany({})
    return result;
}

const FeesbystdId = async (id) =>{

  try{ const db = await dbConnect(collection)
   let result = await db.aggregate([

     {student_id:new ObjectId(id)},          
      // {"$project":{student_id:1}}, 
      { $group:{_id:"$student_id","totalStudentPendingFees":{$sum:1}}},
    {
      $lookup:{
        from:"Fees",
        localField:"student_id",
        foreignField:"student_id",
        as:"Student Pending Fees"
      }
    }
   ]).toArray()

   return result}
   catch{
    console.log("Something is happend in behind ");
   }
}


const getPendingFeesbyStdid = async (id) =>{

    const db = await dbConnect(collection)
    let result = await db.find([
              
          {student_id:new ObjectId(id)},
       {  $group:{_id:'$student_id',PendingFees:{$lte:50000}}
         
    }]).toArray()

    return result 
}

const getcompleteFees = async () =>{

   const db = await dbConnect(collection)
   let result = await db.find({
       
    pendingFees:{$gt:0}
   }).toArray()
   return result
  } 


const getPendingFeesStdDetails = async () =>{

   const db = await dbConnect("Fees")
   let result = await db.aggregate([
     {
       $lookup:{
         
         from:'Fees',
         localField:'_id',
         foreignField:"student_id",
         as:"Student Fees Details"
        }
      },
      {
         $match:{pendingFees:{$gte:0}}
      },
    ]).toArray()
    return result
}

const addDiscountStdFees = async (id) =>{

  const db = await dbConnect('Fees')
  let result = await db.updateMany({student_id:new ObjectId(id)},{$unset:{DiscountFees: Number("10")}})
  return result;
}



module.exports = { addDiscountStdFees,addFees,updateFees,deleteFees,FeesbystdId,getPendingFeesbyStdid,getcompleteFees,getPendingFeesStdDetails };

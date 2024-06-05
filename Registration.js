// const { ObjectId } = require('mongodb')
// const dbConnect = require('./dbConnect')
// const collection = 'studentInfo'

// const  addStudentDetils = async (data)=>{

//     const db = await dbConnect(collection)
//     const result = await db.insertOne({student_id:new ObjectId(data.student_id),courseName:data.courseName,courseFees:data.courseFees,Status:data.status})
//     return result
// }

// const getStudentdetailsbyid = async (id) =>{

//     const db = await dbConnect(collection)
//     return result = await db.aggregate([
        
//              {
//                  $match:{"student_id":{$eq: new ObjectId(id)}}
//               },   

//           {
//                 $lookup:{

//                       from:"studentInfo",
//                       localField:"student_id",
//                       foreignField:"_id",
//                       as:"Student Personal Data"
//                 }
//           },
//           {
//             $lookup:{   
//                 from:"Fees",
//                 localField:"student_id",
//                 foreignField:"student_id",
//                 as:"Student Fees"

//             }   
//           }
//     ]).toArray()
// }


// module.exports = {addStudentDetils,getStudentdetailsbyid}
const { ObjectId } = require('mongodb')
const dbConnect = require('./dbConnect')
const collection = 'Course'

const addCourse = async (data) =>{

    const db = await dbConnect(collection)
    const result = await db.insertOne({courseName:data.courseName,courseFees: Number(data.courseFees),courseDuration:data.courseDuration})
    return result;
}

const updateCourse = async (id,data) =>{

    const db = await dbConnect(collection)
    console.log(data);
   return  db.updateOne({_id:new ObjectId(id)},{$set:data})
   
}

const deleteCourse = async (id,data)=>{
    const db = await dbConnect(collection)
     const result = await db.deleteOne({_id: new ObjectId(id)})
     return result;
}

 const getCourse = async (id) =>{

     const db = await dbConnect(collection)
     const result = await db.find({}).toArray()
    //  const result = await db.find({_id:new ObjectId(id)}).toArray()
     console.log(result)
     return result
 }

 const findCourseFees = async () =>{

    const db = await dbConnect(collection)
    const result = await db.find({
         courseFees:{$in:[70000,85000,60000]}
    }).toArray()
    return result 
 }

module.exports  = {addCourse,updateCourse,deleteCourse,getCourse,findCourseFees}
const { ObjectId } = require("mongodb");
const dbConnect = require("./dbConnect");
const collection = "studentInfo";

const addStudent = async (data) => {
  const db = await dbConnect(collection);
  const date_time = new Date();
  const current_time =
    date_time.toLocaleDateString() + " " + date_time.toLocaleTimeString();
  const result = await db.insertOne({
    Name: data.name,
    MobileNo: Number(data.mobileSelf),
    FatherMobile: Number(data.mobileParent),
    Email: data.emailAddress,
    Date_Of_Birth: data.dateofbirth,
    CurrentAddress: data.currentAddress,
    ParmanentAddress: data.parmanentAddress,
    Enquiry_Date: current_time,
    Category: data.category,
    PinCode: Number(data.pincode),
    Education: data.education,
    FatherName: data.fatherName,
    Father_occuption: data.fatherOccupation,
    course_id: new ObjectId(data.course_id),
  });
  return result;
};

const getStudent = async (id) => {
  const db = await dbConnect(collection);
  const result = await db.find({ _id: new ObjectId(id)}).toArray();
  console.log(result);
};

const updateStudent = async (id, data) => {
  const db = await dbConnect(collection);
  const result = await db.updateOne({ _id: new ObjectId(id) }, { $set: data });
  console.log(result);
};

const deleteStudent = async (id) => {
  const db = await dbConnect(collection);
  const result = await db.deleteOne({ _id: new ObjectId(id) });
  return result;
};

const getStudentdetailsbyid = async (id) => {
  const db = await dbConnect(collection);
  return (result = await db.aggregate([

       {"$project":{Name:1,Email:1,Education:1}},

       {
         $match: { _id: { $eq: new ObjectId(id) } },
       },
      
    //  {
    //      $group:{_id:'$Category',count:{$sum:1},names:{$push:"$Name"} }

    //  },
      {
        $lookup: {
          from: "Course",
          localField: "course_id",
          foreignField: "_id",
          as: "studentCourse",
        },
      },

       {
         $lookup: {
           from: "Fees",
           localField: "_id",
           foreignField: "student_id",
           as: "Student Fees",
         }
       },
    ])
    .toArray());
};

const getTotalStudent = async () => {
  const db = await dbConnect(collection);
    const result = await db.aggregate([
        {
        $project: {
          "Name": 1,
          "Email": 1
        }
      },

      {
         $sort:{"Name":-1}
      },
      //  {
      //      $group:{_id:"$Category","totalStudents":{$sum:1}}
      //  }
    ]).toArray()
    console.log(result);
return result
  //  const result = await db.createIndex({Education:'text'})
  // const count = await db.find({}).count()
console.warn(count);
  // const result1 = await db.find({ $text: { $search: "Graduation" } }).toArray()
  // return result1;
};

const findStudentEvenPincode = async () => {
  const db = await dbConnect(collection);
  const result = await db.find({ PinCode: { $mod: [2, 0] } }).toArray();
  return result;
};

const changeFieldName = async (data,id) => {
  const db = await dbConnect(collection);
  const result = await db.updateMany(
    {},
    { $rename: {"FatherName":"ParentsInfo"} }
  );
  return result;
};



const deleteField = async () =>{

  const db = await dbConnect(collection)
  const result = await db.updateMany(
    // {"Name":"Sohel"},{$unset:{"Father_occuption":1}} //single id field delete
    {},{$unset:{Father_occuption:1,FatherMobile:1,ParentsInfo:1}}
  )
  return result ;
}


const addNewField = async (data) =>{

  const db = await dbConnect(collection)
  const result = await db.updateOne(
    {Name:"Aman"},{$set:{"age":Number(data.age)}}
  )
  return result;
}

const getdatabyage = async () =>{

  const db = await dbConnect(collection)
  const result = await db.find({
      Education:{$eq:"Graduation"}
  }).toArray()
  return result;

}


const conditionData = async () =>{

  const db = await dbConnect(collection)
  const result = await db.find({
    
    $nor:[{Education:"12th"}]
  }).toArray()
  return result
}



module.exports = {
  conditionData,
  getdatabyage,
  addNewField,
  findStudentEvenPincode,
  changeFieldName,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getStudentdetailsbyid,
  getTotalStudent,
  deleteField
};

import { auth } from "../auth";
import { HealthData, Patient, PatientQuestion, Staff } from "./models";
import { connectToDB } from "./utils"; 

export const fetchStaff = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Staff.find({ name: { $regex: regex } }).count();
    const allStaff = await Staff.find(
      { name: { $regex: regex }},
    )
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });
    return { count, allStaff };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Staff!");
  }
};

export const fetchSingleStaff = async (id) => {
  // console.log(id);
  try {
    connectToDB();
    const user = await Staff.findById(id.toString());
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};


// fetch single Patient information
export const fetchPatientInfo = async (id) => {
  // console.log(id);
  try {
    connectToDB();
    const user = await Patient.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

// fetch single Patient Health Data
export const fetchPatientData = async (id) => {
  // console.log(id);
  try {
    connectToDB();
    const user = await HealthData.findById(id).populate('PatientId');
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Client Data!");
  }
};

// fetch single Patient Health Data By The Patient ID
export const fetchPatientDataByPatientId = async (id) => {
  // console.log(id);
  try {
    connectToDB();
    const user = await HealthData.findOne({PatientId : id});
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Client Data!");
  }
};

// fetch single Patient Health Data
export const fetchPatientQuestionnaire = async (id) => {
  // console.log(id);
  try {
    connectToDB();
    const user = await PatientQuestion.findById(id.toString()).populate('PatientId');
    // console.log(user)
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Client Data!");
  }
};

// fetch all clients by Staff 
export const fetchClients = async (q, page) => {
  const {user} = await auth();

  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Patient.find({ 
      $and: [
        { Officer: user.id },
     
      {
        $or: [
          { firstName: { $regex: regex } },
          { middleName: { $regex: regex } },
          { lastName: { $regex: regex } },
        ]
      }
    ],

   }).count();
    
   const allClients = await Patient.find({ 
        $and: [
          { Officer: user.id },
       
        {
          $or: [
            { firstName: { $regex: regex } },
            { middleName: { $regex: regex } },
            { lastName: { $regex: regex } },
          ]
        }
      ],
     })

    // const count = await Patient.find({ name: { $regex: regex } }).count();
    // const allClients = await Patient.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });
      // console.log(allClients)
    return { count, allClients };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Staff!");
  }
};


// fetch and populate patient Information 
export const fetchSingleClient = async (id) => {
  // console.log(id);
  try {
    connectToDB();

    let info = await PatientQuestion.find({PatientId : id}).populate('healthData').populate('PatientId').populate({
      path: 'staffId',
      select: '-password -__v'
    });

    if(info.length < 1){
     info =  await HealthData.find({PatientId : id}).populate('PatientId').populate({
      path: 'staffId',
      select: '-password -__v'
    });
    }
    
    if(info.length < 1){
      info = await Patient.findById(id.toString()).populate({
        path: 'staffId',
        select: '-password -__v'
      });
    }

    console.log(info)
    return info;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};


export const fetchPatientByName = async (name) => {
  const regex = new RegExp(name, "i");

  try {
    connectToDB();
    const searchTotals =  await Patient.find({
      $or: [
        { firstName: { $regex: regex } },
        { middleName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ]
    }).count();
    
    const allStaff = await Patient.find({
      $or: [
        { firstName: { $regex: regex } },
        { middleName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ]
    });

    return { searchTotals, allStaff };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Staff!");
  }
};





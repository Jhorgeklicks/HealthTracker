import mongoose from "mongoose";
import { HealthData, Patient, Staff } from "./models";
import { connectToDB } from "./utils";


// const officersWithPatientCount = await Staff.aggregate([
//     {
//       $lookup: {
//         from: "patients",
//         localField: "_id",
//         foreignField: "Officer",
//         as: "patients"
//       }
//     },
//     {
//       $addFields: {
//         patientCount: { $size: "$patients" }
//       }
//     }
//   ]);
  
 export const getOfficersWithPatientCount = async() => {
    try {
        connectToDB();
      // Use aggregation pipeline for efficient population and counting
      const results = await Staff.aggregate([
        {
          $lookup: {
            from: 'Patient',
            localField: '_id',
            foreignField: 'Officer',
            as: 'patients',
          },
        },
        {
          $addFields: {
            patientCount: { $size: '$patients' }, // Count patients in the nested array
          },
        },
      ]);
  
      return results;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error for proper handling
    }
  }

  export const CountOfFacilities = async() => {
      try {
        connectToDB();
      const count = await Staff.find({ isAdmin: { $ne: true } }).count();  
      return count;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error for proper handling
    }
  }

  export const CountOfAdmins = async() => {
    try {
        connectToDB();
      const count = await Staff.find({ isAdmin: { $ne: false } }).count();  
      return count;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error for proper handling
    }
  }

  export const CountOfPatients = async() => {
    try {
        connectToDB();
      const count = await Patient.find().count();  
      return count;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error for proper handling
    }
  }


  export const CountOfAgeBreakDown = async() => {
    try {
        connectToDB();
        const data = await Patient.aggregate([
            {
              $group: {
                _id: {
                  $cond: [
                    { $lte: ["$age", 12] },
                    "Child",
                    { $cond: [{ $lte: ["$age", 17] }, "Teenager", "Adult"] }
                  ]
                },
                male: { $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] } },
                female: { $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] } }
              }
            },
            {
              $project: {
                _id: 0,
                name: "$_id",
                male: 1,
                female: 1
              }
            }
          ]);
          
  return data;
}catch (err) {
    console.error(err);
    throw err; // Re-throw the error for proper handling
  }
}

export const countOfAgeBreakDownByStaffId = async(officerId) => {
    try {
        connectToDB();
        const data = await Patient.aggregate([
            {
                $match: { Officer: new mongoose.Types.ObjectId(officerId) }
            },
            {
              $group: {
                _id: {
                  $cond: [
                    { $lte: ["$age", 12] },
                    "Child",
                    { $cond: [{ $lte: ["$age", 17] }, "Teenager", "Adult"] }
                  ]
                },
                male: { $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] } },
                female: { $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] } }
              }
            },
            {
              $project: {
                _id: 0,
                name: "$_id",
                male: 1,
                female: 1
              }
            }
          ]);
        
  return data;
}catch (err) {
    console.error(err);
    throw err; // Re-throw the error for proper handling
  }
}

export const getOfficerData = async (officerId) => {
    try {
      const data = await HealthData.aggregate([
        {
          $match: { staffId: new mongoose.Types.ObjectId(officerId) }
        },
    
        {
            $lookup: {
              from: "patients",
              localField: "PatientId",
              foreignField: "_id",
              as: "patient"
            }
          },
          {
            $unwind: "$patient"
          },
          {
            $group: {
              _id: "$PatientId",
              firstname: { $first: "$patient.firstName" },
              lastname: { $first: "$patient.lastName" },
              age: { $first: "$patient.age" },
              gender: { $first: "$patient.gender" },
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          },
          {
            $limit: 5
          }    
      ]);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

  export const getTopPatientsByVisitCount = async () => {
    try {
      // Group HealthData documents by patientId and count the number of documents
      const patientVisitCounts = await HealthData.aggregate([
        {
          $group: {
            _id: "$PatientId",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 5
        }
      ]);
  
      // Loop through the patientVisitCounts array and fetch the corresponding patient data
      const topPatients = await Promise.all(patientVisitCounts.map(async (patientVisitCount) => {
        const patientId = patientVisitCount._id;
        const patient = await Patient.findById(patientId);
        const staff = await Staff.findById(patient.Officer);
        return {
          firstname: patient.firstName,
          lastname: patient.lastName,
          age: patient.age,
          gender: patient.gender,
          count: patientVisitCount.count,
          staffName: staff?.name
        };
      }));
  
      return topPatients;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
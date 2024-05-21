import mongoose from "mongoose";

// name, location,district, gps,isAdmin,phone,password, address
const staffSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: { 
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    gps: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


//firstName,lastName,middleName,phone,gender,age,maritalStatus,education,slug,healthData[ref the ID of the health data document],patientQuestion[]
// the patient Schema
const PatientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    middleName: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: Boolean,
      required: true,
    },
    education: {
      type: String,
      required: true,
    }
    ,
    Officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: {}  // Empty object as default
    }
  },
  { timestamps: true }
);

// the health Data Schema
// userId,weight,height,bmi,systolicBp,diastolicBp,rbs,fbs
// refs -> [staffId,PatientId]
const healthDataSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff', // Reference the Patient model
    required: true
  },
  PatientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference the Patient model
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number,
    required: true
  },
  systolicBp: {
    type: Number,
    required: true
  },
  diastolicBp: {
    type: Number,
    required: true
  },
  fbs: {
    type: Number,
    required: true
  },
  rbs: {
    type: Number,
    required: true
  }
}
,
  { timestamps: true }
);

// const healthDataSchema = new mongoose.Schema({
//   staffId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Staff', // Reference the Patient model
//     required: true
//   },
//   PatientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Patient', // Reference the Patient model
//     required: true
//   },
//   weight: {
//     weight1: {
//       type: Number,
//       required: true
//     },
//     weight2: {
//       type: Number,
//       required: true
//     },
//     weight3: {
//       type: Number,
//       required: true
//     }
//   },
//   height: {
//     height1: {
//       type: Number,
//       required: true
//     },
//     height2: {
//       type: Number,
//       required: true
//     },
//     height3: {
//       type: Number,
//       required: true
//     }
//   },
//   bmi: {
//     bmi1: {
//       type: Number,
//       required: true
//     },
//     bmi2: {
//       type: Number,
//       required: true
//     },
//     bmi3: {
//       type: Number,
//       required: true
//     }
//   },
//   systolicBp: {
//     systolicBp1: {
//       type: Number,
//       required: true
//     },
//     systolicBp2: {
//       type: Number,
//       required: true
//     },
//     systolicBp3: {
//       type: Number,
//       required: true
//     }
//   },
//   diastolicBp: {
//     diastolicBp1: {
//       type: Number,
//       required: true
//     },
//     diastolicBp2: {
//       type: Number,
//       required: true
//     },
//     diastolicBp3: {
//       type: Number,
//       required: true
//     }
//   },
//   fbs: {
//     fbs1: {
//       type: Number,
//       required: true
//     },
//     fbs2: {
//       type: Number,
//       required: true
//     },
//     fbs3: {
//       type: Number,
//       required: true
//     }
//   },
//   rbs: {
//     rbs1: {
//       type: Number,
//       required: true
//     },
//     rbs2: {
//       type: Number,
//       required: true
//     },
//     rbs3: {
//       type: Number,
//       required: true
//     }
//   }
// }
// ,
//   { timestamps: true }
// );


// patient Questionnaire refs -> [staffId,PatientId,healthData]
const PatientQuestionSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff', // Reference the Staff model
    required: true
  },
  PatientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference the Patient model
    required: true
  },
  healthData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthData', // Reference the HealthData model
    required: true
  },
  smoking: { 
    type: String,
    required: true,
  },
  alcoholIntake: {
    type: String,
    required: true,
  },
  sugaryIntake: {
    type: String,
    required: true,
  },
  fattyFoodIntake: {
    type: String,
    required: true,
  },
  saltIntake: {
    type: String,
    required: true,
  },
  saltType: {
    type: String,
    required: true,
  },
  outsideDiet: {
    type: String,
    required: true,
  },
  processedFood: {
    type: String,
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  workStress: {
    type: String,
    required: true,
  },

},
  { timestamps: true }
);


// UPDATING rEFERENCE IN PATIENT
// Patient.findByIdAndUpdate(patientId, { healthData: newHealthData._id })
//   .then(() => console.log('Patient health data linked!'))
//   .catch(err => console.error(err));


export const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);
export const Patient = mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
export const HealthData = mongoose.models.HealthData || mongoose.model("HealthData", healthDataSchema);
export const PatientQuestion = mongoose.models.PatientQuestion || mongoose.model("PatientQuestion", PatientQuestionSchema);

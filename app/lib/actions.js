"use server";

import { revalidatePath } from "next/cache";
import { HealthData, Patient, PatientQuestion, Staff } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { sendMail } from "./mailService";

function generateStrongPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}


// adding a new Facility
export const addFacility = async (formData) => {
  const { name,email, location,district, gps,isAdmin,phone,link} = Object.fromEntries(formData);
  const password = generateStrongPassword();

  
  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Staff({
      name,
      email,
      location,
      district,
      gps,
      isAdmin,
      phone,
      password: hashedPassword,
      address: '--',
    });

    const newFacility = await newUser.save();

    if(newFacility){
      // console.log(password, email,name)
         await sendMail(
        {
          to:email,
          subject : "Welcome to Health Tracker App",
          name:name,
          password:password,
          status : 'new',
          link : link
        })

        // console.log(emailSent);
    }

  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateFacility = async (formData) => {

  const { id, name, email, location,district, gps,isAdmin,phone,link } =
    Object.fromEntries(formData);

    const password = generateStrongPassword();
  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateFields = {
      name,
      email,
      location,
      district,
      gps,
      isAdmin,
      phone,
      password: hashedPassword,
      address : '--',
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    const newUpdateFacility= await Staff.findByIdAndUpdate(id, updateFields);

    if(newUpdateFacility){
      // console.log(password, email,name)
      await sendMail(
        {
          to:email,
          subject : "Health Tracker: Staff Record Update",
          name:name,
          password:password,
          status : 'update',
          link : link
        })
    }

  } catch (err) {
    // console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};


export const deleteFacility = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Staff.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete Facility!");
  }

  revalidatePath("/dashboard/users");
};


export const addPatient = async (data) => {


  let id = null;

  try {
    connectToDB();
    const newPatient = new Patient(data);
    const pat_info = await newPatient.save();
    id = pat_info.id
  } catch (err) {
    // console.log(err);
    throw new Error("Failed to Add A new Patient!");
  }

  // revalidatePath("/dashboard/clients");
  await redirect(`/dashboard/clients/${id}`);
};


// Adding Patient Data
export const addPatientHealthData = async (data) => {
  let health_id = null;
  let url = null;

  try {
    connectToDB();
    // console.log(data)
    const newPatient = new HealthData(data);
    const healthData = await newPatient.save();

    health_id = healthData.id
    url =`/dashboard/clients/${data.PatientId}/${health_id}`;

  } catch (err) {
    console.log(err);
    throw new Error("Failed to Add A new Patient!");
  }

  if(url){
    // console.log('redirecting / returning the link')
    return await url;
  }
};


// Adding Patient Questionnaire
export const addPatientQuestionnaire = async (data) => {

  try {
    connectToDB();
    // console.log(data)
    const newPatient = new PatientQuestion(data);
    await newPatient.save();

  } catch (err) {
    console.log(err);
    throw new Error("Failed to Add Questionnaire!");
  }

  revalidatePath("/dashboard/clients");
  await redirect(`/dashboard/clients`);
};

// Update Patient Info
export const updatePatient= async (id,data) => {
  // console.log(data)

  try {
    connectToDB();

    Object.keys(data).forEach(
      (key) =>
        (data[key] === "" || data[key] === undefined || data[key] === '--' ) && delete data[key]
    );


    await Patient.findByIdAndUpdate(id, data);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update Patient!");
  }

  redirect(`/dashboard/clients/data/${data.slug}-${id}`);
};


// Update Patient Info
export const updateHealthData= async (id,patId,data,slug) => {

  try {
    connectToDB();

    // Object.keys(data).forEach((key) =>
    //     (data[key] == '' || data[key] === undefined || data[key] === null ) && delete data[key]
    // );
    // Object.entries(data).forEach(([key, value]) => {
    //   if (typeof value === 'object') {
    //     Object.entries(value).forEach(([subKey, subValue]) => {
    //       if (subValue === '') {
    //         delete data[key][subKey];
    //       }
    //     });
    //   } else if (value === '') {
    //     delete data[key];
    //   }
    // });
    
  // console.log(data)

    await HealthData.findByIdAndUpdate(id, data);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update Patient!");
  }

  redirect(`/dashboard/clients/data/${slug}-${patId}`);
};


// Update PatientQuestionnaire
export const updatePatientQuestionnaire= async (id,patId,data,slug) => {

  try {
    connectToDB();

    Object.keys(data).forEach(
      (key) =>
        (data[key] === "" || data[key] === undefined || data[key] === null) && delete data[key]
    );

  // console.log(data)
    await PatientQuestion.findByIdAndUpdate(id, data);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update Patient!");
  }

  redirect(`/dashboard/clients/data/${slug}-${patId}`);
};


// Delete Patient
export const deletePatientRecord = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Staff.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete Facility!");
  }

  revalidatePath("/dashboard/users");
};

export  async function deletePatientAndRelatedRecords(id) {
  let refresh = false;
  try {
    // Delete Patient Qtns records
    await PatientQuestion.deleteMany({ PatientId: id });

    // Delete PatientData records
    await HealthData.deleteMany({ PatientId: id });


    // Delete the Patient record
    await Patient.findByIdAndDelete(id);

    refresh = true

    console.log(`Patient and related records deleted successfully`);
  } catch (error) {
    console.error(`Error deleting patient and related records: ${error}`);
  }

  revalidatePath("/dashboard/users");
  console.log(refresh)
  // if(refresh) return revalidatePath("/dashboard/users");
}

// export const addProduct = async (formData) => {
//   const { title, desc, price, stock, color, size } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const newProduct = new Product({
//       title,
//       desc,
//       price,
//       stock,
//       color,
//       size,
//     });

//     await newProduct.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create product!");
//   }

//   revalidatePath("/dashboard/products");
//   redirect("/dashboard/products");
// };




// export const deleteProduct = async (formData) => {
//   const { id } = Object.fromEntries(formData);

//   try {
//     connectToDB();
//     await Product.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete product!");
//   }

//   revalidatePath("/dashboard/products");
// };

export const authenticate = async (prevState, formData) => {
  const { name, password } = Object.fromEntries(formData);

  // console.log(name, password );
  try {
    await signIn("credentials", { name, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};

"use client"
 
import { useState } from "react";
import Loader from "../loader/Loader";
import { capitalizeWords, makeSlug } from "@/app/lib/utils";
import styles from "./clientsForm.module.css";

const ClientsForm = ({staff,addPatient}) => {
  // console.log(staff)

  // firstName,lastName,middleName,phone,gender,age,maritalStatus,education,slug,healthData[ref the ID of the health data document],patientQuestion[]
  const [error, setError]  = useState(null);
  const [loading, setLoading]  = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();

    
    if(staff.isAdmin) return alert("Admin cannot add Clients!");
    
    const form = document.forms.clientForm;
    
    const {firstName,lastName,middleName,phone,gender,age,maritalStatus,education} =  form;
    
    if(firstName.value === "" || lastName.value === "" || gender.value === "" || age.value === "" || maritalStatus.value === "" || education.value === ""){
      setError('please Enter all fields');
    }else{
      setError(null)
      setLoading(true)
      const data = {
        firstName: capitalizeWords(firstName.value),
        lastName: capitalizeWords(lastName.value),
        middleName: middleName.value == "" ? null : capitalizeWords(middleName.value),
        phone: phone.value == "" ? null : phone.value,
        gender: capitalizeWords(gender.value),
        age: age.value * 1,
        maritalStatus: maritalStatus.value,
        education: capitalizeWords(education.value),
        slug: `${firstName.value.trim().toLowerCase()+'-'}${middleName.value ? makeSlug(middleName.value.trim().toLowerCase())+'-' : ''}${lastName.value.trim().toLowerCase()}`,
        Officer : staff.id 
      }

      addPatient(data);
    }
  }

  

  return (
    <div className={styles.container}>
        {error ? <div className={styles.msg}>{error}</div> : <div className={styles.pageTitle}>Add A New Patient</div>}
      { loading && < Loader text={''}/>}
        <div>
        <form name="clientForm" className={styles.form}>
            <div className={styles.group}>
              <label className={styles.label}>FirstName<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="firstName" placeholder="Enter FirstName" autoComplete="off" required/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>lastName<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="lastName" placeholder="Enter lastName" autoComplete="off" required/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>middleName</label>
              <input type="text" className={styles.input} name="middleName" autoComplete="off" placeholder="Enter middleName"/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Age<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="age" placeholder="Enter Your Age" autoComplete="off" required/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Phone</label>
              <input type="text" className={styles.input} name="phone" autoComplete="off" placeholder="Enter Phone Number"/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Gender<span className={styles.required}>*</span></label>
              <select name="gender" id="gender" className={styles.input} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>education<span className={styles.required}>*</span></label>
              <select name="education" id="education" className={styles.input} required>
                <option value="">Select Educational Level</option>
                <option value="nil">Nil</option>
                <option value="primary">Primary</option>
                <option value="jhs">JHS</option>
                <option value="shs">SHS</option>
                <option value="tertiary">Tertiary</option>
              </select>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>MaritalStatus<span className={styles.required}>*</span></label>
              <span className={styles.radios}>
              <span>Married <input type="radio"  name="maritalStatus" value={true} required/></span>
              <span>Single <input type="radio"  name="maritalStatus" value={false} required/></span>
              </span>
            </div>
            <div className={styles.btnBox}>
             <button type="submit" className={styles.btn} onClick={handleSubmit}>{loading ? 'Adding Patient': 'Add Patient'}</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default ClientsForm

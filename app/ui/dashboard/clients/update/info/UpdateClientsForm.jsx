"use client"
import { useState } from "react";
import { capitalizeWords, makeSlug } from "@/app/lib/utils";
import styles from "./updateClientsForm.module.css";
import Loader from "../../../loader/Loader";


const UpdateClientsForm = ({staff,id, patient, updatePatient, first_Name, last_Name,middle_Name}) => {

  const [error, setError]  = useState(null);
  const [loading, setLoading]  = useState(false);

  const handleMiddleName = middle_Name === null ? '' : makeSlug(middle_Name.toLowerCase());


  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true);

    if(staff.isAdmin) return setError("Admin cannot add Clients!");

    if(staff !== patient.Officer) return alert("You don't have permission to Update this Record!");

    const form = document.forms.clientForm;
    const {firstName,lastName,middleName,phone,gender,age,maritalStatus,education} =  form;

    const setFirstName = ((firstName.value === "") || ( firstName.value === undefined)) ? first_Name : firstName.value;
    const setMiddleName = ((middleName.value === "") || ( middleName.value === undefined)) ? handleMiddleName+'-' : middleName.value.toLowerCase() === "delete" ? "" : makeSlug(middleName.value.toLowerCase())+'-';
    const setLastName = (lastName.value === "" ||  lastName.value === undefined) ? last_Name : lastName.value;

    const slug = `${setFirstName.toLowerCase()}-${setMiddleName}${setLastName.toLowerCase()}`
 
      const data = {
        firstName: capitalizeWords(firstName.value),
        lastName: capitalizeWords(lastName.value),
        middleName:  middleName.value.toLowerCase() === "delete"  ? null : middleName.value === "" ? middle_Name : capitalizeWords(middleName.value.trim()),
        phone: phone.value == "" ? patient?.phone : phone.value,
        gender: capitalizeWords(gender.value),
        age: age.value === "" ? patient.age : age.value * 1,
        maritalStatus: maritalStatus.value,
        education: capitalizeWords(education.value),
        slug: slug,
        Officer : staff.id 
      }

      updatePatient(id, data);
      // setLoading(false);
  }

  return (
    <div className={styles.container}>
        
        {error ? <div className={styles.msg}>{error}</div> : <p className={styles.pageTitle}>Update Patient Info.</p>}
      { loading && < Loader text={''}/>}
        <form name="clientForm" className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label className={styles.label}>Update FirstName<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="firstName" placeholder={patient.firstName} autoComplete="off"/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Update LastName<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="lastName" placeholder={patient.lastName} autoComplete="off"/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Update MiddleName</label>
              <input type="text" className={styles.input} name="middleName" placeholder={patient?.middleName} autoComplete="off"/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Update Age<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="age" placeholder={patient.age} autoComplete="off"/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Update Phone</label>
              <input type="text" className={styles.input} name="phone" placeholder={patient.phone} autoComplete="off"/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Update Gender<span className={styles.required}>*</span></label>
              <select name="gender" id="gender" className={styles.input} defaultValue={patient.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
     
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Update Education<span className={styles.required}>*</span></label>
              <select name="education" id="education" defaultValue={patient.education} className={styles.input}>
                <option value="nil">Nil</option>
                <option value="primary" >Primary</option>
                <option value="jhs">JHS</option>
                <option value="shs">SHS</option>
                <option value="tertiary">Tertiary</option>
              </select>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Update MaritalStatus<span className={styles.required}>*</span></label>
              <span className={styles.radios}>
              <span>Married <input type="radio"  name="maritalStatus" value={true} defaultChecked={patient.maritalStatus} /></span>
              <span>Single <input type="radio"  name="maritalStatus" value={false} defaultChecked={!patient.maritalStatus}/></span>
              </span>
            </div>
            <div className={styles.btnBox}>
             <button type="submit" className={styles.btn}>{loading ? 'Updating ...': "Update Info"}</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateClientsForm

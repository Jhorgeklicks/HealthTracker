"use client"

import styles from "./updateClientsForm.module.css";


const UpdateClientsForm = ({staff,id, patient, updatePatient, first_Name, last_Name,middle_Name}) => {
  const handleMiddleName = middle_Name === null ? '' : middle_Name.toLowerCase();


  const handleSubmit = (e)=>{
    e.preventDefault();

    if(staff.isAdmin) return alert("Admin cannot add Clients!");
    if(staff !== patient.Officer) return alert("You don't have permission to Update this Record!");

    const form = document.forms.clientForm;
    const {firstName,lastName,middleName,phone,gender,age,maritalStatus,education} =  form;

    const setFirstName = ((firstName.value === "") || ( firstName.value === undefined)) ? first_Name : firstName.value;
    const setMiddleName = ((middleName.value === "") || ( middleName.value === undefined)) ? handleMiddleName+'-' : middleName.value.toLowerCase() === "delete" ? "" : middleName.value.toLowerCase()+'-';
    const setLastName = (lastName.value === "" ||  lastName.value === undefined) ? last_Name : lastName.value;

    const slug = `${setFirstName.toLowerCase()}-${setMiddleName}${setLastName.toLowerCase()}`
 
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        middleName:  middleName.value.toLowerCase() === "delete"  ? null : middleName.value === "" ? middle_Name : middleName.value.trim(), 
        phone: phone.value == "" ? patient?.phone : phone.value,
        gender: gender.value,
        age: age.value === "" ? patient.age : age.value * 1,
        maritalStatus: maritalStatus.value,
        education: education.value,
        slug: slug,
        Officer : staff.id 
      }

      updatePatient(id, data);
  }

  return (
    <div className={styles.container}>
        
      {/* error ? (<div className={styles.msg}>{error ? error : "Update User Info"}</div>): */}
      {
        (<p className={styles.pageTitle}>Update Patient Info.</p>)
      }
        <form action="" name="clientForm" className={styles.form}>
            <div className={styles.group}>
              <label className={styles.label}>FirstName<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="firstName" placeholder={patient.firstName}/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>lastName<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="lastName" placeholder={patient.lastName}/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>middleName</label>
              <input type="text" className={styles.input} name="middleName" placeholder={patient?.middleName}/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Age<span className={styles.required}>*</span></label>
              <input type="text" className={styles.input} name="age" placeholder={patient.age}/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Phone</label>
              <input type="text" className={styles.input} name="phone" placeholder={patient.phone}/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Gender<span className={styles.required}>*</span></label>
              <select name="gender" id="gender" className={styles.input} defaultValue={patient.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
     
            </div>
            <div className={styles.group}>
              <label className={styles.label}>education<span className={styles.required}>*</span></label>
              <select name="education" id="education" defaultValue={patient.education} className={styles.input}>
                <option value="nil">Nil</option>
                <option value="primary" >Primary</option>
                <option value="jhs">JHS</option>
                <option value="shs">SHS</option>
                <option value="tertiary">Tertiary</option>
              </select>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>MaritalStatus<span className={styles.required}>*</span></label>
              <span className={styles.radios}>
              <span>Married <input type="radio"  name="maritalStatus" value={true} defaultChecked={patient.maritalStatus} /></span>
              <span>Single <input type="radio"  name="maritalStatus" value={false} defaultChecked={!patient.maritalStatus}/></span>
              </span>
            </div>
            <div className={styles.btnBox}>
             <button type="submit" className={styles.btn} onClick={handleSubmit}>Update Info</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateClientsForm

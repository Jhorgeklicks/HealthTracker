"use client";
import { useState } from "react";
import styles from "./updateClientHealthDataForm.module.css";

const UpdateClientsHealthDataForm = ({id,staff, healthData, updateHealthData}) => {
  // addPatientHealthData
// console.log(healthData.PatientId._id)
  const [error, setError] = useState(null);

  const onlyNumbersOrFloats = (num) =>  {
    if (typeof num === 'number' && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // if staff didn't add this record, restrict him from updating it!
    if(staff !== healthData.staffId) return alert("You don't have permission To Update this record!");

    const form = document.forms.clientForm;
    // userId,weight:{weight1:100,weight2:100,weight3:100},height:{height1:100,height2:100,height3:100},bmi:{},systolicBp,diastolicBp,rbs,fbs
    const {weight,height,bmi,systolicBp,diastolicBp,rbs,fbs} = form;

      if(
        onlyNumbersOrFloats(weight?.value) ||
        onlyNumbersOrFloats(height?.value) || 
        onlyNumbersOrFloats(bmi?.value) || 
        onlyNumbersOrFloats(systolicBp?.value) || 
        onlyNumbersOrFloats(diastolicBp?.value) || 
        onlyNumbersOrFloats(rbs?.value) || 
        onlyNumbersOrFloats(fbs?.value) 
    ){
        setError('Only numbers or decimals are allowed!');
      }else{
        setError(null)

      const data = {
        userId: id,
        weight      : weight.value      === '' ? healthData?.weight : weight.value,
        height      : height.value      === '' ? healthData?.height : height.value,
        bmi         : bmi.value         === '' ? healthData?.bmi : bmi.value,
        systolicBp  : systolicBp.value  === '' ? healthData?.systolicBp : systolicBp.value,
        diastolicBp : diastolicBp.value === '' ? healthData?.diastolicBp : diastolicBp.value,
        rbs         : rbs.value         === '' ? healthData?.rbs : rbs.value,
        fbs         : fbs.value         === '' ? healthData?.fbs : fbs.value
      };
      updateHealthData(id, healthData.PatientId._id, data, healthData.PatientId.slug);
    
    }
  };

  setTimeout( () => {
    setError(null)
  },2000);

  return (
    <div className={styles.container}>
      {/* <div className={styles.msg}>{error && error}</div> */}
      {
        error ? (<div className={styles.msg}>{error ? error : "Update User Health"}</div>):
        (<p className={styles.pageTitle}>Update Patient Health Data.</p>)
      }

      <form action="" name="clientForm" className={styles.form}>
          <div className={styles.group}>
            <label className={styles.label}>Update Height<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="height" placeholder={healthData?.height} required/>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Update Weight1<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="weight" placeholder={healthData?.weight} required/>
          </div>
 
          <div className={styles.group}>
            <label className={styles.label}>Update BMI<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="bmi" placeholder={healthData?.bmi} required/>
          </div>
      
          <div className={styles.group}>
            <label className={styles.label}>Update SystolicBp<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="systolicBp" placeholder={healthData?.systolicBp} required/>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Update DiastolicBp<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="diastolicBp" placeholder={healthData?.diastolicBp} required/>
          </div>
      
      
          <div className={styles.group}>
            <label className={styles.label}>Update FBS<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="fbs" placeholder={healthData?.fbs}/>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Update RBS<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="rbs" placeholder={healthData?.rbs}/>
          </div>

        <div className={styles.btnBox}>
          <button type="submit" className={styles.btn} onClick={handleSubmit}>
            Update Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClientsHealthDataForm;

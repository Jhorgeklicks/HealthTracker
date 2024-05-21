"use client";

import { useState } from "react";
import styles from "./clientHealthDataForm.module.css";
import Loader from "../../loader/Loader";
import { useRouter } from "next/navigation";

const ClientsHealthDataForm = ({staffId,id,addPatientHealthData,height}) => {
  // addPatientHealthData
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const router = useRouter()

  const onlyNumbersOrFloats = (num) =>  {
    if (typeof num === 'number' && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    const form = document.forms.clientForm;
    const {weight, height, bmi, systolicBp, diastolicBp, rbs, fbs } = form;
    if (
      weight.value === "" ||
      height.value === ""  ||
      bmi.value === "" ||
      systolicBp.value === "" ||
      diastolicBp.value === "" ||
      rbs.value === "" ||
      fbs.value === ""
    ) {
      setError("please Enter all fields");
    } else {

      if(
        onlyNumbersOrFloats(weight?.value) || onlyNumbersOrFloats(height?.value) ||
        onlyNumbersOrFloats(bmi?.value) || onlyNumbersOrFloats(systolicBp?.value) ||
        onlyNumbersOrFloats(diastolicBp?.value) || onlyNumbersOrFloats(rbs?.value) ||
        onlyNumbersOrFloats(fbs?.value) 
    ){
        setError('Only numbers or floats are accepted');
      }else{
        window.scrollTo({
          top:0,
          behavior : 'smooth'
          })
        setError(null)
        setLoading(true)

 // refs -> [staffId,PatientId]
      const data = {
        staffId:staffId,
        PatientId: id,
        weight: weight.value,
        height: height.value,
        bmi: bmi.value,
        systolicBp: systolicBp.value,
        diastolicBp : diastolicBp.value,
        rbs: rbs.value,
        fbs:fbs.value
      };

     const url = await addPatientHealthData(data);
     if(url){
      setLoading(false)

      router.push(url)
    }
    }
    }
  };

  return (
    <div className={styles.container}>
        {error ? <div className={styles.msg}>{error}</div> : <div className={styles.pageTitle}>Add Patient Health Data</div>}
        { loading && < Loader text={''}/>}
      <form action="" name="clientForm" className={styles.form}>
        
       {/* heights */}
       
          <div className={styles.group}>
            <label className={styles.label}>Height<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="height" placeholder={height === null ? "Enter height" : height} defaultValue={height !== null ? height : ''} disabled={height !== null} autoComplete="off" required/>
          </div>

        {/* weights */}
        
          <div className={styles.group}>
            <label className={styles.label}>Weight<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="weight" placeholder="Enter weight"autoComplete="off" required/>
          </div>
 
       {/* bmi */}
        
          <div className={styles.group}>
            <label className={styles.label}>Bmi<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="bmi" placeholder="Enter bmi"autoComplete="off" required/>
          </div>
      
       {/* SystolicBp */}
        
          <div className={styles.group}>
            <label className={styles.label}>SystolicBp<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="systolicBp" placeholder="Enter systolicBp"autoComplete="off" required/>
          </div>

       {/* diastolicBp */}
        
          <div className={styles.group}>
            <label className={styles.label}>DiastolicBp<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="diastolicBp" placeholder="Enter diastolicBp"autoComplete="off" required/>
          </div>
      
      
       {/* rbs */}
        
          <div className={styles.group}>
            <label className={styles.label}>rbs<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="rbs" placeholder="Enter rbs" autoComplete="off" required/>
          </div>
    
       {/* fbs */}
        
          <div className={styles.group}>
            <label className={styles.label}>Fbs<span className={styles.required}>*</span></label>
            <input type="number" className={styles.input} name="fbs" placeholder="Enter fbs" autoComplete="off" required/>
          </div>

        <div className={styles.btnBox}>
          <button type="submit" className={styles.btn} onClick={handleSubmit}>{loading ? "Adding Health Data": "Add Health Data"} </button>
        </div>
      </form>
    </div>
  );
};

export default ClientsHealthDataForm;

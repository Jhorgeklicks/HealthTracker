"use client";

import { useState } from "react";
import styles from "./healthQtnForm.module.css";
import Loader from "../../loader/Loader";
import { healthQuestionnaire } from "@/app/questionnaire";
import { v4 as uuidv4 } from "uuid";

// refs => staffId,PatientId,healthData
const HealthQuestions = ({id, staffId, health_id, addPatientQuestionnaire}) => {
const [loading,setLoading] = useState(false)

  const [error, setError] = useState(null);
  // const names = ['smoking','alcoholIntake','sugaryIntake','fattyFoodIntake','saltIntake','saltType','outsideDiet','processedFood','exercise','workStress']

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.clientForm;

   
    const {smoking,alcoholIntake,sugaryIntake,fattyFoodIntake,saltIntake,saltType,outsideDiet,processedFood,exercise,workStress} = form;

    if (smoking.value === "" || alcoholIntake.value === "" || sugaryIntake.value === "" || fattyFoodIntake.value === "" || saltIntake.value === "" || saltType.value === "" || outsideDiet.value === "" || processedFood.value === "" || exercise.value === " " || workStress === "") {
      window.scrollTo({
        top:0,
        behavior : 'smooth'
        })
      setError("please Select an Option to all the Questions");
    } else {
        window.scrollTo({
        top:0,
        behavior : 'smooth'
        })
        setError(null)
        setLoading(true)

      const data = {
        staffId:staffId,
        PatientId: id,
        healthData : health_id,
        smoking : smoking.value,
        alcoholIntake : alcoholIntake.value,
        sugaryIntake:sugaryIntake.value,
        fattyFoodIntake: fattyFoodIntake.value, 
        saltIntake : saltIntake.value,
        saltType: saltType.value,
        outsideDiet : outsideDiet.value,
        processedFood : processedFood.value,
        exercise: exercise.value,
        workStress:workStress.value
      };

      addPatientQuestionnaire(data);
    }
    
  };

  return (
    <div className={styles.container}>
        {error ? <div className={styles.msg}>{error}</div> : <div className={styles.pageTitle}>Patient Questionnaire</div>}
         { loading && < Loader text={''}/>}
      <form action="" name="clientForm" className={styles.form}>

        <>
        {
          healthQuestionnaire.map( qtns => 
            <div className={styles.group} key={uuidv4()}>
            <label className={styles.label}><code>{qtns.id}</code> {qtns.qtn} <span className={styles.required}>*</span></label>
            
            <div className={styles.options}>
              <>
              {
                qtns.options.map( (option,index) => 
                <span key={uuidv4()} className={styles.option}><input type="radio" value={option} name={qtns.tag} className={styles.radio}/>{option}</span>
              )
            }
            </>
            </div>
        </div>
        )
      }
      </>

        <div className={styles.btnBox}>
          <button type="submit" className={styles.btn} onClick={handleSubmit}>{loading ? "Recording Response": "Add Response"}</button>
        </div>
      </form>
    </div>
  );
};

export default HealthQuestions;

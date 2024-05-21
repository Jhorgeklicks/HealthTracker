"use client";

import { useState } from "react";
import styles from "./updateHealthQtnForm.module.css";
import { healthQuestionnaire } from "@/app/questionnaire";

// refs => staffId,PatientId,healthData
const UpdateHealthQuestions = ({staff, id, questionnaire,updatePatientQuestionnaire}) => {
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(staff !== questionnaire.staffId ) return alert("You don't have permission To Update this record!");

    const form = document.forms.clientForm;

    const {smoking,alcoholIntake,sugaryIntake,fattyFoodIntake,saltIntake,saltType,outsideDiet,processedFood,exercise,workStress} = form;

        setError(null)

      const data = {
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

      updatePatientQuestionnaire(id,questionnaire.PatientId._id, data,questionnaire.PatientId.slug);
    
  };

  return (
    <div className={styles.container}>
      <form action="" name="clientForm" className={styles.form}>
        {
          error && <div className={styles.msg}>{error && error}</div>
        }
        {
          healthQuestionnaire.map( (qtns,index) => 
          <>
            <div className={styles.group} key={`${qtns.id}--${index}`}>
            <label className={styles.label}><code>{qtns.id}</code> {qtns.qtn} <span className={styles.required}>*</span></label>
            
            <div className={styles.options}>
              {
                qtns.options.map( (option,index) => 
                <>
                <span key={`${qtns.tag}-${qtns.id}-${index}`} className={styles.option}>
                  <input type="radio" value={option} name={qtns.tag} className={styles.radio} defaultChecked={ option === questionnaire[qtns.tag] }/>{option}
                </span>
                </>
              )
              }
            </div>
        </div>
          </>
        )
        }

        <div className={styles.btnBox}>
          <button type="submit" className={styles.btn} onClick={handleSubmit}>
            Update Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateHealthQuestions;

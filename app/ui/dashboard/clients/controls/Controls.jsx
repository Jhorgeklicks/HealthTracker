"use client";
import styles from "./controls.module.css";
import { useState } from "react";

const Controls = ({ length, current, updateCurrent, facility }) => {
  const [currentValue, setCurrentValue] = useState(current || 0);

  const handleData = (opt) => {
    if (opt === "next") {
      if (currentValue < length - 1) {
        const newCurrentValue = currentValue + 1;
        setCurrentValue(currentValue + 1);
        updateCurrent(newCurrentValue);
      }
    }

    if (opt === "prev") {
      if (currentValue > 0) {
        const newCurrentValue = currentValue - 1;
        setCurrentValue(currentValue - 1);
        updateCurrent(newCurrentValue);
      }
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {currentValue > 0 && (
          <button onClick={() => handleData("prev")} className={styles.prev}>
            &laquo;&nbsp;Prev
          </button>
        )}
      </div>

      <div className={styles.facility}>{facility}</div>

      <div className={styles.right}>
        {length > 0 && currentValue < length - 1 && (
          <button onClick={() => handleData("next")} className={styles.prev}>
            Next&nbsp;&raquo;
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;

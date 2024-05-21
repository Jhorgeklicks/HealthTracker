import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdArrowRight } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="" fill sizes="400"/>
        </div>
        <div className={styles.text}>
          <h4 className={styles.notification}>🔥 Quick Tips</h4>
          <div className={styles.group}>
            <h5 className={styles.title}>1.&nbsp; Focus on a Healthy Diet:</h5>
            <span className={styles.subtitle}><MdArrowRight/>&nbsp;Prioritize whole, unprocessed foods like fruits, vegetables, and whole grains</span>
            <span className={styles.subtitle}><MdArrowRight/>&nbsp;Limit sugary drinks, processed foods, and excessive intake of unhealthy fats and salt</span>
            <span className={styles.subtitle}><MdArrowRight/>&nbsp;Limit or avoid alcohol consumption and avoid smoking</span>
            <span className={styles.subtitle}><MdArrowRight/>&nbsp;Get enough calcium and vitamin D through your diet or supplements.
</span>
          </div>
          <div className={styles.group}>
            <h5 className={styles.title}>2.&nbsp; Increase Physical Activity:</h5>
            <span className={styles.subtitle}><MdArrowRight/>&nbsp;Aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week</span>
            <span className={styles.subtitle}><MdArrowRight/>&nbsp;Regular exercise helps manage weight, improve blood pressure, and contributes to overall well-being</span>
            <span className={styles.subtitle}><MdArrowRight/>&nbsp;Engage in stress-reducing activities, such as meditation or deep breathing exercises</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;

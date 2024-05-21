import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ label, number }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} className={styles.iconColor} />
      <div className={styles.texts}>
        <span className={styles.title}>{label}</span>
        <span className={styles.number}>{number}</span>
      </div>
    </div>
  );
};

export default Card;

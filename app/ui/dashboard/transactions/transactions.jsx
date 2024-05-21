import { v4 as uuidv4 } from 'uuid';
import styles from "./transactions.module.css";

const Transactions = ({data}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{ data.length > 1 ? `Top ${data.length} Most Visited Clients` : `Most Visited Client`} </h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Facility</th>
            <th>Total Visit</th>
          </tr>
        </thead>
        <tbody>
          <>
          {
            data && data.length > 0 && data.map( (patient,index) => (
                    <tr key={uuidv4()} className={ index % 2 == 0 ? styles.stripe : ""}>
                      <td>{`${patient.firstname} ${patient.lastname}`}</td>
                      <td>{`${patient.age}`}</td>
                      <td>{`${patient.gender}`}</td>
                      <td>{patient?.staffName ? patient?.staffName : 'local' }</td>
                      <td>{`${patient.count}`}</td>
                    </tr>
            ) )
          }
          </>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

"use client"
import styles from "@/app/ui/dashboard/clients/clients.module.css";

const DeleteClient = ({id, deletePatientAndRelatedRecords}) => {

    const handleDeleteClientsRecords = (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you want to delete this record permanently")) {
            deletePatientAndRelatedRecords(id)
          }
    }

  return (
    <>
        <button className={`${styles.button} ${styles.delete}`} onClick={handleDeleteClientsRecords}>Delete</button>
    </>
  )
}

export default DeleteClient
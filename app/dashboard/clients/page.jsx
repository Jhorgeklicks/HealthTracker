// import { deleteFacility } from "@/app/lib/actions";
import { fetchClients } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/clients/clients.module.css";
// import Image from "next/image";
import Link from "next/link";
import { deletePatientAndRelatedRecords } from "@/app/lib/actions";
import DeleteClient from "./delete/page";

const clients = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, allClients } = await fetchClients(q, page);
  // console.log(allClients)

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/clients/add">
          <button className={styles.addButton}>Add Patient</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr> 
            <td>Name</td>
            <td>Gender</td>
            <td>Age</td>
            <td>MaritalStatus</td>
            <td>Education</td>
            <td>Added On</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {allClients?.map((staff,index) => (
            <tr key={staff.id} className={ index % 2 == 0 ? styles.stripe : ""}>
              <td>
                <div className={styles.user}>
                  {`${staff.firstName} ${staff.middleName == null ? " " : staff.middleName } ${staff.lastName}` }
                </div>
              </td>
              <td>{staff.gender}</td>
              <td>{staff.age}</td>
              <td>{staff.maritalStatus ? 'Married' : 'Single'}</td>
              <td>{staff.education}</td>
              <td>{staff.createdAt?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/clients/data/${staff.slug}-${staff.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  {/* /dashboard/clients/${id} */}
                  <Link href={`/dashboard/clients/new/${staff.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Add New Data
                    </button>
                  </Link>
                  <DeleteClient id={staff.id} deletePatientAndRelatedRecords={deletePatientAndRelatedRecords}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default clients;

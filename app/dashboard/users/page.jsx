import { fetchStaff } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
// import Image from "next/image";
import Link from "next/link";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, allStaff } = await fetchStaff(q, page);
  // console.log(allStaff)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New Facility</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr> 
            <td>Name</td>
            <td>Email</td>
            <td>Location</td>
            <td>District</td>
            <td>GPS</td>
            {/* <td>Role</td> */}
            <td>phone</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {allStaff.map((staff, index) => 
          staff.isAdmin ? "" : 
          (
            <tr key={staff.id} className={ index % 2 == 0 ? styles.stripe : ""}>
              <td>
                <div className={styles.user}>
                  {staff.name}
                </div>
              </td>
              <td>{staff.email}</td>
              <td>{staff.location}</td>
              {/* <td>{staff.createdAt?.toString().slice(4, 16)}</td> */}
              <td>{staff.district}</td>
              <td>{staff.gps}</td>
              {/* <td>{staff.isAdmin ? "Admin" : "Staff"}</td> */}
              <td>{staff.phone ? staff.phone : '0000000000'}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${staff.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>

                  {/* <form action={deleteFacility}>
                    <input type="hidden" name="id" value={(staff.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form> */}
                  
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

export default UsersPage;

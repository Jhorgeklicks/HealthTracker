"use client"
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { useState } from "react";
import Loader from "../../loader/Loader";

const getURL = async () => {
  const url = await fetch(`http://localhost:3000/api/url`);
  const url_link = await url.json();
  return url_link.url;
}

const UpdateClient = ({ facility, updateFacility }) => {
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const link = await getURL();

    setLoading(true); 

    try {
      // Extract form data:
      const formData = new FormData(e.target); 
      formData.append('link', link); 

      // Update facility using provided function:
      await updateFacility(formData); 
      setLoading(false);


    } catch (error) {
      console.error("Error updating facility:", error); // Handle errors
    } finally {
      setLoading(false); // Set loading state back to false regardless of success/error
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.pageTitle}>Update Facility</div>
        { loading && <Loader text={""}/> }
        <form onSubmit={handleSubmit} className={styles.form}>

          <input type="hidden" name="id" value={facility._id} />
          <div className={styles.group}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              name="name"
              placeholder={facility.name}
              defaultValue={facility.name}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder={facility.email}
              defaultValue={facility.email}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Location</label>
            <input type="text" name="location" placeholder={facility.location} />
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Password</label>
            <input type="password" name="password" />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>District</label>
            <input
              type="text"
              name="district"
              placeholder={facility.district}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>GPS</label>
            <input type="text" name="gps" placeholder={facility.gps} />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Phone</label>
            <input type="text" name="phone" placeholder={facility.phone} />
          </div>
          <div className={`${styles.group}`}>
            <label className={styles.label}>Is Admin?</label>

            <select name="isAdmin" id="isAdmin" defaultValue={facility.isAdmin}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <button type="submit">{loading ? "Updating Facility" : "Update Facility"}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateClient;

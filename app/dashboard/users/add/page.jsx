"use client"
import { addFacility } from "@/app/lib/actions";
import Loader from "@/app/ui/dashboard/loader/Loader";
// import Loader from "@/app/ui/dashboard/loader/Loader";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { useState } from "react";

export const getPageURL = async () => {
  const url = await fetch(`http://localhost:3000/api/url`);
  const url_link = await url.json();
  return url_link.url;
}

const AddUserPage = () => {
  // {/* name, location,district, gps,isAdmin,phone,password, address */}
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const link = await getPageURL();

    setLoading(true); 

    try {
      // Extract form data:
      const formData = new FormData(e.target); 
      formData.append('link', link); 

      // Update facility using provided function:
      await addFacility(formData); 
      setLoading(false);


    } catch (error) {
      console.error("Error Adding facility:", error); // Handle errors
    } finally {
      setLoading(false); // Set loading state back to false regardless of success/error
    }
  };


  return ( 
    <div className={styles.container}>
       <div className={styles.pageTitle}>Add a New Facility</div>
     { loading && <Loader text={""}/> }
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Facility Name" name="name" required  autoComplete="off"/>
        <input type="email" placeholder="Facility Email" name="email" required  autoComplete="off"/>
        <input type="text" placeholder="Enter location" name="location" required  autoComplete="off"/>
        <input type="text" placeholder="Enter District" name="district" required  autoComplete="off"/>
        <input type="text" placeholder="Enter GPS" name="gps" required  autoComplete="off"/>
        <input type="text" placeholder="phone" name="phone" autoComplete="off"/>
        <select name="isAdmin" id="isAdmin" className={styles.setFullWidth}>
          <option value={false}>
            Is Admin?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button type="submit">{loading ? 'Adding Facility...' : 'Register Facility'} </button>
      </form>
    </div>
  );
  
};

export default AddUserPage;

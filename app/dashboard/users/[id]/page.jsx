
import { updateFacility } from "@/app/lib/actions";
import { fetchSingleStaff } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import UpdateClient from "@/app/ui/dashboard/users/update/UpdateStaff";

const SingleUserPage = async ({ params }) => {
  
  const { id } = params;
  const facility = await fetchSingleStaff(id);
// converting the data to a plain object
const formatData =JSON.parse(JSON.stringify(facility))
  return (
    <div className={styles.container}>
      {/*  name, location,district, gps,isAdmin,phone, address  */}
      <UpdateClient facility={formatData} updateFacility={updateFacility}/>
    </div>
  );
};

export default SingleUserPage;

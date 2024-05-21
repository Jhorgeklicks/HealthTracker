
import { auth } from "./auth";
import Link from "next/link";
import styles from "@/app/ui/base.module.css"
import { redirect } from "next/navigation";

const Homepage = async () => {
const {user} = auth()

if (!user) return redirect('/login');
  
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Welcome to the Health Tracker App</h2>
        <Link href={'/dashboard'} className={styles.btn}>Go to Dashboard</Link>
      </div>  
    </div>
  )
}

export default Homepage
import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from "../ui/dashboard/footer/footer"

export const metadata = {
  title : "Health Tracker",
  description : "A web application that empowers you to take control of your health by tracking key personal health data and lifestyle factors",
  keywords : 'health tracker,personal health record,weight management,blood pressure tracker,blood sugar tracker,lifestyle habits tracker,diet tracker,exercise tracker,preventive health,chronic disease management'
}

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
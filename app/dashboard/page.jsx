import { auth } from "../auth";
import { CountOfAdmins, CountOfAgeBreakDown,countOfAgeBreakDownByStaffId,CountOfFacilities, CountOfPatients, getOfficerData, getTopPatientsByVisitCount} from "../lib/statistics";
import Card from "../ui/dashboard/card/card";
import DeChart from "../ui/dashboard/chart_two/DeChart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";


const Dashboard = async () => {
  const {user} = await auth();
// console.log(user);
  const facilityCount = await CountOfFacilities();
  const AdminsCount   = await CountOfAdmins();
  const patientsCount = await CountOfPatients();
  
  // Officers  DAtA FETCH request 
  const countOfAgeBreakDownDataByOfficer = await countOfAgeBreakDownByStaffId(user.id);
  const topVisitingPatientsByOfficer     = await getOfficerData(user.id);
  const formatData                       = JSON.parse(JSON.stringify(topVisitingPatientsByOfficer))
  
  // ADMIN DATA fetch request
  const countOfAgeBreakDownData  = await CountOfAgeBreakDown();
  const topVisitingPatientsByAll = await getTopPatientsByVisitCount();
  const formatDataByAll          = JSON.parse(JSON.stringify(topVisitingPatientsByAll))

// console.log(formatDataByAll)

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
            <Card label={'Admin'} number={AdminsCount}/>
              <Card label={'Facilities'} number={facilityCount}/>
            <Card label={'Patients'} number={patientsCount}/>
        </div>

        {
          formatDataByAll.length > 0 && user.isAdmin && <Transactions data={formatDataByAll}/>
        }
       
        {
          formatData.length > 0 && !user.isAdmin && <Transactions data={formatData}/>
        }
       

        {/* BAR CHART */}
        {
          user.isAdmin && countOfAgeBreakDownData.length > 0 && <DeChart newData={countOfAgeBreakDownData} facility={null}/>
        }

        {
          countOfAgeBreakDownDataByOfficer.length > 0 && !user.isAdmin && <DeChart newData={countOfAgeBreakDownDataByOfficer} facility={user.name}/>
        }

        {
          countOfAgeBreakDownDataByOfficer.length < 1 && countOfAgeBreakDownData.length < 1 && formatDataByAll.length < 1 && formatData.length < 1 && <div className={styles.empty}>Visual Box</div>
        }
        
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;

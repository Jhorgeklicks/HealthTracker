import { auth } from '@/app/auth';
import { updateHealthData } from '@/app/lib/actions';
// import { updatePatient } from '@/app/lib/actions';
import { fetchPatientData } from '@/app/lib/data';
import UpdateClientsHealthDataForm from '@/app/ui/dashboard/clients/update/healthData/UpdateClientsHealthDataForm';
// import UpdateClientsForm from '@/app/ui/dashboard/clients/update/info/UpdateClientsForm';

const UpdatePatientInfo = async ({params}) => {
  const { id } = params;
  const healthData  = await fetchPatientData(id);
  
  // converting the data to a plain object
 const formatData =JSON.parse(JSON.stringify(healthData))

  const {user} = await auth();

  return (
    <>
    <div>
    <UpdateClientsHealthDataForm staff={user.id} id={id} healthData={formatData} updateHealthData={updateHealthData} />
    </div>
     </>
  )
}

export default UpdatePatientInfo
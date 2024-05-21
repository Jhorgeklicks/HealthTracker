import { auth } from '@/app/auth';

import { addPatientHealthData } from "@/app/lib/actions"
import {  fetchPatientDataByPatientId } from '@/app/lib/data';
import ClientsHealthDataForm from "@/app/ui/dashboard/clients/healthData/ClientsHealthDataForm";


const patient = async ({ params }) => {
  const {user} = await auth();
    const { id } = params;

    const healthData = await fetchPatientDataByPatientId(id);
      // converting the data to a plain object
 const formatData =JSON.parse(JSON.stringify(healthData))

 const height = formatData?.height ? formatData.height : null;

  return (
   
    <>
    <ClientsHealthDataForm staffId={user.id} id={id} addPatientHealthData={addPatientHealthData} height={height}/>
    </>
  )
}

export default patient
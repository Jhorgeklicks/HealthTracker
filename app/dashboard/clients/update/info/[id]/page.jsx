import { auth } from '@/app/auth';
import { updatePatient } from '@/app/lib/actions';
import { fetchPatientInfo } from '@/app/lib/data';
import UpdateClientsForm from '@/app/ui/dashboard/clients/update/info/UpdateClientsForm';

const UpdatePatientInfo = async ({params}) => {
  const { id } = params;
  const patient = await fetchPatientInfo(id);
  const  {firstName,lastName,middleName,phone,gender,age,maritalStatus,education}= patient;
 const patData = {firstName,lastName,middleName,phone,gender,age,maritalStatus,education,Officer : patient.Officer,userId : patient.id}

 const formatData =JSON.parse(JSON.stringify(patData))

  const {user} = await auth();

  return (
    <>
    <UpdateClientsForm staff={user.id} id={id} patient={formatData} updatePatient={updatePatient}  first_Name={firstName} last_Name={lastName} middle_Name={middleName ? middleName : null}/>
     </>
  )
}

export default UpdatePatientInfo
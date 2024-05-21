import { auth } from '@/app/auth';
import { updatePatientQuestionnaire } from '@/app/lib/actions';
import { fetchPatientQuestionnaire } from '@/app/lib/data';
import UpdateHealthQuestions from '@/app/ui/dashboard/clients/update/healthDataQuestions/UpdateHealthQtnForm';

const UpdatePatientInfo = async ({params}) => {
  const { id } = params;
  const healthData  = await fetchPatientQuestionnaire(id);
  
  // converting the data to a plain object
 const formatData =JSON.parse(JSON.stringify(healthData))

  const {user} = await auth();

  return (
    <>
    <div>
    <UpdateHealthQuestions staff={user.id} id={id} questionnaire={formatData} updatePatientQuestionnaire={updatePatientQuestionnaire} />
    </div>
     </>
  )
}

export default UpdatePatientInfo
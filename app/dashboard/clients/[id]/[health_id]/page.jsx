import { auth } from '@/app/auth';
import { addPatientQuestionnaire } from "@/app/lib/actions";
import HealthQuestions from "@/app/ui/dashboard/clients/healthDataQuestions/HealthQtnForm";

const patient = async ({ params }) => {
    const { id, health_id } = params;
    const {user} = await auth();


  return (

    <>
    <HealthQuestions staffId={user.id} id={id} health_id={health_id} addPatientQuestionnaire={addPatientQuestionnaire}/>
    </>
  )
}

export default patient
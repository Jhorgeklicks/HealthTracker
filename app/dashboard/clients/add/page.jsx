import { addPatient } from "@/app/lib/actions"
import { auth } from "@/app/auth";
import ClientsForm from "@/app/ui/dashboard/clients/ClientsForm"


const patient = async () => {
  const { user } = await auth();
  return (
    <>
    <ClientsForm staff={user} addPatient={addPatient}/>
    </>
  )
}

export default patient

import { auth } from "@/app/auth";
import { fetchSingleClient } from "@/app/lib/data";
import ClientRecordsTable from "@/app/ui/dashboard/clients/record/ClientRecordsTable";
import ClientRecordTable from "@/app/ui/dashboard/clients/record/ClientRecordTable";


const patientData = async ({ params }) => {
  const {user} = await auth();
    const { slug } = params;
     let n_slug = slug.split('-');
    const id = n_slug[n_slug.length - 1];

    const clientInfo = await fetchSingleClient(id);
    const formatData =JSON.parse(JSON.stringify(clientInfo));
    console.log(formatData)

  return (
    <>
    {
      formatData.length > 0 ? 
      <ClientRecordsTable staff={user.id} data={formatData} length={clientInfo.length} />
      :
      <ClientRecordTable staff={user.id} data={formatData} length={clientInfo.length} />
    }
    </>
  )
}

export default patientData
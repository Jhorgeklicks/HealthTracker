import { fetchPatientByName } from "@/app/lib/data";
import { connectToDB } from "@/app/lib/utils";
import { NextResponse } from "next/server"

export const GET = async (req,{params}) => {
    const {name} = params;

    if(!name) return NextResponse.json({"failed":"Cannot fetch User on Empty Query!"})
    try{
        connectToDB();
        const users = await fetchPatientByName(name);
        return NextResponse.json(users)
    }catch(err){

        return NextResponse.json({"failed":"An Error Occured"})
    }
   
}
import { Staff } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";
import { NextResponse } from "next/server"

export const GET = async () => {
    try{
        connectToDB();
        const staff = await Staff.find();
        return NextResponse.json(staff)
    }catch(err){
        return NextResponse.json({"failed":"An Error Occurred"})
    }
   
}
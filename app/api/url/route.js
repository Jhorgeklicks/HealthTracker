import { NextResponse } from "next/server";
export const GET = async (req) => {
  const url = new URL(req.url);
const protocol = url.protocol;
const host = url.host;
    const currentUrl = `${protocol}//${host}`;
    return NextResponse.json({url :  currentUrl })
  }


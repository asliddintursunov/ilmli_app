import { NextResponse } from "next/server";
const trendings = require("@/database/trending.json");
export async function GET() {
  return NextResponse.json(trendings["trending"]);
}

import { NextResponse } from "next/server";
const trendings_by_category = require("@/database/trending_by_category.json");
export async function GET(response: Response) {
  return NextResponse.json({
    message: "GET TRENDINGS BY CATEGORY",
  });
}

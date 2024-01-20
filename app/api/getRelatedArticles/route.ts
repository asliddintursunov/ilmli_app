import { NextResponse } from "next/server";
const articles_by_category = require("@/database/atricles_by_category.json");
export async function GET(request: Request) {
  return NextResponse.json({ message: "GET ARTICLES BY CATEGORY" });
}

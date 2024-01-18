import { NextResponse, NextRequest } from "next/server";
const trendings_by_category = require("@/database/trending_by_category.json");
const articles_by_category = require("@/database/atricles_by_category.json");
export async function GET(req: NextRequest, res: NextResponse) {
  const category = req.nextUrl.searchParams.get("category");
  if (category) {
    console.log("category ->", category);
    return NextResponse.json({ category: category });
  }
  return NextResponse.json({
    error: "category is required",
    message: "GET TRENDINGS BY CATEGORY",
  });
}

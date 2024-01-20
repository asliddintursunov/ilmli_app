import { NextResponse, NextRequest } from "next/server";
const related_trendings = require("@/database/trending_by_category.json");
export async function GET(req: NextRequest, res: NextResponse) {
  const category = req.nextUrl.searchParams.get("category");
  const data: Article[] = related_trendings.trending_by_category.filter(
    (el: Article) => el.category === category
  );
  if (data.length > 0) {
    console.log(data);
    return NextResponse.json(data);
  }
  return NextResponse.json({
    error: "category is required",
    message: "GET TRENDINGS BY CATEGORY",
  });
}

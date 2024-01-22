import { NextResponse, NextRequest } from "next/server";
const related_articles = require("@/database/atricles_by_category.json");
export async function GET(req: NextRequest, res: NextResponse) {
  const category = req.nextUrl.searchParams.get("category");
  const offset = req.nextUrl.searchParams.get("offset");
  if (category) {
    const data = related_articles.article_by_category.filter(
      (el: any) => el.category === category
    );
    if (data.length > 0) {
      if (offset) {
        const article = data.slice(~~offset, ~~offset + 10);
        return NextResponse.json(article);
      }
      return NextResponse.json({ error: "Offset is required" });
    }
  }
  return NextResponse.json({
    error: "category is required",
    message: "GET TRENDINGS BY CATEGORY",
  });
}

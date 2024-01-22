import { NextResponse, NextRequest } from "next/server";
const articlesData = require("@/database/article.json");
const relatedArticlesData = require("@/database/atricles_by_category.json")
export async function GET(req: NextRequest, res: NextResponse) {
  const offset = req.nextUrl.searchParams.get("offset");
  console.log("====================================");
  console.log("Articles is working", "offset ->", offset, "limit ->", 10);
  console.log("====================================");

  if (offset !== null && offset !== undefined) {
    const article = articlesData["article"].slice(~~offset, ~~offset + 10);
    return NextResponse.json(article);
  } else {
    return NextResponse.json({ error: "Offset is not defined" });
  }
}

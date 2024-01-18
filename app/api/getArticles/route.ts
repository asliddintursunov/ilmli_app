import { NextResponse, NextRequest } from "next/server";
const articlesData = require("@/database/article.json");
export async function GET(req: NextRequest, res: NextResponse) {
  const offset = req.nextUrl.searchParams.get("offset");

  console.log("====================================");
  console.log("Articles is working", "offset ->", offset, "limit ->", 10);
  console.log("====================================");

  const article = articlesData["article"].splice(offset, 10);

  return NextResponse.json(article);
}

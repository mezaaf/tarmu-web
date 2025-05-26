"use server";

import { retrieveData, retrieveDataByIdentity } from "@/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const slug = searchParams.get("slug");
  if (slug) {
    const detailArticle = await retrieveDataByIdentity(
      "articles",
      "slug",
      slug
    );
    if (detailArticle) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailArticle.data,
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Data not found",
      data: {},
    });
  }

  const articles = await retrieveData("articles");
  return NextResponse.json({
    status: 200,
    message: "Success",
    data: articles.data,
  });
}

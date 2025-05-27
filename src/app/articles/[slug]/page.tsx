"use client";

import { SectionContainer } from "@/components/layouts/SectionContainer";
import { axiosInstance } from "@/lib/axios/instance";
import { formattedDate } from "@/lib/utils";
import Image from "next/image";
import ArticleSideBar from "./ArticleSidebar";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";

type DetailArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const DetailArticlePage = (props: DetailArticlePageProps) => {
  const { params } = props;
  const [article, setArticle] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { slug } = await params;
        const response = await axiosInstance.get("/article?slug=" + slug);
        const data = response.data.data;
        setArticle(data);
      } catch (error) {
        console.log((error as TypeError).message);
      }
    };
    fetchData();
  }, [params]);

  return (
    <>
      {article.map((item) => (
        <div key={item.id}>
          <div className="w-full h-30 md:h-60 lg:h-120 overflow-hidden px-10 mt-5">
            <Image
              src={item.cover_url}
              alt="banner"
              width={1000}
              height={1000}
              priority
              className="object-cover object-bottom rounded-2xl w-full h-full"
            />
          </div>
          <SectionContainer padded minFullscreen>
            <div className="flex justify-between w-full">
              <div className=" ">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
                  {item.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-8">
                    <Image
                      src={"/images/user.png"}
                      alt="user"
                      width={1000}
                      height={1000}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold capitalize">
                    by {item.author}{" "}
                  </h4>
                  <span className="bg-gold w-2 h-2 rounded-full -mx-1 mt-0.5" />
                  <h3 className="text-sm">{formattedDate(item.created_at)}</h3>
                </div>
                <div
                  className="my-10"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
              <div className="hidden md:flex flex-col gap-10 w-5xl ms-10 p-5">
                <ArticleSideBar category={item.category} />
              </div>
            </div>
          </SectionContainer>
        </div>
      ))}
    </>
  );
};

export default DetailArticlePage;

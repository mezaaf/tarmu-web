"use client";

import { axiosInstance } from "@/lib/axios/instance";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";

type ArticleSideBarProps = {
  category: string;
};

const ArticleSideBar = (props: ArticleSideBarProps) => {
  const { category } = props;
  const [article, setArticle] = useState<Article[] | null>(null);

  useEffect(() => {
    const fecthArticle = async () => {
      const result = await axiosInstance("/article?category=" + category);

      if (result.statusText !== "OK") {
        throw new Error("Gagal mengambil data");
      }

      const articles = await result.data.data;

      setArticle(articles);
    };

    fecthArticle();
  }, [category]);

  return (
    <StickyBox offsetTop={90}>
      <div className="flex flex-col gap-8">
        <h1 className="text-xl font-bold mb-5">Postingan Serupa</h1>
        {article?.map((item) => (
          <Link href={"#"} key={item.id} className="flex flex-col">
            <div className="flex flex-col w-full h-30 items-center">
              <Image
                src={item.cover_url}
                alt="img"
                width={1000}
                height={1000}
                className="w-full h-full rounded-xl"
              />
            </div>
            <h1 className="mt-2 font-semibold leading-5">{item.title}</h1>
          </Link>
        ))}
      </div>
    </StickyBox>
  );
};

export default ArticleSideBar;

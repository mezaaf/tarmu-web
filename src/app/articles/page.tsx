"use client";

import { SectionContainer } from "@/components/layouts/SectionContainer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios/instance";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("all");

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/article");
      const data = response.data.data;
      setArticles(data);
    } catch (error) {
      console.log((error as TypeError).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full h-30 md:h-60 lg:h-120 overflow-hidden px-10 mt-5">
        <Image
          src={"/images/page-banner.svg"}
          alt="banner"
          width={1000}
          height={1000}
          priority
          className="object-cover object-bottom rounded-2xl w-full h-full"
        />
      </div>
      <SectionContainer padded minFullscreen className="flex flex-col gap-10">
        <Label className="-mb-8 lg:-mb-8 text-xs md:text-sm">
          Filter Kategori
        </Label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="lg:w-[180px] text-xs md:text-sm px-2 py-0! -mb-6 md:mb-0">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategori</SelectLabel>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="khutbah">Khutbah Jumat</SelectItem>
              <SelectItem value="tokoh">Biografi Tokoh</SelectItem>
              <SelectItem value="qa">Tanya Jawab</SelectItem>
              <SelectItem value="cerpen">Cerpen</SelectItem>
              <SelectItem value="sastra">Sastra</SelectItem>
              <SelectItem value="resensi">Resensi</SelectItem>
              <SelectItem value="puisi">Puisi</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {category === "all" ? (
            <>
              {articles?.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <Card className="p-0 h-90 gap-2">
                    <CardHeader className="p-0 relative">
                      <div className="w-full h-55 overflow-hidden">
                        <Image
                          src={article.cover_url}
                          alt={"value"}
                          width={1000}
                          height={1000}
                          className="w-full rounded-lg"
                        />
                      </div>
                      <Badge className="absolute top-2 left-2 bg-tosca rounded-full justify-center items-center flex uppercase">
                        {article.category}
                      </Badge>
                    </CardHeader>
                    <CardTitle className="px-3 pb-3 truncate">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="px-3 -mt-4 mb-2">
                      <p>by {article.author}</p>
                    </CardDescription>
                    <CardContent className="px-3 pb-3 ">
                      <p className="line-clamp-2">{article.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </>
          ) : (
            <>
              {articles
                ?.filter((a) => a.category === category)
                .map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <Card className="p-0 h-90 gap-2">
                      <CardHeader className="p-0 relative">
                        <div className="w-full h-55 overflow-hidden">
                          <Image
                            src={article.cover_url}
                            alt={"value"}
                            width={1000}
                            height={1000}
                            className="w-full rounded-lg"
                          />
                        </div>
                        <Badge className="absolute top-2 left-2 bg-tosca rounded-full justify-center items-center flex uppercase">
                          {article.category}
                        </Badge>
                      </CardHeader>
                      <CardTitle className="px-3 pb-3 truncate">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="px-3 -mt-4 mb-2">
                        <p>by {article.author}</p>
                      </CardDescription>
                      <CardContent className="px-3 pb-3 ">
                        <p className="line-clamp-2">{article.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </>
          )}
        </div>
      </SectionContainer>
    </>
  );
};

export default Articles;

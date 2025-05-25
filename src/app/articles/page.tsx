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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Article } from "@/types/article";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const tabsData = [
  {
    id: 1,
    title: "Semua",
    value: "all",
  },
  {
    id: 2,
    title: "Khutbah Jumat",
    value: "khutbah",
  },
  {
    id: 3,
    title: "Tokoh",
    value: "tokoh",
  },
  {
    id: 4,
    title: "Tanya Jawab",
    value: "qa",
  },
  {
    id: 5,
    title: "Cerpen",
    value: "cerpen",
  },
  {
    id: 6,
    title: "Sastra",
    value: "sastra",
  },
  {
    id: 7,
    title: "Resensi",
    value: "resensi",
  },
  {
    id: 8,
    title: "Puisi",
    value: "puisi",
  },
];

const Articles = () => {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const { data, error } = await supabase.from("articles").select("*");

      if (error) {
        toast.error(error.message);
      }

      setArticles(data);
    };

    fetchData();
  }, []);

  console.log("article: ", articles);
  return (
    <>
      <div className="w-full h-30 md:h-60 lg:h-120 overflow-hidden px-10 mt-5">
        <Image
          src={"/images/page-banner.svg"}
          alt="banner"
          width={1000}
          height={1000}
          objectFit="cover"
          loading="eager"
          className="object-cover object-bottom rounded-2xl w-full h-full"
        />
      </div>
      <SectionContainer padded minFullscreen className="flex flex-col gap-10">
        <Tabs defaultValue="all" className="w-xs md:w-2xl lg:w-7xl gap-5">
          <div className="flex flex-row justify-between gap-20">
            <TabsList className="flex items-center gap-3 justify-between border-none bg-transparent p-0 rounded-none w-fit">
              {tabsData.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.value}
                  className="lg-text-base data-[state=active]:text-tosca dark:data-[state=active]:text-tosca data-[state=active]:border-tosca data-[state=active]:dark:border-tosca data-[state=active]:bg-transparent data-[state=active]:dark:bg-transparent cursor-pointer text-xs data-[state=active]:rounded-t-xl data-[state=active]:border-b-2 md:text-sm"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter</SelectLabel>
                  <SelectItem value="newest">Paling Baru</SelectItem>
                  <SelectItem value="oldest">Paling Lama</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {tabsData.map((item) => (
            <TabsContent key={item.id} value={item.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {item.value === "all" ? (
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
                      ?.filter((a) => a.category === item.value)
                      .map((article) => (
                        <Link
                          key={article.id}
                          href={`/articles/${article.slug}`}
                        >
                          <Card className="p-0 h-100 gap-2">
                            <CardHeader className="p-0 relative">
                              <Image
                                src={article.cover_url}
                                alt={"value"}
                                width={1000}
                                height={1000}
                                className="w-full rounded-lg"
                              />
                              <Badge className="absolute top-2 left-2 bg-tosca rounded-full justify-center items-center flex uppercase">
                                {article.category}
                              </Badge>
                            </CardHeader>
                            <CardTitle className="px-3 pb-3 truncate">
                              {article.title}
                            </CardTitle>
                            <CardDescription className="px-3 -mt-4">
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
            </TabsContent>
          ))}
        </Tabs>
      </SectionContainer>
    </>
  );
};

export default Articles;

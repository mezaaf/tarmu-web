import { SectionContainer } from "@/components/layouts/SectionContainer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

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
  return (
    <>
      <div className="w-full h-120  overflow-hidden px-10">
        <Image
          src={"/images/page-banner.svg"}
          alt="banner"
          width={100}
          height={100}
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

          <div className="grid grid-cols-3 gap-5">
            <Card className="p-0 h-100 gap-2">
              <CardContent className="px-3 pb-3 ">
                <div className="flex flex-col p-5">
                  <Skeleton className="h-[125px] w-full  rounded-xl" />
                  <div className="py-5 gap-2 flex flex-col">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0 h-100 gap-2">
              <CardContent className="px-3 pb-3 ">
                <div className="flex flex-col p-5">
                  <Skeleton className="h-[125px] w-full  rounded-xl" />
                  <div className="py-5 gap-2 flex flex-col">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0 h-100 gap-2">
              <CardContent className="px-3 pb-3 ">
                <div className="flex flex-col p-5">
                  <Skeleton className="h-[125px] w-full  rounded-xl" />
                  <div className="py-5 gap-2 flex flex-col">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </SectionContainer>
    </>
  );
};

export default Articles;

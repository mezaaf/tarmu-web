import { SectionContainer } from "@/components/layouts/SectionContainer";
import { formattedDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

type DetailArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const DetailArticlePage = async (props: DetailArticlePageProps) => {
  const params = await props.params;
  const slug = params.slug;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return redirect("/articles");
  }

  return (
    <>
      <div className="w-full h-120  overflow-hidden px-10">
        <Image
          src={"/images/page-banner.svg"}
          alt="banner"
          width={100}
          height={100}
          priority
          className="object-cover object-bottom rounded-2xl w-full h-full"
        />
      </div>
      <SectionContainer padded minFullscreen>
        <div className="flex justify-between w-full">
          <div className=" ">
            <h1 className="text-4xl font-bold mb-3">{data.title}</h1>
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
              <h4 className="font-semibold capitalize">by {data.author} </h4>
              <span className="bg-gold w-2 h-2 rounded-full -mx-1 mt-0.5" />
              <h3 className="text-sm">{formattedDate(data.created_at)}</h3>
            </div>
            <div
              className="my-10"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
          <div className="hidden md:flex flex-col gap-10 w-5xl ms-10 p-5">
            <div>
              <h1 className="text-xl font-bold mb-5">Postingan Serupa</h1>
              <div className="flex flex-col w-full items-center mb-5">
                <Image
                  src={"/images/history-img2.svg"}
                  alt="img"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-xl"
                />
                <h1 className="mt-3 font-semibold leading-5">
                  Islam Mengajarkan Umatnya untuk Soft Spoken
                </h1>
              </div>
              <div className="flex flex-col w-full items-center mb-5">
                <Image
                  src={"/images/history-img2.svg"}
                  alt="img"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-xl"
                />
                <h1 className="mt-3 font-semibold leading-5">
                  Islam Mengajarkan Umatnya untuk Soft Spoken
                </h1>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default DetailArticlePage;

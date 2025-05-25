import { SectionContainer } from "@/components/layouts/SectionContainer";
import { getArticle } from "@/services/articles";
import Image from "next/image";

type DetailArticlePageProps = {
  params: { slug: string };
};

const DetailArticlePage = async (props: DetailArticlePageProps) => {
  const { params } = props;

  console.log(params.slug);

  const article = await getArticle(
    `http://localhost:3000/api/article?slug=${params.slug}`
  );

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
            <h1 className="text-4xl font-bold mb-3">{article.data.title}</h1>
            <div className="flex items-center gap-3">
              <div className="w-8">
                <Image
                  src={"/images/user.png"}
                  alt="user"
                  width={100}
                  height={100}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold">by {article.data.author} </h4>
              <span className="bg-gold w-2 h-2 rounded-full -mx-1 mt-0.5" />
              <h3 className="text-sm">{article.created_at}</h3>
            </div>
            <div className="my-10">
              <h1>{article.data.content}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-10 w-5xl ms-10 p-5">
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

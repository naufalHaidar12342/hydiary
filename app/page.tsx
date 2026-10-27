import Image from "next/image";
import Link from "next/link";
import HygraphDateToReadableDate from "./libraries/date-converter";
import { metadataBaseUrl } from "./libraries/metadata-base";
import { metadataRobotsRule } from "./libraries/metadata-robots";
import { BASE_URL } from "./libraries/base-url";
import { metadataSiteName } from "./libraries/metadata-sitename";
import { Metadata, ResolvingMetadata } from "next";
import fetchOneLatestPost from "./utilities/api/fetchOneLatestPost";
import { DiaryEntry } from "./utilities/types/diaryEntriesType";
import fetchPostsWithPagination from "./utilities/api/fetchPostsWithPagination";

export async function generateMetadata(
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const newEntry = await fetchOneLatestPost();
  const newPost = newEntry.data.posts.at(0);
  const newTitle = newPost?.title || "Title goes here";
  const newDescription =
    newPost?.excerpt || "Description of the post would be here";
  // console.info("🚀 ~ newTitle:", newTitle);
  // console.info("🚀 ~ newDescription:", newDescription);

  const previousImages = (await parent).openGraph?.images || [];
  return {
    openGraph: {
      title: "Home",
      images: [...previousImages],
    },
  };
}

export default async function Home() {
  const latestEntryReceived = await fetchOneLatestPost();
  const latestEntry = latestEntryReceived.data.posts.at(0);
  // console.info("🚀 ~ latestEntry:", latestEntry);
  // const latestTitle = latestEntry?.title;

  /**
   * @constant
   * to store response from
   * {@linkcode fetchPostsWithPagination}.
   * supply the arguments "page" with 1,
   * and "limitContent" with 3
   */
  const recentEntries = await fetchPostsWithPagination({
    page: 1,
    limitContent: 3,
  });

  return (
    <main className="w-full h-full flex flex-col">
      <section className="flex flex-col items-start gap-y-5 md:h-68 md:flex-row md:gap-x-5 md:gap-y-0">
        <div className="w-full h-60 md:h-full relative">
          <Image
            src={`${latestEntry?.postAttribution.attributionImage.url}`}
            alt={`${latestEntry?.postAttribution.attributionMarkdown}`}
            style={{ objectFit: "cover" }}
            fill
            sizes="(max-width: 1200px) 50vw, 20vw"
            loading="eager"
            className="rounded-2xl overflow-hidden"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="font-(family-name:--font-ibm-plex-mono) font-bold text-4xl text-hydiary-accent flex-wrap ">
            {latestEntry?.title}
          </h2>
          <p className="pt-1 text-lg">{latestEntry?.excerpt}</p>
          <Link
            href={`/entries/${latestEntry?.slug}`}
            className="mt-4 py-1 px-4 md:w-fit text-center font-(family-name:--font-ibm-plex-mono) font-semibold text-xl text-hydiary-primary bg-hydiary-accent rounded-md transition-transform hover:scale-110"
          >
            Read more
          </Link>
        </div>
      </section>
      <section className="pt-10 mt-10" aria-label="Recent entries">
        <div className="relative w-fit rounded-[50%] border-2 border-hydiary-accent p-4
               before:absolute before:-inset-1 before:-rotate-1 before:rounded-[50%]
               before:border-2 before:border-hydiary-accent
               after:absolute after:-inset-1 after:-rotate-3 after:rounded-[50%]
               after:border after:border-hydiary-accent">
          <h3 className="font-(family-name:--font-ibm-playpen-sans) font-medium text-2xl capitalize">
            Recent read
          </h3>
        </div>

        {/*<span
          className="absolute -bottom-1 left-0 h-2 w-full origin-left -rotate-1 rounded-[50%] border-2 border-hydiary-accent transition-transform duration-300 ease-out scale-x-100"
        ></span>*/}

        {/*<div
          className="relative w-fit rounded-lg border-2 border-hydiary-accent px-6 py-4
                 before:absolute before:-inset-1 before:rotate-1 before:rounded-lg
                 before:border-2 before:border-hydiary-accent
                 after:absolute after:-inset-1 after:-rotate-2 after:rounded-lg
                 after:border after:border-hydiary-accent"
        >
          Handwritten card
        </div>*/}

        <div className="pt-1.5 flex flex-col md:flex-row md:flex-wrap gap-y-6 md:gap-x-10">
          {recentEntries.data.posts.map((item) => (
            <div className="flex flex-col gap-x-2 my-4" key={item.slug}>
              <section className="w-full h-40 md:h-50 relative">
                <Image
                  src={`${item.postAttribution.attributionImage.url}`}
                  alt={""}
                  className="rounded-md overflow-hidden"
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="(max-width: 1280px)50vw, 20vw"
                />
              </section>
              <section className="mt-4 flex flex-col w-68">
                <h4 className="z-10 font-(family-name:--font-ibm-plex-mono) text-shadow-highlighter text-xl line-clamp-1 md:line-clamp-2">
                  {item.title}
                </h4>

                <Link
                  href={`/entries/${item.slug}`}
                  className="relative inline-block mt-5 h-14 lg:w-fit font-(family-name:--font-ibm-plex-mono) font-semibold text-hydiary-secondary text-xl"
                >
                  Read this
                  <span className="absolute h-8 inset-0 bg-hydiary-accent/10 transform -rotate-1" style={{ clipPath: "polygon(2% 0%, 96% 0%, 98% 92%, -50% 100%)" }}></span>
                </Link>

              </section>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

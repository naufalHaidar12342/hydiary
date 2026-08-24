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

  // doc
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

  return (
    <div className="w-full h-full flex flex-col mx-auto">
      <section className="flex flex-col items-center gap-y-5 md:flex-row md:gap-x-5 md:gap-y-0">
        <div className="w-full md:w-85 h-110 relative">
          <Image
            src={`${latestEntry?.postAttribution.attributionImage.url}`}
            alt={`${latestEntry?.postAttribution.attributionMarkdown}`}
            style={{ objectFit: "cover" }}
            fill
            className="rounded-2xl overflow-hidden"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-(family-name:--font-ibm-plex-mono) font-bold text-4xl text-hydiary-accent">
            {latestEntry?.title}
          </h2>
          <p>{latestEntry?.excerpt}</p>
        </div>
      </section>
      <section>recent read</section>
    </div>
  );
}

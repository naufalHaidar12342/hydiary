
import EntryImageSkeleton from "@/app/components/entries-page/EntryImageSkeleton";
import convertIsoDateToHumanDate from "@/app/helpers/isodate-to-humandate-converter";
import fetchSelectedEntry from "@/app/utilities/api/fetchSelectedEntry";
import hydiaryCustomMarkdown from "@/app/utilities/constants/hydiaryMarkdownComponents";
import { CategoryLabels } from "@/app/utilities/types/diaryEntriesType";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { type Components } from "react-markdown";

const isValidSlug = (slug: string) => {
  // ^ and $ require the pattern to match the entire string.
  // [a-z0-9]+ means one or more lowercase letters or digits.
  // (?:...) groups without capturing; * allows zero or more "-word" groups.
  // Each group is a hyphen followed by one or more lowercase letters or digits.
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

export default async function ReadSelectedEntry({ params }: { params: Promise<{ [key: string]: string | string[] | undefined }> }) {
  /**
   * read/get slug from params
   *
   */
  const { slug:uniqueSlugOfEntry } = await params;
  if (typeof uniqueSlugOfEntry !== "string" || !isValidSlug(uniqueSlugOfEntry)) notFound();

  const retrievedEntry = await fetchSelectedEntry(uniqueSlugOfEntry)
  const entryContent = retrievedEntry.data.posts.at(0)

  const entryImageURL = entryContent?.postAttribution.attributionImage.url
  console.log("whats inside image url=",entryImageURL)
  const entryImageAlternateText = entryContent?.postAttribution.attributionMarkdown
  // console.log("image alt text=",entryImageAlternateText)
  const entryMarkdownContent = entryContent?.content?.markdown

  const entryCategories = entryContent?.postCategories
  const entryWrittenDate = entryContent?.createdAt
  const entryPublishedDate = entryContent?.date


  const markdownCustomComponents = {
    a: ({ children, ...props }) => (
      <a
        className="underline decoration-hydiary-primary font-medium" {...props}
        target="_blank"
      >
        {children}
      </a>
    )
  } satisfies Components
  return (
    <div className="w-full h-full flex flex-col">
      <section aria-label="image and title" className="flex flex-row flex-wrap gap-x-2">
        <div className="border-4 border-b-80 lg:border-b-40! border-hydiary-secondary h-full w-full relative -rotate-2 transition-transform hover:scale-110 hover:rotate-0">

          <EntryImageSkeleton imageAlternateText={`${entryImageAlternateText}`} imageSource={`${entryImageURL}`} />
          <span className="mt-2 absolute lg:-bottom-8 left-2 text-hydiary-primary font-(family-name:--font-caveat) text-2xl">
            <Markdown components={markdownCustomComponents}>
              {entryImageAlternateText}
            </Markdown>
          </span>
        </div>

        <div className="mt-5 pt-5">
          <h2 className="text-3xl font-(family-name:--font-ibm-plex-mono) italic">
            {entryContent?.title}
          </h2>
        </div>
      </section>
      <section aria-label="tags and dates" className="grid lg:grid-cols-2 gap-5 my-2">
        <ul className="flex flex-row flex-wrap items-center font-(family-name:--font-caveat) text-2xl gap-2">
          {entryCategories?.map((item) => (
            <li key={item} className="p-2 text-center border rounded-sm border-hydiary-accent">{CategoryLabels[item]}</li>
          ))}
        </ul>
        <div className="flex flex-col">
          <p>Written at {" "}
            <span className="text-hydiary-accent font-(family-name:--font-ibm-plex-mono)">
              {convertIsoDateToHumanDate(`${entryWrittenDate}`)}
            </span>
          </p>
          <p>Published at {" "}
            <span className="text-hydiary-accent font-(family-name:--font-ibm-plex-mono)">
              {convertIsoDateToHumanDate(`${entryPublishedDate}`)}
            </span>
          </p>
        </div>
      </section>
      <section aria-label="short summary" className="font-(family-name:--font-ibm-plex-mono) py-2">
        <p>{entryContent?.excerpt}</p>
      </section>
      <section aria-label="body of article" className="mt-6">
        <Markdown components={hydiaryCustomMarkdown}>{entryMarkdownContent}</Markdown>
      </section>
    </div>
  );
}

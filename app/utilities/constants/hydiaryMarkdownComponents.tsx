import MarkdownImage from "@/app/components/entries-page/MarkdownImage";
import { ExternalLink } from "lucide-react";
import type { Components } from "react-markdown";

/**
 * ReactMarkdown's `components` prop expects an object that maps HTML tag names
 * (such as `a` or `p`) to React components. This object can be shared by pages
 * that render Hygraph markdown.
 *
 * A named function cannot be passed directly as `components`, because the prop
 * expects that mapping object. A function could return the object, but for a
 * fixed set of renderers, keeping the object at module scope is simpler.
 */
const hydiaryCustomMarkdown = {
  a: ({ children, ...props }) => (
    <a {...props} className="underline decoration-hydiary-accent inline-flex items-center gap-x-1" target="_blank">
      {children}
      <ExternalLink size={24} className="text-hydiary-accent" />
    </a>
  ),
  p: ({children,...props }) => (
    <div {...props} className="py-2">{ children}</div>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="mt-1.5 font-(family-name:--font-ibm-plex-mono) font-bold text-4xl">{ children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="mt-1.5 font-(family-name:--font-ibm-plex-mono) font-semibold text-2xl">{ children}</h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 {...props} className="mt-1.5 font-(family-name:--font-ibm-plex-mono) font-semibold text-xl">{ children}</h4>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="py-1 my-1.5 list-disc list-inside indent-1.5 decoration-hydiary-accent marker:text-hydiary-accent">{children }</ul>
  ),
  img: ({src, alt})=>typeof src === "string" ? <MarkdownImage src={src} alt={alt} /> : null,
} satisfies Components;

export default hydiaryCustomMarkdown;

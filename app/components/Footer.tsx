import Link from "next/link";
import { caveat } from "../utilities/fonts/next-google-fonts";

export default function Footer() {
  return (
    <footer
      className={`font-(family-name:--font-caveat) flex flex-col justify-end items-center text-3xl gap-2 p-10 z-0`}
    >
      <span>@2023.</span>
      <div>
        co-authored by{" "}
        <Link
          href="#"
          target="_blank"
          className="underline-link-animation text-3xl text-white"
        >
          strijunk
        </Link>{" "}
        and our late friend, my mentor{";"} {" "}
        <Link
          href="#"
          target="_blank"
          scroll={false}
          className="underline-link-animation text-3xl text-white"
        >
          devardha
        </Link>
      </div>
    </footer>
  );
}

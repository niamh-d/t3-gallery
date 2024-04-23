import { SignedIn, SignedOut } from "@clerk/nextjs";

import ImageGallery from "~/app/components/image-gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full">
          <div className="m-auto py-10 text-center text-2xl font-light">
            <h2 className="mb-5">
              <span className="font-semibold">Next T3 Gallery</span> is an image
              gallery web app.
            </h2>
            <p>Please sign in above to begin uploading your images.</p>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <ImageGallery />
      </SignedIn>
      <LegalNotice />
    </main>
  );
}

const LegalNotice = () => {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-2 border-t-2 pt-5 text-center text-lg font-extralight tracking-wide">
      <p>
        This application (hereinafter "App") is a proof of concept.{" "}
        <span className="font-bold underline underline-offset-2">Never</span>{" "}
        use App to store your personal images.{" "}
        <span className="font-semibold">
          Meme and cute pet photos are a-ok!
        </span>{" "}
      </p>{" "}
      <p>By using App you agree not to upload illegal materials.</p>
      <p>
        Owner:{" "}
        <a href="https://niamhdoyle.dev" target="_blank">
          <span className="font-semibold">Niamh Doyle</span>
        </a>
        . I tweet at{" "}
        <a href="https://twitter.com/niamh_codes" target="_blank">
          <span className="font-semibold">@niamh_codes</span>
        </a>
        . Check out my GitHub repos{" "}
        <a href="https://github.com/niamh-d" target="_blank">
          <span className="font-semibold">@niamh-d</span>
        </a>
        .
      </p>
    </div>
  );
};

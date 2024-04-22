import { SignedIn, SignedOut } from "@clerk/nextjs";

import ImageGallery from "~/app/components/image-gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          <h2 className="mb-5">
            <span className="font-semibold">Next T3 Gallery</span> is an image
            gallery web app.
          </h2>
          <p>Please sign in above to begin uploading your images.</p>
        </div>
      </SignedOut>

      <SignedIn>
        <ImageGallery />
      </SignedIn>
    </main>
  );
}

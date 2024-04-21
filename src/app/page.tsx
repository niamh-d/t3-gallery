import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

async function Hello({ hasImages }: { hasImages: boolean }) {
  const user = await currentUser();

  return (
    <div className="mt-4 h-full w-full  text-center text-xl">
      {!hasImages && (
        <p>
          Hello, {user!.firstName} 👋 You don't have any images yet. Why not
          upload some?
        </p>
      )}
      {hasImages && <p>Welcome back, {user!.firstName}! 👋</p>}
    </div>
  );
}

async function ImageGallery() {
  const images = await getMyImages();

  if (images.length === 0) return <Hello hasImages={false} />;
  else
    return (
      <>
        <Hello hasImages={true} />
        <Images images={images} />
      </>
    );
}

function Images({
  images,
}: {
  images: {
    id: number;
    name: string;
    url: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-52 w-52 flex-col overflow-hidden">
          <div>
            <p className="mb-2 mt-2 truncate">{image.name}</p>
          </div>
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

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

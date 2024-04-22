import Image from "next/image";
import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Hello({
  hasImages,
  firstName,
}: {
  hasImages: boolean;
  firstName: string;
}) {
  return (
    <div className="mt-4 h-full w-full  text-center text-xl">
      {!hasImages && (
        <p>
          Hello, {firstName} 👋 You don&apos;t have any images yet. Why not
          upload some?
        </p>
      )}
      {hasImages && <p>Welcome back, {firstName}! 👋</p>}
    </div>
  );
}

export default async function ImageGallery() {
  const user = await currentUser();
  const images = await getMyImages();

  if (images.length === 0)
    return <Hello hasImages={false} firstName={user.firstName} />;
  else
    return (
      <>
        <Hello hasImages={true} firstName={user.firstName} />
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
    urlId: string;
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
          <Link href={`/img/${image.urlId}`}>
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

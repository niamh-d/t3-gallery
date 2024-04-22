"use client";

import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Images({
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

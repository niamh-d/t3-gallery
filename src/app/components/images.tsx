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
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}) {
  const renderFileName = (str: string) => {
    return str.length > 20 ? str.slice(0, 10) + "[...]" + str.slice(-10) : str;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-52 w-52 flex-col overflow-hidden">
          <div className="mb-5">
            <p className="mb-2 mt-2 truncate">{renderFileName(image.name)}</p>
            {image.isPublic && (
              <div className="flex items-center gap-2">
                <PublicSVG />
                <span>Shared</span>
              </div>
            )}
            {!image.isPublic && (
              <div className="flex items-center gap-2">
                <LockSVG />
                <span>Private</span>
              </div>
            )}
          </div>
          <Link href={`/img/${image.urlId}`}>
            <Image
              src={image.url}
              alt={image.name}
              style={{ objectFit: "contain" }}
              width={256}
              height={256}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

const LockSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  );
};

const PublicSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  );
};

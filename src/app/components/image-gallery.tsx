import { currentUser } from "@clerk/nextjs/server";

import { getMyImages } from "~/server/queries";

import Images from "./images";

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
          Hello, {firstName} 👋 <br />
          You don&apos;t have any images yet. <br />
          Why not upload some? <br />
          You can upload a max. of 10 images at in one go.
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

import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="mt-10 flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="h-3/4" />
      </div>
      <div className="ml-4 flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b-2 p-2 text-center text-lg font-extralight tracking-wide">
          {image.name}
        </div>
        <div className="mb-2 flex flex-col gap-2 p-2">
          <span>Uploaded By:</span>
          <span className="text-lg font-semibold tracking-wider">
            {uploaderInfo.fullName}
          </span>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <span>Created On:</span>
          <span className="font-lighttracking-tight">
            {new Date(image.createdAt).toDateString()}
          </span>
        </div>
        <div className="mt-2 p-3">
          <form
            action={async () => {
              "use server";

              await deleteImage(props.id);
            }}
          >
            <Button variant="destructive">Delete</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

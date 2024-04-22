import { clerkClient } from "@clerk/nextjs/server";

import { Button } from "~/components/ui/button";
import { deleteImage, getImage, updatePublic } from "~/server/queries";

import SwitchCopyBlock from "./switch-copy-block";

export default async function FullPageImageView(props: { id: string }) {
  async function switchPublicHandler(isPublic: boolean) {
    "use server";

    await updatePublic({ id: props.id, isPublic });
  }

  const { image, isOwner } = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="mt-10 flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="h-3/4" />
      </div>
      <div className="ml-5 w-auto flex-shrink-0 border-l">
        <div className="ml-5 flex flex-col">
          <div className="border-b-2 p-2 text-center text-lg font-extralight tracking-wide">
            {image.name}
          </div>
          <div className="mb-2 flex flex-col gap-2 p-2">
            <span>Uploaded By:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-wider">
                {uploaderInfo.fullName}
              </span>
              {isOwner && <span>(you)</span>}
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <span>Created On:</span>
            <span className="font-lighttracking-tight">
              {new Date(image.createdAt).toDateString()}
            </span>
          </div>
          {isOwner && (
            <>
              <div className="mt-4 p-3">
                <form
                  action={async () => {
                    "use server";

                    await deleteImage(props.id);
                  }}
                >
                  <Button variant="destructive">Delete</Button>
                </form>
                <SwitchCopyBlock
                  imageURL={props.id}
                  isPublic={image.isPublic}
                  changeHandler={switchPublicHandler}
                />
              </div>
            </>
          )}
          {!isOwner && (
            <p className="mt-5 text-lg">
              If this is your image, sign in above to edit.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

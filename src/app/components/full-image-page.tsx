import { clerkClient } from "@clerk/nextjs/server";

import { Button } from "~/components/ui/button";
import {
  deleteImage,
  getImage,
  updatePublic,
  updateFileName,
} from "~/server/queries";

import SwitchCopyBlock from "./switch-copy-block";
import NameBox from "./name-box";

export default async function FullPageImageView(props: { id: string }) {
  const { image, isOwner } = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  async function switchPublicHandler(isPublic: boolean) {
    "use server";

    await updatePublic({ id: props.id, isPublic });
  }

  async function fileNameInputHandler(newfileName: string) {
    "use server";

    await updateFileName({ id: image.id, fileName: newfileName });
  }

  return (
    <div className="img-pg mt-10 h-full w-full min-w-0">
      <div className="img-box flex flex-shrink items-center justify-center">
        <img src={image.url} className="h-3/4" />
      </div>
      <div className="details-box ml-5 w-auto flex-shrink-0 border-l">
        <div className="ml-5 flex flex-col">
          <NameBox
            fileName={image.name}
            id={image.id}
            handler={fileNameInputHandler}
            isOwner={isOwner}
          />

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
            <span className="font-light tracking-tight">
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

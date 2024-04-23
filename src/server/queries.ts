import "server-only";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { utapi } from "~/app/api/uploadthing/core";

import { db } from "./db";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: string) {
  const user = auth();

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.urlId, id),
  });

  if (!image) {
    console.log("error", id);
    throw new Error("Image not found");
  }

  const isOwner = image?.userId === user.userId;

  if (!image.isPublic && !user.userId) throw new Error("Unauthorized");

  if (!image.isPublic && !isOwner) throw new Error("Unauthorized");

  return { image, isOwner };
}

export async function updateFileName({
  id,
  fileName,
}: {
  id: number;
  fileName: string;
}) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.update(images).set({ name: fileName }).where(eq(images.id, id));
}

export async function updatePublic({
  id,
  isPublic,
}: {
  id: string;
  isPublic: boolean;
}) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .update(images)
    .set({ isPublic: isPublic })
    .where(eq(images.urlId, id));
}

export async function deleteImage(id: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.urlId, id),
  });

  if (!image) throw new Error("Image not found");

  const uploadThingId = image.url.split("f/")[1];

  const uploadThingResponse = await utapi.deleteFiles(uploadThingId);

  if (!uploadThingResponse)
    throw new Error("Deleting image on UploadThing failed");

  const drizzleResponse = await db
    .delete(images)
    .where(and(eq(images.urlId, id), eq(images.userId, user.userId)));

  if (drizzleResponse) redirect("/");
}

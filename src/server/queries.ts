import "server-only";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

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

  if (!image) throw new Error("Image not found");

  const isOwner = image?.userId === user.userId;

  if (!image.isPublic && !user.userId) throw new Error("Unauthorized");

  if (!image.isPublic && !isOwner) throw new Error("Unauthorized");

  return { image, isOwner };
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

  await db
    .delete(images)
    .where(and(eq(images.urlId, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageUrlId: id,
    },
  });

  redirect("/");
}

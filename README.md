# Next T3 Gallery

Checkout the [**live app on Vercel**](https://t3-gallery-zeta.vercel.app/)

## Ownership of design

Original design belongs to [@t3dotgg](https://github.com/t3dotgg) following [YouTube tutorial](https://www.youtube.com/watch?v=d5x0JCZbAJs).

Additional features added by [@niamh-d](https://github.com/niamh-d) post-tutorial.

- Upon deletion of an image, the image is also deleted from the UploadThing database (not just Vercel Postgres db).
- Users can rename their images.
- Users can control visibility of their images per image (private v. shareable)
- File address copy to clipboard button.
- Mobile friendly (kinda)

## What

Next T3 Gallery – a [create-T3-app](https://create.t3.gg/) – is a simple image gallery built with Next.js, TypeScript and Vercel Postgres.

Users can upload images, and then view them in a gallery. Users can then turn on and off the visibility of their images per individual image, also making private again images that were previously public.

Additional features include the ability to rename images and delete images.

## Tech Stack

- Next.js
- TypeScript
- Vercel Postgres (db)
- Tailwind CSS

## Additional tools

- [Shadcn/ui](https://ui.shadcn.com/) components
- File hosting with [UploadThing](https://uploadthing.com/)
- App hosting with [Vercel](https://vercel.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- Error handling with [Sentry](https://sentry.io/)
- Ratelimiting with [Upstash](https://upstash.com/)
- Authenication with [Clerk](https://clerk.com/)
- Analytics with [PostHog](https://posthog.com/)

## Screenshots

**Gallery view (main view)**

![Gallery view (main view)](/imgs/readme_imgs/gallery_view.png)

**Image in modal (shareable image)**

![Image in modal (shareable image)](/imgs/readme_imgs/modal.png)

**Name update feature**

![Name update feature](/imgs/readme_imgs/name-update.png)

**Private image view in modal**

![Private image view in modal](/imgs/readme_imgs/private.png)

**Public page view as viewed by non-owner**

![Public page view as viewed by non-owner](/imgs/readme_imgs/public.png)

import Link from "next/link";

import { db } from "~/server/db";

const mockURLS = [
  "https://utfs.io/f/4e6fab00-7d1d-450c-a776-6bfb1dcf31e6-eisaqr.jpg",
  "https://utfs.io/f/b7ebcac9-3244-48d6-bf67-77ef2334aba8-p9oa80.jpg",
  "https://utfs.io/f/aefd01da-a758-410e-a87a-ca307eec7586-8mjhgl.jpg",
  "https://utfs.io/f/591cfa90-201f-4a7a-8311-fe5a255dd411-h7k6gm.jpg",
];

const mockImages = mockURLS.map((url, index) => ({ id: index + 1, url }));

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

console.log(posts);

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => <div key={post.id}>{post.name}</div>)}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </div>
  );
}

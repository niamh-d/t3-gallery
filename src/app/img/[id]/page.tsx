import FullPageImageView from "~/app/components/full-image-page";

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <FullPageImageView id={id} />;
}

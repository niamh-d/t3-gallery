import { Modal } from "./modal";
import FullPageImageView from "~/app/components/full-image-page";

export default function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPageImageView id={id} />
    </Modal>
  );
}

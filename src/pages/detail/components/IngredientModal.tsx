import { FunctionComponent } from 'react';
import Modal from '../../../components/common/Modal';
import Skeleton from '../../../components/common/Skeleton';
import Food from '../../../models/Food';

const IngredientsModal: FunctionComponent<{ show: boolean; onClose: () => void; food: Food | null }> = ({
  show,
  onClose,
  food,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      {food ? (
        <iframe
          className="w-full h-60 lg:h-96"
          src={food.videoUrl}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <Skeleton />
      )}
    </Modal>
  );
};

export default IngredientsModal;

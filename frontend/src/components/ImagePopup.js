import noImage from "../images/no-image.jpg";
import Popup from "./Popup";
import { useEffect, useState } from "react";

function ImagePopup({ card, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Object.keys(card).length > 0 ? setIsOpen(true) : setIsOpen(false);
  }, [Object.keys(card).length]);

  function handleImageLoadingError(e) {
    e.target.src = noImage;
  }

  return (
    <Popup isOpen={isOpen} name="photo-view" onClose={onClose}>
      <div className="popup-photo-view__container">
        <img
          className="popup-photo-view__image"
          src={card.link}
          alt={card.name}
          onError={handleImageLoadingError}
        />
        <h2 className="popup-photo-view__title">{card.name}</h2>
      </div>
    </Popup>
  );
}

export default ImagePopup;

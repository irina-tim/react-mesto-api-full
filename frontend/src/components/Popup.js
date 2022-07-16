import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup-${name}`}
      onClick={handleOverlay}
    >
      <div
        className={`${
          name === "photo-view"
            ? "popup-photo-view__container"
            : name === "info"
            ? "popup-info__container"
            : "popup__container"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className={`popup__close ${
            name === "photo-view" && "popup-photo-view__close-button"
          } `}
          type="button"
          onClick={onClose}
          style={{
            display: name !== "photo-view" || isOpen ? "inline-block" : "none",
          }}
          aria-label="Закрыть окно"
        />
      </div>
    </div>
  );
};

export default Popup;

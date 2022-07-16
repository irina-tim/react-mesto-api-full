import Popup from "./Popup";

function PopupWithForm({ isOpen, name, onClose, ...props }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{props.title}</h2>
      <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
        {props.children}
        <button
          className={`popup__submit-button ${
            !props.isSubmitButtonEnabled ? "popup__submit-button_disabled" : ""
          }`}
          type="submit"
          disabled={!props.isSubmitButtonEnabled}
        >
          {props.submitButtonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;

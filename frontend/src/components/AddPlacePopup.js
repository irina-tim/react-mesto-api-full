import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ title: values.title, link: values.link });
  }

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"add-card"}
      title={"Новое место"}
      submitButtonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={isValid}
    >
      <div className="popup__field">
        <input
          id="card-title-input"
          className={`popup__input popup__input_type_card-title ${
            errors.title && "popup__input_type_error"
          }`}
          type="text"
          name="title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.title || ""}
        />
        <span
          className={`card-title-input-error popup__input-error ${
            errors.title && "popup__input-error_visible"
          }`}
        >
          {errors.title}
        </span>
      </div>
      <div className="popup__field">
        <input
          id="image-link-input"
          className={`popup__input popup__input_type_image-link ${
            errors.link && "popup__input_type_error"
          }`}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          value={values.link || ""}
          required
        />
        <span
          className={`image-link-input-error popup__input-error ${
            errors.link && "popup__input-error_visible"
          }`}
        >
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

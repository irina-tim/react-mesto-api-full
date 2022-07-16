import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function EditAvatarPopup(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: values.link,
    });
  }

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"avatar-update"}
      title={"Обновить аватар"}
      submitButtonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={isValid}
    >
      <div className="popup__field">
        <input
          id="avatar-link-input"
          className={`popup__input popup__input_type_avatar-link ${
            errors.link && "popup__input_type_error"
          }`}
          type="url"
          name="link"
          placeholder="Ссылка на новый аватар"
          required
          onChange={handleChange}
          value={values.link || ""}
        />
        <span
          className={`avatar-link-input-error popup__input-error ${
            errors.link && "popup__input-error_visible"
          }`}
        >
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({ name: currentUser.name, description: currentUser.about });
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"profile-edit"}
      title={"Редактировать профиль"}
      submitButtonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={isValid}
    >
      <div className="popup__field">
        <input
          id="name-input"
          className={`popup__input popup__input_type_name ${
            errors.name && "popup__input_type_error"
          }`}
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ""}
        />
        <span
          className={`name-input-error popup__input-error ${
            errors.name && "popup__input-error_visible"
          }`}
        >
          {errors.name}
        </span>
      </div>
      <div className="popup__field">
        <input
          id="description-input"
          className={`popup__input popup__input_type_description ${
            errors.description && "popup__input_type_error"
          }`}
          type="text"
          name="description"
          placeholder="Описание"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={values.description || ""}
        />
        <span
          className={`description-input-errorr popup__input-error ${
            errors.description && "popup__input-error_visible"
          }`}
        >
          {errors.description}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Sign({ handleSign, formTitle, submitButtonName }) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);
  const checks = ["typeMismatch", "tooShort", "valueMissing"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isEmailValid && isPasswordValid) setIsSubmitButtonEnabled(true);
    else setIsSubmitButtonEnabled(false);
  }, [isEmailValid, isPasswordValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formParams;
    handleSign({ email, password }).catch((err) => {
      console.log(err.message);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
    checkValidity(e);
    e.target.name === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const checkValidity = (e) => {
    const { validity } = e.target;
    const checksPassed = checks.filter((check) => validity[check]).length === 0;
    if (e.target.name === "email") setIsEmailValid(checksPassed);
    if (e.target.name === "password") setIsPasswordValid(checksPassed);
  };

  return (
    <div className="sign">
      <form className="sign__form" onSubmit={handleSubmit}>
        <h2 className="sign__title">{formTitle}</h2>
        <input
          className="sign__input"
          type="email"
          name="email"
          aria-label="Электронная почта"
          placeholder="Email"
          required
          onChange={handleChange}
          value={email}
        ></input>
        <span
          className={`sign__input-error ${
            !isEmailValid && email !== "" && "sign__input-error_visible"
          }`}
        >
          Введите email
        </span>
        <input
          className="sign__input"
          type="password"
          name="password"
          aria-label="Пароль"
          placeholder="Пароль"
          minLength="5"
          maxLength="15"
          required
          onChange={handleChange}
          value={password}
        ></input>
        <span
          className={`sign__input-error ${
            !isPasswordValid && password !== "" && "sign__input-error_visible"
          }`}
        >
          Длина пароля не менее 5 символов
        </span>
        <button
          className={`sign__submit-button ${
            !isSubmitButtonEnabled && "sign__submit-button_disabled"
          }`}
          type="submit"
          disabled={!isSubmitButtonEnabled}
        >
          {submitButtonName}
        </button>
      </form>
      <p className="sign__paragraph">
        Уже зарегистрированы?&ensp;
        <NavLink to="/sign-in" className="sign__link">
          Войти
        </NavLink>
      </p>
    </div>
  );
}

export default Sign;

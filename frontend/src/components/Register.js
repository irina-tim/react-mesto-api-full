import Sign from "./Sign";

function Register({ handleRegister }) {
  return (
    <Sign
      handleSign={handleRegister}
      formTitle="Регистрация"
      submitButtonName="Зарегистрироваться"
    ></Sign>
  );
}

export default Register;

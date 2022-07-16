import Sign from "./Sign";

function Login({ handleLogin }) {
  return (
    <Sign
      handleSign={handleLogin}
      formTitle="Вход"
      submitButtonName="Войти"
    ></Sign>
  );
}

export default Login;

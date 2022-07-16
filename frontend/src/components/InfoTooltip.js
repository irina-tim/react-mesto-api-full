import successImage from "../images/infotooltip-success.svg";
import errorImage from "../images/infotooltip-error.svg";
import Popup from "./Popup";

function InfoTooltip({ onClose, isOpen, isOk }) {
  const successMessage = "Вы успешно зарегистрировались!";
  const errorMessage = "Что-то пошло не так! Попробуйте еще раз.";
  return (
    <Popup isOpen={isOpen} name={"info"} onClose={onClose}>
      <div
        className="popup-info__image"
        style={{
          backgroundImage: isOk ? `url(${successImage})` : `url(${errorImage})`,
        }}
      ></div>
      <h2 className="popup-info__title">
        {isOk ? successMessage : errorMessage}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;

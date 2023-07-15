import succes from "../images/succes.svg";
import unsucces from "../images/unsucces.svg";

function InfoTooltip({ status, isOpen, onClose }) {
  const succesImageText = "успешно";
  const unsuccesImageText = "бузуспешно";
  const succesText = "Вы успешно зарегистрировались!";
  const unsuccesText = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <section className={`popup popup_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img
          className="popup__tooltip-image"
          src={status ? succes : unsucces}
          alt={status ? succesImageText : unsuccesImageText}
        />
        <p className="popup__tooltip-info">
          {status ? succesText : unsuccesText}
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;

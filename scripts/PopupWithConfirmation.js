import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__submit-button");
    this._confirmButtonText = this._confirmButton.textContent;
  }
  setSubmitConfirmation(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.renderLoading(true);
    });
  }
  renderLoading(isLoading, loadingText = "Eliminando...") {
    if (isLoading) {
      this._confirmButton.textContent = loadingText;
      this._confirmButton.disabled = true;
    } else {
      this._confirmButton.textContent = this._confirmButtonText;
      this._confirmButton.disabled = false;
    }
  }
  open() {
    super.open();
    this._confirmButton.textContent = this._confirmButtonText;
    this._confirmButton.disabled = false;
  }
}

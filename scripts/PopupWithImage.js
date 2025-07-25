import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name, link) {
    this._popup.querySelector(".popup__image-title").textContent = this._name;
    this._popup.querySelector(".popup__image").src = this._link;
    this._popup.querySelector(".popup__image").alt = this._name;
    super.open();
  }
}

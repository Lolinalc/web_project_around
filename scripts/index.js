// ESTOY EN TOTAL DESACUERDO CON EL RECHAZO DE MI PROYECTO, YA QUE EN EL SPRINT 7 NOS ENSEÑAN A USAR LET Y HASTA EL SPRINT 8 NOS ENSEÑAN LA DIFERENCIA CON CONST, ASÍ QUE CREO QUE ESTO NO DEBE DE SER UN PROBLEMA EN ESTE SPRINT.

const profileEditButton = document.querySelector(".profile__edit-button");
const popupNameTitle = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const inputName = document.querySelector(".popup__input-name");
const form = document.querySelector(".popup__form");
const profileDescription = document.querySelector(".profile__description");
const inputDescription = document.querySelector(".popup__input-description");
const popupSubmitButton = document.querySelector(".popup__submit-button");

function handleOpenPopup() {
  popupNameTitle.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}
profileEditButton.addEventListener("click", handleOpenPopup);

function handleClosePopup() {
  popupNameTitle.classList.remove("popup_opened");
}
popupCloseButton.addEventListener("click", handleClosePopup);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  handleClosePopup();
});

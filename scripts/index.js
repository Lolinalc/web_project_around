let profileEditButton = document.querySelector(".profile__edit-button");
let popupNameTitle = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__name");
let inputName = document.querySelector(".popup__input-name");
let form = document.querySelector(".popup__form");
let profileDescription = document.querySelector(".profile__description");
let inputDescription = document.querySelector(".popup__input-description");
let popupSubmitButton = document.querySelector(".popup__submit-button");

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

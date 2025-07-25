import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage(".popup_type_image");

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(
        element.name,
        element.link,
        "#places__template",
        handleCardClick
      );
      return card.generateCard();
    },
  },
  ".places"
);

const editPopup = new PopupWithForm(".popup_type_edit", (inputData) => {
  userInfo.setUserInfo({
    name: inputData.nombre,
    job: inputData.description,
  });
});
const addPopup = new PopupWithForm(".popup_type_add", (inputData) => {
  const newCard = new Card(
    inputData.title,
    inputData.link,
    "#places__template",
    handleCardClick
  );
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
});

const forms = document.querySelectorAll(settings.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  validator.enableValidation();
});

editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    document.querySelector("#nombre").value = currentUserInfo.name;
    document.querySelector("#descripcion").value = currentUserInfo.job;
    editPopup.open();
  });
document.querySelector(".profile__add-button").addEventListener("click", () => {
  addPopup.open();
});

cardSection.render();

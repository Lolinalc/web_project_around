import { api } from "./Api.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
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

let userId;
let cardList;

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatarContainer = document.querySelector(".profile__avatar");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage(".popup_type_image");

const confirmPopup = new PopupWithConfirmation(".popup_type_delete");

function createCard(data) {
  const card = new Card(
    data,
    "#places__template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  );
  return card.generateCard();
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleDeleteClick(cardId, card) {
  confirmPopup.open();
  confirmPopup.setSubmitConfirmation(() => {
    confirmPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        confirmPopup.close();
      })
      .catch((err) => console.error(`Error: ${err}`))
      .finally(() => confirmPopup.renderLoading(false));
  });
}
function handleLikeClick(cardId, isLiked, card) {
  const likeMethod = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
  likeMethod
    .then(() => {
      card._isLiked = !isLiked;
      card.updateLikes();
    })
    .catch((err) => console.error(`Error: ${err}`));
}

const editPopup = new PopupWithForm(".popup_type_edit", (inputData) => {
  editPopup.renderLoading(true);
  api
    .editProfile(inputData.name, inputData.about)
    .then((inputData) => {
      userInfo.setUserInfo({
        name: inputData.name,
        about: inputData.about,
        avatar: inputData.avatar,
      });
      editPopup.close();
    })
    .catch((err) => {
      console.error("Error en editProfile:", err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
});

const addPopup = new PopupWithForm(".popup_type_add", (inputData) => {
  addPopup.renderLoading(true, "Guardando...");
  api
    .addCard(inputData.name, inputData.link)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      cardList.addItem(cardElement);
      addPopup.close();
    })
    .catch((err) => console.error(`Error: ${err}`))
    .finally(() => addPopup.renderLoading(false));
});

const avatarPopup = new PopupWithForm(".popup_type_avatar", (inputData) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(inputData.avatar)
    .then((inputData) => {
      userInfo.setUserInfo({
        name: inputData.name,
        about: inputData.about,
        avatar: inputData.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});

const FormValidators = {};
const forms = document.querySelectorAll(settings.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  const formName = formElement.getAttribute("name");
  FormValidators[formName] = validator;
  validator.enableValidation();
});

editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector("#name").value = currentUserInfo.name;
  document.querySelector("#about").value = currentUserInfo.job;

  FormValidators["edit-form"]?.resetForm();
  editPopup.open();
});

addButton.addEventListener("click", () => {
  FormValidators["add-form"]?.resetForm();
  addPopup.open();
});

avatarButton.addEventListener("click", () => {
  if (FormValidators["avatar-form"]) {
    FormValidators["avatar-form"].resetForm();
  }
  avatarPopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardList.addItem(cardElement);
        },
      },
      ".places"
    );
    cardList.render();
  })
  .catch((err) => console.error(`Error: ${err}`));

//const forms = document.querySelectorAll(settings.formSelector);
//forms.forEach((formElement) => {
//  const validator = new FormValidator(settings, formElement);
//  validator.enableValidation();
//});

//editPopup.setEventListeners();
//addPopup.setEventListeners();
//imagePopup.setEventListeners();

//document
//  .querySelector(".profile__edit-button")
// .addEventListener("click", () => {
// const currentUserInfo = userInfo.getUserInfo();
//document.querySelector("#nombre").value = currentUserInfo.name;
//document.querySelector("#descripcion").value = currentUserInfo.job;
//editPopup.open();
//});
//document.querySelector(".profile__add-button").addEventListener("click", () => {
//addPopup.open();
//});

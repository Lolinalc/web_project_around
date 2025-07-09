export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escCloseListener);
}

// Función para cerrar el popup y remover el listener de la tecla Escape
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escCloseListener);
}

// Controladores de eventos para botones de abrir y cerrar popups
export function setPopupEventListeners() {
  // Abrir popup de edición
  const profileEditButton = document.querySelector(".profile__edit-button");
  profileEditButton.addEventListener("click", () => {
    const editPopup = document.querySelector(".popup_type_edit");
    openPopup(editPopup);
  });

  // Abrir popup para añadir lugar
  const popupAddButton = document.querySelector(".profile__add-button");
  popupAddButton.addEventListener("click", () => {
    const addPopup = document.querySelector(".popup_type_add");
    openPopup(addPopup);
  });

  // Cerrar popups con botón de cierre
  const closeButtons = document.querySelectorAll(".popup__close-button");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      closePopup(popup);
    });
  });
}

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

function escCloseListener(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
}

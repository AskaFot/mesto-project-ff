// в файле modal.js описаны функции для работы
// с модальными окнами: функция открытия модального окна,
//  функция закрытия модального окна, функция-обработчик
//  события нажатия Esc и
// функция-обработчик события клика по оверлею;

export function openPopup(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", handleEscape);
  popup.addEventListener("mousedown", setPopupCloseListeners);
}

export function closePopup(popup) {
  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 1);
  document.removeEventListener("keydown", handleEscape);
}

export function setPopupCloseListeners(event) {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_is-opened")) {
        closePopup(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        closePopup(popup);
      }
    });
  });
}

export function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

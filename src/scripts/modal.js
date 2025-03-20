// в файле modal.js описаны функции для работы
// с модальными окнами: функция открытия модального окна,
//  функция закрытия модального окна, функция-обработчик
//  события нажатия Esc и
// функция-обработчик события клика по оверлею;

export function openPopup(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 200);
  document.addEventListener("keydown", handleEscape);
  popup.addEventListener("mousedown", clickOvarlay);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-animated");

  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 300);
  document.removeEventListener("keydown", handleEscape);
}

export function clickOvarlay(event) {
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

// let currentCardId = null;
// let currentCardPopup = null;


// export function openDeletePopup(cardId, cardPopup) {
//   if (!cardId || !cardPopup) {
//     console.error("❌ Ошибка: `cardId` или `currentCardPopup` не переданы!", { cardId, cardPopup });
//     return;
//   }

//   console.log("🗑 Открываем попап удаления. ID карточки:", cardId);

//   currentCardId = cardId;
//   currentCardPopup = cardPopup;

//   const deletePopup = document.getElementById("delete-popup");
//   openPopup(deletePopup);
// }


// //  Функция закрытия попапа удаления
// export function closeDeletePopup() {
//   const deletePopup = document.getElementById("delete-popup");
//   closePopup(deletePopup);
// }


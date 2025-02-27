// в файле card.js описаны функции для работы с карточками: 
// функция создания карточки, функции-обработчики 
// событий удаления и лайка карточки;
import{templateContainer,buttonAdd,buttonLike}from "./index.js";
import {initialCards} from "./cards.js";
export function createCard(detailsCard, removeCard) {
   const templateContainer = document.querySelector("#card-template").content; // создает карточку
  const containerElement = templateContainer
    .querySelector(".card")
    .cloneNode(true); // создает клон карточки
  const titleElement = containerElement.querySelector(".card__title");
  const imageElement = containerElement.querySelector(".card__image");

  imageElement.src = detailsCard.link;
  imageElement.alt = detailsCard.name;
  titleElement.textContent = detailsCard.name;
  const buttonDelete = containerElement.querySelector(".card__delete-button"); // кнопка удалить песню
  buttonDelete.addEventListener("click", () => removeCard(containerElement));
  return containerElement;
}


// @todo: Функция удаления карточки
export function removeCard(element) {
  element.remove(); // Удаляем ТОЛЬКО эту карточку
}

// export function likeCard(element) {
//   element.like(); // лайк ТОЛЬКО этой карточки
// }
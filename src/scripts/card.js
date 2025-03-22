import {  toggleLike } from "./api.js";
import { openPopup} from "./modal.js";

// Проверяем, что шаблон существует в DOM
const cardTemplate = document.querySelector("#card-template");
if (!cardTemplate) {
  console.error("Ошибка: #card-template не найден в DOM!");
}

export function createCard(cardData, currentUser) {
  const template = cardTemplate.content.cloneNode(true);
  const cardElement = template.querySelector(".card");
  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const buttonDelete = cardElement.querySelector(".card__delete-button");


  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Лайк карточки
  if (cardData.likes.some((user) => user._id === currentUser)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    toggleLike(cardData._id, isLiked)
      .then((updatedCard) => {
        likeCount.textContent = updatedCard.likes.length;
        likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      })
      .catch(console.error);
  });

  //  кнопка удаления
  if (cardData.owner && cardData.owner._id === currentUser) {
    buttonDelete.style.display = "block";
    buttonDelete.addEventListener("click", () => {
      console.log("❗ Клик по кнопке удаления. Передаём элемент:", cardElement);
      openDeletePopup(cardData._id, cardElement);
    });
  }
  
  
  return cardElement;
}

let currentCardId = null;
let currentCardElement = null;

export function openDeletePopup(cardId, cardElement) {
  // console.log("✅ currentCardId установлен:", cardId);
  // console.log("✅ currentCardElement установлен:", cardElement);

  if (!cardElement) {
    console.error("❌ Ошибка: переданный элемент карточки равен null!");
    return;
  }

  window.currentCardId = cardId;
  window.currentCardElement = cardElement; // Используем глобальные переменные

  const deletePopup = document.getElementById("delete-popup");
  openPopup(deletePopup);
}



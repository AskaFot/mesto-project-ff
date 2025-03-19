import { deleteCard, toggleLike } from "./api.js";

// Проверяем, что шаблон существует в DOM
const cardTemplate = document.querySelector("#card-template");
if (!cardTemplate) {
  console.error("❌ Ошибка: #card-template не найден в DOM!");
}

export function createCard(cardData) {
  if (!cardTemplate) return null; // Если шаблон не найден, ничего не создаем

  const template = cardTemplate.content.cloneNode(true);
  const cardElement = template.querySelector(".card");

  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;
  cardElement.id = cardData._id;

  // Проверяем, существует ли owner у карточки
  const currentUser = localStorage.getItem("currentUser");
  // ✅ Показываем кнопку удаления только владельцу
  if (cardData.owner && cardData.owner._id === currentUser) {
    buttonDelete.style.display = "block";
    buttonDelete.addEventListener("click", () => openDeletePopup(cardData._id, cardElement));
  }

  // ✅ Устанавливаем состояние лайка
  if (cardData.likes.some((user) => user._id === currentUser)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  // Лайки
  if (cardData.likes.some((user) => user._id === currentUser)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", () => {
    const isLiked = buttonLike.classList.contains("card__like-button_is-active");
    toggleLike(cardData._id, isLiked)
      .then((data) => {
        likeCount.textContent = data.likes.length;
        buttonLike.classList.toggle("card__like-button_is-active", !isLiked);
      })
      .catch(console.error);
  });

  return cardElement;
}



import { fetchUserProfile, fetchCards, updateUserProfile, addNewCard, updateAvatar } from "./api.js";
import { openPopup, closePopup } from "./modal.js";

// Загрузка данных при старте
document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
  fetchCards();
});

// Обработчик формы редактирования профиля
document.querySelector('.popup_type_edit').addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.querySelector('input[name="popup_name"]').value;
  const about = evt.target.querySelector('input[name="description"]').value;
  updateUserProfile(name, about);
});

// Обработчик формы добавления карточки
document.querySelector('.popup_type_new-card').addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.querySelector('input[name="place-name"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;
  // addNewCard(name, link);
});

// Обработчик формы обновления аватара
document.querySelector(".submit-avatar").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarUrl = evt.target.querySelector(".avatar-link").value;
  updateAvatar(avatarUrl);
});











let currentCardId = null;
let currentCardElement = null;

// 📌 Функция открытия попапа удаления
function openDeletePopup(cardId, cardElement) {
  currentCardId = cardId;
  currentCardElement = cardElement;

  const deletePopup = document.getElementById("delete-popup");
  openPopup(deletePopup);
}


// 📌 Функция закрытия попапа удаления
function closeDeletePopup() {
  const deletePopup = document.getElementById("delete-popup");
  closePopup(deletePopup);
}

// 📌 Обработчик кнопки подтверждения удаления
document.getElementById("confirmDeleteButton").addEventListener("click", () => {
  if (!currentCardId || !currentCardElement) {
    console.error("❌ Ошибка: нет ID или элемента карточки для удаления!");
    return;
  }

  deleteCard(currentCardId)
    .then(() => {
      currentCardElement.remove(); // Удаляем карточку из DOM
      closeDeletePopup();
    })
    .catch((err) => console.error("Ошибка удаления карточки:", err));
});

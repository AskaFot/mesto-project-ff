import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import {
  fetchUserProfile,
  fetchCards,
  updateUserProfile,
  addNewCard,
  updateAvatar,
} from "./api.js";
import { enableValidation, clearValidation } from "./validation.js";
import { createCard } from "./card.js";
import {
  nameInput,
  popupValidation,
  jobInput,
  buttonEdit,
  buttonAdd,
  editElement,
  cardElement,
  popupType,
  popupImage,
  namePtofil,
  aboutPtofil,
  popupCaption,
  buttonAvatar,
  avatarPtofil,
  cardContainer
} from "./variables.js";


// Проверяем, найдены ли все элементы
if (!namePtofil || !aboutPtofil || !avatarPtofil || !cardContainer) {
  console.error("❌ Ошибка: один или несколько элементов профиля/карточек не найдены в DOM!");
}


// // Объект настроек
const validationConfig = {
  formSelector: ".popup__form", // Селектор для форм
  inputSelector: ".popup__input", // Селектор для полей ввода
  submitButtonSelector: ".popup__button", // Селектор для кнопки отправки
  inactiveButtonClass: "popup__button_disabled", // Класс для неактивной кнопки
  inputErrorClass: "popup__input_type_error", // Класс для полей с ошибками
  errorClass: "popup__error_visible", // Класс для сообщения об ошибке
};

//  Включаем валидацию
enableValidation(validationConfig);

popupValidation.addEventListener("submit", function (evt) {
  evt.preventDefault(); // предотвратить перезагрузку страницы

  // Очищаем значения в полях
  placeInput.value = "";
  linkInput.value = "";

  // Очищаем ошибки валидации
  clearValidation(formCard, validationConfig);
});

// Загружаем профиль и карточки при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([fetchUserProfile(), fetchCards()])
    .then(([userData, cards]) => {
      if (!userData || !userData.name || !userData.about || !userData.avatar) {
        console.error("❌ Ошибка: данные профиля загружены некорректно!");
        return;
      }

      namePtofil.textContent = userData.name;
      aboutPtofil.textContent = userData.about;
      document.querySelector(".profile__image").style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach((card) => {
        const cardEl = createCard(card);
        if (cardEl) cardContainer.append(cardEl);
      });
    })
    .catch(console.error);
});

// Открытие попапов
buttonEdit.addEventListener("click", () => {
  nameInput.value = namePtofil.textContent;
  jobInput.value = aboutPtofil.textContent;
  openPopup(editElement);
});

buttonAdd.addEventListener("click", () => openPopup(cardElement));

// Закрытие попапов
document.querySelector(".popup_type_edit .popup__close").addEventListener("click", () => closePopup(editElement));
document.querySelector(".popup_type_new-card .popup__close").addEventListener("click", () => closePopup(cardElement));
document.querySelector(".popup_type_image .popup__close").addEventListener("click", () => closePopup(popupType));

// Обновление профиля
editElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateUserProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      namePtofil.textContent = userData.name;
      aboutPtofil.textContent = userData.about;
      closePopup(editElement);
    })
    .catch(console.error);
});

// Добавление карточки
cardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.querySelector('input[name="place-name"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;

  addNewCard(name, link)
    .then((cardData) => {
      if (cardData) {
        cardContainer.prepend(createCard(cardData));
        evt.target.reset();
        closePopup(cardElement);
      }
    })
    .catch(console.error);
});

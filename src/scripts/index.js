import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import {
  fetchUserProfile,
  fetchCards,
  updateUserProfile,
  addNewCard,
  updateAvatar
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
  placeInput,
  buttonAvatar,
  avatarPtofil,
  linkInput,
  formCard,

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

// // Загружаем профиль и карточки при загрузке страницы
// document.addEventListener("DOMContentLoaded", () => {
//   Promise.all([fetchUserProfile(), fetchCards()])
//     .then(([userData, cards]) => {
//       if (!userData || !userData.name || !userData.about || !userData.avatar) {
//         console.error("❌ Ошибка: данные профиля загружены некорректно!");
//         return;
//       }

//       namePtofil.textContent = userData.name;
//       aboutPtofil.textContent = userData.about;
//       document.querySelector(".profile__image").style.backgroundImage = `url(${userData.avatar})`;

//       cards.forEach((card) => {
//         const cardEl = createCard(card);
//         if (cardEl) cardContainer.append(cardEl);
//       });
//     })
//     .catch(console.error);
// });


// document.addEventListener("DOMContentLoaded", () => {
//   Promise.all([fetchUserProfile(), fetchCards()])
//     .then(([userData, cards]) => {
//       const userId = userData._id; // ID текущего пользователя
//       const cardContainer = document.querySelector(".places__list");

//       cards.forEach((card) => {
//         const cardElement = createCard(card, userId);
//         if (cardElement) cardContainer.append(cardElement);
//       });
//     })
//     .catch(console.error);
// });

// Добавление новой карточки
cardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  console.log("🔄 Форма отправлена!"); // Проверяем, вызывается ли `submit` дважды

  const name = evt.target.querySelector('input[name="place-name"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;

  evt.target.reset(); // Очищаем форму сразу

  addNewCard(name, link)
    .then((cardData) => {
      if (cardData) {
        console.log("🆕 Добавляем карточку:", cardData);

        const newCard = createCard(cardData, cardData.owner._id);
        if (newCard) {
          cardContainer.prepend(newCard);
        }

        closePopup(cardElement);
      }
    })
    .catch(console.error);
});


// Функция открытия фото
export function openFoto(evt) {
  const clickedImage = evt.target; // Определяем, куда кликнули

  if (clickedImage.classList.contains('card__image')) {

    // Находим карточку, к которой относится изображение
    const card = clickedImage.closest('.card'); // Ищем родителя `.card`
    const cardTitle = card ? card.querySelector('.card__title') : null; // Заголовок карточки

    // Устанавливаем картинку и подпись
    popupImage.src = clickedImage.src;
    popupImage.alt = cardTitle.textContent; // "Фотография";
    popupCaption.textContent = cardTitle.textContent //"Без описания";
    // Показываем попап
    openPopup (popupType)  }
};

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

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([fetchUserProfile(), fetchCards()])
    .then(([userData, cards]) => {
      if (!userData || !userData._id) {
        console.error("❌ Ошибка: данные профиля загружены некорректно!");
        return;
      }
      cardContainer.addEventListener('click', openFoto);
      const userId = userData._id;
      namePtofil.textContent = userData.name;
      aboutPtofil.textContent = userData.about;
      document.querySelector(".profile__image").style.backgroundImage = `url(${userData.avatar})`;

      cardContainer.innerHTML = ""; // Очистка контейнера перед загрузкой новых карточек

      cards.forEach((card) => {
        const cardEl = createCard(card, userId);
        if (cardEl) cardContainer.append(cardEl);
      });
    })
    .catch(console.error);
});


// // Добавление карточки
// cardElement.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.querySelector('input[name="place-name"]').value;
//   const link = evt.target.querySelector('input[name="link"]').value;

//   addNewCard(name, link)
//     .then((cardData) => {
//       if (cardData) {
//         cardContainer.prepend(createCard(cardData));
//         evt.target.reset();
//         closePopup(cardElement);
//       }
//     })
//     .catch(console.error);
// });

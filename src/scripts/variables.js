
// @todo: Темплейт карточки

export const templateContainer = document.querySelector("#card-template").content; // создает карточку

// @todo: DOM узлы
export const container = document.querySelector(".content");
export const cardContainer = container.querySelector(".places__list");
export const profileForm = document.querySelector('.popup__form_profile');
export const cardForm = document.querySelector('.popup__form_card');
export const popupValidation = document.querySelector('.popup__form');
export const elementCard = cardContainer.querySelector('.places__item')

//аватар
export const buttonAvatar = container.querySelector(".submit-avatar");
export const avatarImage = document.querySelector(".profile__image");
export const avatarPopup = document.getElementById("avatar-popup");
export const avatarForm = document.getElementById("avatar-form"); 
export const avatarInput = document.getElementById("avatar-url"); 
export const submitAvatarButton = document.getElementById("submit-avatar"); 
export const closeAvatarPopup = document.getElementById("close-avatar-popup");
export const inputSelector = document.querySelector(".popup__input");



// Блок редактирования профиля
export const profilePopup  = document.querySelector('.popup_type_edit'); // editElement
export const formEdit = profilePopup.querySelector('.popup__form');
export const buttonEdit = container.querySelector(".profile__edit-button");
export const editClose = profilePopup.querySelector('.popup__close');
export const editSave= formEdit.querySelector('.popup__button');
export const namePtofil = document.querySelector(".profile__title");
export const aboutPtofil = document.querySelector(".profile__description");
export const nameInput = formEdit.querySelector('input[name="popup_name"]');
export const jobInput = formEdit.querySelector('input[name="description"]');


// Блок создания карточки
export const cardPopup  = document.querySelector('.popup_type_new-card'); //cardElement
export const formCard = document.getElementById('popup__form-place');
export const buttonAdd = container.querySelector('.profile__add-button');
export const cardClose = cardPopup.querySelector('.popup__close');
export const placePtofil = document.querySelector('.popup__input_type_card-name')
export const linkPtofil = document.querySelector(".popup__input_type_url");
export const placeInput = formCard.querySelector('input[name="place-name"]');
export const linkInput = formCard.querySelector('input[name="link"]');


// Блок открытия карточки
export const imagePopup  = document.querySelector('.popup_type_image'); // Находим попап popupType
export const popupImage = imagePopup.querySelector('.popup__image'); // Картинка в попапе
export const popupCaption = imagePopup.querySelector('.popup__caption'); // Подпись в попапе
export const imgClose = imagePopup.querySelector('.popup__close');

//удаление карточки
// export const deleteElement = document.querySelector('.popup_type_delete') // Находим попап
// export const deleteClose = deleteElement.querySelector('.popup__close');
// export const confirmDeleteButton = deleteElement.querySelector('.popup__button')



// // Объект настроек
export const validationConfig = {
  formSelector: ".popup__form", // Селектор для форм
  inputSelector: ".popup__input", // Селектор для полей ввода
  submitButtonSelector: ".popup__button", // Селектор для кнопки отправки
  inactiveButtonClass: "popup__button_disabled", // Класс для неактивной кнопки
  inputErrorClass: "popup__input_type_error", // Класс для полей с ошибками
  errorClass: "popup__error_visible", // Класс для сообщения об ошибке
};
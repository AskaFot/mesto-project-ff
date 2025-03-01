
// @todo: Темплейт карточки

export const templateContainer = document.querySelector("#card-template").content; // создает карточку

// @todo: DOM узлы
export const container = document.querySelector(".content");
export const cardContainer = container.querySelector(".places__list");

// Блок редактирования профиля
export const editElement = document.querySelector('.popup_type_edit');
export const formEdit = editElement.querySelector('.popup__form');
export const buttonEdit = container.querySelector(".profile__edit-button");
export const editClose = editElement.querySelector('.popup__close');
export const editSave= formEdit.querySelector('.popup__button');


// Блок создания карточки
export const cardElement = document.querySelector('.popup_type_new-card');
export const formCard = cardElement.querySelector('.popup__form');
export const buttonAdd = container.querySelector('.profile__add-button');
export const cardClose = cardElement.querySelector('.popup__close');


// Блок открытия карточки
export const popupType = document.querySelector('.popup_type_image'); // Находим попап
export const popupImage = popupType.querySelector('.popup__image'); // Картинка в попапе
export const popupCaption = popupType.querySelector('.popup__caption'); // Подпись в попапе
export const imgClose = popupType.querySelector('.popup__close');

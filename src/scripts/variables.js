
// @todo: Темплейт карточки

export const templateContainer = document.querySelector("#card-template").content; // создает карточку

// @todo: DOM узлы
export const container = document.querySelector(".content");
export const cardContainer = container.querySelector(".places__list");
export const profileForm = document.querySelector('.popup__form_profile');
export const cardForm = document.querySelector('.popup__form_card');
export const popupValidation = document.querySelector('.popup__form');



// Блок редактирования профиля
export const editElement = document.querySelector('.popup_type_edit');
export const formEdit = editElement.querySelector('.popup__form');
export const buttonEdit = container.querySelector(".profile__edit-button");
export const editClose = editElement.querySelector('.popup__close');
export const editSave= formEdit.querySelector('.popup__button');
export const namePtofil = document.querySelector(".profile__title");
export const jobtofil = document.querySelector(".profile__description");
export const nameInput = formEdit.querySelector('input[name="popup_name"]');
export const jobInput = formEdit.querySelector('input[name="description"]');


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

// // В файле index.js должны остаться:
// // объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// // обработчики событий (при открытии и закрытии попапов; при отправке форм; 
// //   обработчик, открывающий попап при клике по изображению карточки);
// // вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать 
// // объявленные здесь переменные и обработчики.


import "../pages/index.css";
import { openModal, closeModal, handleFormSubmit, handleForm,openFoto} from "./modal.js";
import { editElement, formEdit, buttonEdit, editClose, cardElement, buttonAdd, cardClose, popupType,  imgClose, cardContainer} from "./variables.js";



// Открытие и закрытие формы редактирования профиля
buttonEdit.addEventListener('click', () => openModal(editElement));
editClose.addEventListener('click', () => closeModal(editElement));

// Открытие и закрытие формы создания карточки
buttonAdd.addEventListener('click', () => openModal(cardElement));
cardClose.addEventListener('click', () => closeModal(cardElement));

// Открытие и закрытие картинки
imgClose.addEventListener('click', () => closeModal(popupType));


// Обработчики форм
formEdit.addEventListener('submit', handleFormSubmit);
cardElement.addEventListener('submit', handleForm);
cardContainer.addEventListener('click', openFoto);
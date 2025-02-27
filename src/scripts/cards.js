// в файле cards.js описан массив карточек, отображаемых на странице;

export const arkhyzImage = new URL('../images/arkhyz.jpg', import.meta.url);
export const chelyabinskImage = new URL('../images/chelyabinsk-oblast.jpg', import.meta.url);
export const ivanovoImage = new URL('../images/ivanovo.jpg', import.meta.url);
export const kamchatkaImage = new URL('../images/kamchatka.jpg', import.meta.url);
export const kholmogorskyImage = new URL('../images/kholmogorsky-rayon.jpg', import.meta.url);
export const baikalImage = new URL('../images/baikal.jpg', import.meta.url);

export const initialCards = [
  { name: 'Архыз', link: arkhyzImage },
  { name: 'Челябинская область', link: chelyabinskImage },
  { name: 'Иваново', link: ivanovoImage },
  { name: 'Камчатка', link: kamchatkaImage },
  { name: 'Холмогорский район', link: kholmogorskyImage },
  { name: 'Байкал', link: baikalImage },
];


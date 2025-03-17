// в файле cards.js описан массив карточек, отображаемых на странице;

// export const arkhyzImage = new URL('https://images.unsplash.com/photo-1691243915795-af2280b7c19b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', import.meta.url);
// export const chelyabinskImage = new URL('https://images.unsplash.com/photo-1594751240727-ebe61ace8e93?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', import.meta.url);
// export const ivanovoImage = new URL('https://images.unsplash.com/photo-1641889176994-16f5926d753e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', import.meta.url);
// export const kamchatkaImage = new URL('https://images.unsplash.com/photo-1634745186518-db2e653372c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', import.meta.url);
// export const kholmogorskyImage = new URL('https://images.unsplash.com/photo-1729002167138-d05965935bf0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', import.meta.url);
// export const baikalImage = new URL('https://images.unsplash.com/photo-1617835594990-7cd5a9b5d153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', import.meta.url);

// export const initialCards = [
//   { name: 'Архыз', link: arkhyzImage },
//   { name: 'Челябинская область', link: chelyabinskImage },
//   { name: 'Иваново', link: ivanovoImage },
//   { name: 'Камчатка', link: kamchatkaImage },
//   { name: 'Холмогорский район', link: kholmogorskyImage },
//   { name: 'Байкал', link: baikalImage },
// ];

// fetch('https://nomoreparties.co/v1/wff-cohort-34/cards', {
//   headers: {
//     authorization: '1c551ff6-00cc-40b7-b844-b0d2f447e9fe'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// const cohortId = "wff-cohort-34"; // Укажите вашу группу
// const token = "1c551ff6-00cc-40b7-b844-b0d2f447e9fe"; // Вставьте ваш токен
// const apiUrl = `https://nomoreparties.co/v1/${cohortId}`;

// // Функция для запроса данных пользователя
// function getUserData() {
//   return fetch(`${apiUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${token}`,
//       "Content-Type": "application/json"
//     }
//   }).then(res => {
//     if (!res.ok) {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//     return res.json();
//   });
// }

// // Функция для запроса карточек
// function getCards() {
//   return fetch(`${apiUrl}/cards`, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${token}`,
//       "Content-Type": "application/json"
//     }
//   }).then(res => {
//     if (!res.ok) {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//     return res.json();
//   });
// }

// // Запросы выполняются параллельно
// Promise.all([getUserData(), getCards()])
//   .then(([userData, cards]) => {
//     console.log("Данные пользователя:", userData);
//     console.log("Карточки:", cards);

//     // Отображаем данные пользователя
//     document.querySelector(".profile__name").textContent = result.name;
//     document.querySelector(".profile__about").textContent = result.about;
//     document.querySelector(".profile__image").src = result.avatar;

//     // Сохраняем _id пользователя для дальнейших действий
//     const userId = userData._id;

//     // Отображаем карточки (передавая userId, чтобы знать, какие можно удалить)
//     renderCards(cards, userId);
//   })
//   .catch((err) => {
//     console.error("Ошибка загрузки данных:", err);
//   });

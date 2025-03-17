
const cohortId = "wff-cohort-34";
const token = "1c551ff6-00cc-40b7-b844-b0d2f447e9fe";
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`;



// Функция для запроса данных пользователя
export function getUserData() {
  return fetch(`${apiUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: token, // ✅ Убрали Bearer
      "Content-Type": "application/json"
    }
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

// Функция для запроса карточек
export function getCards() {
  return fetch(`${apiUrl}/cards`, {
    method: "GET",
    headers: {
      Authorization: token, 
      "Content-Type": "application/json"
    }
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
} 

//Редактирование профиля
// export function  editingProfileApi (name,about){
// return fetch(`${apiUrl}/users/me`, {
//   method: 'PATCH',
//   headers: {
//     Authorization: token,
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
//   // .then((res) => res.json())
//   // .then((result) => {
//   //   console.log(result);
//   // })
// })}
export function editingProfileApi(name, about) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-34/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(), // Убираем лишние пробелы
      about: about.trim()
    })
    
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })}


// export function  saveProfileApi (name,about){
//   return fetch(`${apiUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       Authorization: token,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: 'userData.name',
//       about: 'userData.about'
//     })
//     // .then((res) => res.json())
//     // .then((result) => {
//     //   console.log(result);
//     // })
//   })}

//6. Добавление новой карточки
// POST https://nomoreparties.co/v1/cohortId/cards


//7. Отображение количества лайков карточки



//8. Удаление карточки


//9. Постановка и снятие лайка


//10. Обновление аватара пользователя


//11. Улучшенный UX всех форм

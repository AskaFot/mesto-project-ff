const API_URL = "https://nomoreparties.co/v1/wff-cohort-34";
const TOKEN = "1c551ff6-00cc-40b7-b844-b0d2f447e9fe";

const request = (url, options) =>
  fetch(url, {
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    ...options,
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));

// Загрузка профиля
export function fetchUserProfile() {
  return request(`${API_URL}/users/me`).catch((err) => {
    console.error("Ошибка загрузки профиля:", err);
    return {};
  });
}

// Загрузка карточек
export function fetchCards() {
  return request(`${API_URL}/cards`).catch((err) => {
    console.error("Ошибка загрузки карточек:", err);
    return [];
  });
}

// Обновление профиля
export function updateUserProfile(name, about) {
  return request(`${API_URL}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  }).catch((err) => {
    console.error("Ошибка обновления профиля:", err);
    return {};
  });
}

// Добавление карточки
export function addNewCard(name, link) {
  return request(`${API_URL}/cards`, {
    method: "POST",
    body: JSON.stringify({ name, link }),
  }).catch((err) => {
    console.error("Ошибка добавления карточки:", err);
    return null;
  });
}

// Удаление карточки
// export function deleteCard(cardId) {
//   return request(`${API_URL}/cards/${cardId}`, { method: "DELETE" });
// }

export function deleteCard(cardId) {
  return request(`${API_URL}/cards/${cardId}`, { method: "DELETE" })
    .then((res) => {
      if (!res) throw new Error("Ошибка удаления карточки!");
    });
}


// Лайк карточки
export function toggleLike(cardId, isLiked) {
  return request(`${API_URL}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
  });
}

// Обновление аватара
export function updateAvatar(avatarUrl) {
  return request(`${API_URL}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarUrl }),
  })    .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .catch((err) => {
    console.error("Ошибка обновления аватара:", err);
  });
}

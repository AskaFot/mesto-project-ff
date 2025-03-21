
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, formInput, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput,validationConfig) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
};


// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput,validationConfig) => {
  if (formInput.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    // formInput.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы");
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else if (formInput.validity.tooShort) {
    formInput.setCustomValidity(``);
  } else if (formInput.validity.tooLong) {
    formInput.setCustomValidity(``);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    formInput.setCustomValidity("");
  }
  if (!formInput.checkValidity()) {
    showInputError(formElement, formInput, formInput.validationMessage,validationConfig);
  } else {
    hideInputError(formElement, formInput,validationConfig);
  }
};

function setEventListeners(formElement,validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  if (buttonElement) {
    toggleButtonState(inputList, buttonElement,validationConfig);
  }
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, validationConfig);
      if (buttonElement) {
        toggleButtonState(inputList, buttonElement, validationConfig);
      }
    });
  });
}


//Функция enableValidation() выполняет следующие действия:

//Находит все формы на странице с классом .popup__form и сохраняет их в массив formList.
//Перебирает каждую форму и добавляет обработчик события submit, который предотвращает стандартное поведение формы (evt.preventDefault();). Это означает, что отправка формы в браузере не произойдет.
//Вызывает функцию setEventListeners(formElement) для каждой формы. 
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}


// Если поле не валидно, колбэк вернёт true
// Обход массива прекратится и вся функция
// hasInvalidInput вернёт true
export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList,validationConfig)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

//Функция clearValidation(formElement, settings) выполняет следующие действия:

//Находит все поля ввода внутри переданного элемента formElement, используя селектор settings.formInput.
//Создаёт массив inputList, содержащий все найденные поля ввода.
//Очищает значения полей (input.value = ""), то есть удаляет введённый текст из всех полей формы.
//Вызывает функцию hideInputError() для каждого поля ввода, скрывая возможные сообщения об ошибках в
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((input) => {
    input.value = ""; // очищаем значение каждого поля
    hideInputError(formElement, input, validationConfig); // скрываем ошибку
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}

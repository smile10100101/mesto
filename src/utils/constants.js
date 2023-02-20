export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};


export const cardsContainer = document.querySelector('.elements');

export const popupUser = document.querySelector('.popup_user');
export const popupPlace = document.querySelector('.popup_place');
export const popupImage = document.querySelector('.popup_image');

export const popupImageLink = document.querySelector('.popup__place-img');
export const popupImageName = document.querySelector('.popup__title-img');

export const popupOpenUser = document.querySelector('.profile__edit-button');
export const popupOpenPlace = document.querySelector('.profile__add-button');

export const popupFormUser = document.querySelector('.popup__form-user');
export const nameInput = document.querySelector('.popup__input_user_name');
export const jobInput = document.querySelector('.popup__input_user_about');
export const nameProfile = document.querySelector('.profile__name');
export const jobProfile = document.querySelector('.profile__about');

export const popupFormPlace = document.querySelector('.popup__form-place');
export const titleInput = document.querySelector('.popup__input_place_title');
export const linkInput = document.querySelector('.popup__input_place_link');

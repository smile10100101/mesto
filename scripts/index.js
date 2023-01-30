import { initialCards, validationConfig } from './constants.js';
import { openPopup, closePopup } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const cardsContainer = document.querySelector('.elements');

const popupOpenUser = document.querySelector('.profile__edit-button');
const popupOpenPlace = document.querySelector('.profile__add-button');

const popupAll = document.querySelectorAll('.popup');
const popupUser = document.querySelector('.popup_user');
const popupPlace = document.querySelector('.popup_place');

const popupFormUser = document.querySelector('.popup__form-user');
const nameInput = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_about');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about');

const popupFormPlace = document.querySelector('.popup__form-place');
const titleInput = document.querySelector('.popup__input_place_title');
const linkInput = document.querySelector('.popup__input_place_link');


function openPopupUser() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popupUser);
};


function createCard(cardData) {
    const card = new Card(cardData, '#element-template');
	const newCard = card.generateCard();
    return newCard;
}

const renderCard = (card) => {
    cardsContainer.prepend(card);
};

initialCards.forEach((card) => {
    renderCard(createCard(card));
});


function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupUser);
};

function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const cardName = titleInput.value;
  const cardLink = linkInput.value;

  renderCard(createCard({ name: cardName, link: cardLink }));

  closePopup(popupPlace);

  popupFormPlace.reset();
};


const userFormValidator = new FormValidator(validationConfig, popupFormUser);
userFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationConfig, popupFormPlace);
placeFormValidator.enableValidation();


popupAll.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => { 
        if (evt.target.classList.contains('popup_opened')) { 
            closePopup(popup);
        };
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        };
    });
});


popupOpenPlace.addEventListener('click', function() {
    openPopup(popupPlace);
    placeFormValidator.resetForm();
});

popupOpenUser.addEventListener('click', openPopupUser);

popupFormUser.addEventListener('submit', handleProfileFormSubmit);
popupFormPlace.addEventListener('submit', handleCardFormSubmit);

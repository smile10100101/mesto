const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template');
const placeCard = cardTemplate.content.querySelector('.element');

const popupOpenUser = document.querySelector('.profile__edit-button');
const popupOpenPlace = document.querySelector('.profile__add-button');

const popupCloseButtonUser = document.querySelector('.popup__close-button-user');
const popupCloseButtonPlace = document.querySelector('.popup__close-button-place');
const popupCloseButtonImg = document.querySelector('.popup__close-button-img');

const popupAll = document.querySelectorAll('.popup');
const popupUser = document.querySelector('.popup_user');
const popupPlace = document.querySelector('.popup_place');
const popupImage = document.querySelector('.popup_image');

const popupFormUser = document.querySelector('.popup__form-user');
const nameInput = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_about');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about');

const popupFormPlace = document.querySelector('.popup__form-place');
const titleInput = document.querySelector('.popup__input_place_title');
const linkInput = document.querySelector('.popup__input_place_link');

const popupImageLink = document.querySelector('.popup__place-img');
const popupImageName = document.querySelector('.popup__title-img');

const placeInputs = Array.from(popupFormPlace.querySelectorAll('.popup__input'));
const placeSubmit = popupFormPlace.querySelector('.popup__submit-button');


const createCard = (cardLink, cardName) => {
    const newCard = placeCard.cloneNode(true);
    const newImage = newCard.querySelector('.element__image');
    const newSubtitle = newCard.querySelector('.element__subtitle');
    const buttonLike = newCard.querySelector('.element__like-button');
    const buttonTrash = newCard.querySelector('.element__trash-button');

    newImage.src = cardLink;
    newImage.alt = cardName;
    newSubtitle.textContent = cardName;

    buttonTrash.addEventListener('click', () => {
        newCard.remove();
    });

    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('element__like-button_active');
    });

    newImage.addEventListener('click', function () {
        openPopup(popupImage);

        popupImageLink.src = cardLink;
        popupImageLink.alt = cardName;
        popupImageName.textContent = cardName;
    });

    return newCard;
};


const renderCard = (card) => {
    cardsContainer.prepend(card);
};


initialCards.forEach((card) => {
    renderCard(createCard(card.link, card.name));   
});



function openPopupUser() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popupUser);
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};


function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

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

  renderCard(createCard(cardLink, cardName));

  closePopup(popupPlace);

  popupFormPlace.reset();
};


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
    toggleButtonState(placeInputs, placeSubmit, validationConfig);
});

popupOpenUser.addEventListener('click', openPopupUser);

popupFormUser.addEventListener('submit', handleProfileFormSubmit);
popupFormPlace.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationConfig);


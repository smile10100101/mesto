const initialCards = [
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

const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template');

const popupOpenUser = document.querySelector('.profile__edit-button');
const popupOpenPlace = document.querySelector('.profile__add-button');

const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseButtonPlace = document.querySelector('.popup__close-button-place');
const popupCloseButtonImg = document.querySelector('.popup__close-button-img');

const popup = document.querySelector('.popup');
const popupUser = document.querySelector('.popup_user');
const popupPlace = document.querySelector('.popup_place');
const popupImage = document.querySelector('.popup_image');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_about');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about');


const popupFormPlace = document.querySelector('.popup__form-place');
const titleInput = document.querySelector('.popup__input_place_title');
const linkInput = document.querySelector('.popup__input_place_link');

const popupImageLink = document.querySelector('.popup__place-img');
const popupImageName = document.querySelector('.popup__title-img');


const elementData = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link,
    };
});


const createCard = (cardLink, cardName) => {
    const elementCard = elementTemplate.content.querySelector('.element').cloneNode(true);
  
    const elementImage = elementCard.querySelector('.element__image');
    const elementSubtitle = elementCard.querySelector('.element__subtitle');
    elementImage.src = cardLink;
    elementImage.alt = cardName;
    elementSubtitle.textContent = cardName;

    elementCard.querySelector('.element__trash-button').addEventListener('click', function() {
        elementCard.remove();
  });

  elementCard.querySelector('.element__like-button').addEventListener('click', function (event) {
      event.target.classList.toggle('element__like-button_active');
  });

  elementCard.querySelector('.element__image').addEventListener('click', function () {
      openPopup(popupImage);

      popupImageLink.src = cardLink;
      popupImageLink.alt = cardName;
      popupImageName.textContent = cardName;
});

    return elementCard;
};


const renderCard = (addCard) => {
    elementsContainer.prepend(addCard);
};


elementData.forEach((item) => {
    renderCard(createCard(item.link, item.name));   
});




function openPopup(item) {
  item.classList.add('popup_opened');
};

popupOpenUser.addEventListener('click', function() {
    openPopup(popupUser);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
});

popupOpenPlace.addEventListener('click', function() {
    openPopup(popupPlace);
});

function closePopup(item) {
  item.classList.remove('popup_opened');
};

popupCloseButton.addEventListener('click', function() {
  closePopup(popupUser);
});

popupCloseButtonPlace.addEventListener('click', function() {
  closePopup(popupPlace);
});

popupCloseButtonImg.addEventListener('click', function() {
  closePopup(popupImage);
});



formElement.addEventListener('submit', handleFormSubmit);
popupFormPlace.addEventListener('submit', submitPlace);

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupUser);
};

function submitPlace (evt) {
  evt.preventDefault();

  const cardName = titleInput.value;
  const cardLink = linkInput.value;

  renderCard(createCard(cardLink, cardName));

  closePopup(popupPlace);

  titleInput.value = "";
  linkInput.value = "";
};

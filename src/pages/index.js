import { initialCards, validationConfig, cardsContainer, popupOpenUser, popupOpenPlace, 
    popupUser, popupPlace, popupImage, popupFormUser, nameInput, jobInput, nameProfile, 
    jobProfile, popupFormPlace, titleInput, linkInput  } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import './index.css';


const cardList = new Section({
    items: initialCards,
    renderer: (card) => {
        cardList.addItem(createCard({name: card.name, link: card.link}));
    }
}, cardsContainer);

cardList.renderItems();

const popupWithImage = new PopupWithImage(popupImage);

function handleCardClick(link, name) {
    popupImage.open(link, name);
};

function createCard (cardData) {
    const card = new Card({name: cardData.name, link: cardData.link}, '#element-template', handleCardClick)
    const newCard = card.generateCard();
    return newCard;
};

function openPopupUser() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    popupEditUser.open();
};

function openPopupPlace() {
    popupAddPlaceCard.open();
    placeFormValidator.resetForm();
}

const userInfo = new UserInfo({name: nameProfile, job: jobProfile});

const popupEditUser = new PopupWithForm(popupUser,
    { handleFormSubmit: (data) => {
          userInfo.setUserInfo(data);
    }
  }
);

const popupAddPlaceCard = new PopupWithForm(popupPlace,
    { handleFormSubmit: (data) => {
       const newCard = createCard(data, {name: titleInput.value, link: linkInput.value}); 
       cardList.addItem(newCard);
    }
  }
);

const userFormValidator = new FormValidator(validationConfig, popupFormUser);
userFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationConfig, popupFormPlace);
placeFormValidator.enableValidation();


popupOpenUser.addEventListener('click', openPopupUser);
popupOpenPlace.addEventListener('click', openPopupPlace);

popupEditUser.setEventListeners();
popupAddPlaceCard.setEventListeners();
popupWithImage.setEventListeners();
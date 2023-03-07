import { initialCards, validationConfig, cardsContainer, popupOpenUser, popupOpenPlace, 
    popupUser, popupPlace, popupImage, popupFormUser, nameInput, jobInput, nameProfile, 
    jobProfile, profileAvatar, popupFormPlace, popupAvatar, avatarInput, popupDelete, popupFormAvatar,  popupOpenAvatar, apiConfig } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupDeleteForm } from '../components/PopupDeleteForm.js';
/*
import './index.css';
*/
const api = new Api(apiConfig);

let userId;

const cardList = new Section({
  cards: initialCards,
  renderer: (card) => {
    cardList.addItem(createCard(card));
  }
}, cardsContainer);


const userInfo = new UserInfo({name: nameProfile, job: jobProfile, avatar: profileAvatar});


Promise.all([api.getUserInfo(), api.getCardList()])
  .then(responses => {
    const userData = responses[0];
    const listCard = responses[1];

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.getUserId(userData._id);

    userId = userData._id;
    listCard.renderItems(cardList);
    })
   .catch((err) => {
        console.log(err);
    });


const popupWithImage = new PopupWithImage(popupImage);

function handleCardClick(link, name) {
    popupWithImage.open(link, name);
};

function createCard (data) {
    const card = new Card(data, '#element-template', handleCardClick, handleCardDelete, handleCardLike, userId)
    const newCard = card.generateCard();
    return newCard;
};

api.getCardList()
  .then((res) => {
    cardList.renderItems(res);
})
  .catch((err) => {
    console.log(err);
});


const popupEditUser = new PopupWithForm(popupUser,
  { handleFormSubmit: (data) => {
        popupEditUser.setButtonText('Сохранение...');

        api.setUserInfo(data) 
        .then(res => {
        userInfo.setUserInfo(res, {name: nameInput, job: jobInput});
        popupEditUser.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditUser.setButtonText('Сохранить')
    })
  }
}
);

const popupAddPlaceCard = new PopupWithForm(popupPlace,
    { handleFormSubmit: (name, link) => {
          popupAddPlaceCard.setButtonText('Сохранение...');
          
         api.createItem(name, link)
         .then(res => {  
             const newImage = createCard(res);
             cardList.addItem(newImage);
             popupAddPlaceCard.close();
        })
         .catch((err) => {
             console.log(err);
        })
         .finally(() => {
             popupAddPlaceCard.setButtonText('Создать')
        })
      }
    }
);

const popupDeleteUserCard = new PopupDeleteForm(popupDelete, card => {
    popupDeleteUserCard.setButtonText('Удаление...');

  api.deleteItem(card._cardId)
  .then(() => {
      card.deleteCard();
      popupDeleteUserCard.close();
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
      popupDeleteUserCard.setButtonText('Да')
  })
} 
);

function handleCardDelete(card, cardID) {
  popupDeleteUserCard.open(card, cardID);
};

function handleCardLike(card) {
  if (card.isLike) {
        api.deleteLike(card._cardId)
        .then((res) => {
          card.getLikes(res.likes);
          card.toggleIsLike();
          card.toggleLike();
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
          api.putLike(card._cardId)
          .then((res) => {
              card.getLikes(res.likes);
              card.toggleIsLike();
              card.toggleLike();
          })
          .catch((err) => {
              console.log(err);
          });
      }
};

const popupEditUserAvatar = new PopupWithForm(popupAvatar,
  { handleFormSubmit: (data) => {
      popupEditUserAvatar.setButtonText('Сохранение...');

      api.setUserAvatar(data)
      .then(res => {
          userInfo.setUserAvatar(res, {avatar: avatarInput}); 
          popupEditUserAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
      .finally(() => {
          popupEditUserAvatar.setButtonText('Сохранить')
        })
      }
  });

api.getUserInfo()
.then((res) => {
   userInfo.getUserInfo(res);
   nameInput.value = res.name;
   jobInput.value = res.about;  

})
.catch((err) => {
    console.log(err);
});


const userFormValidator = new FormValidator(validationConfig, popupFormUser);
userFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationConfig, popupFormPlace);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, popupFormAvatar);
avatarFormValidator.enableValidation();


popupOpenUser.addEventListener('click', () => {
  popupEditUser.setInputValues(userInfo.getUserInfo());
  popupEditUser.open();
});

popupOpenPlace.addEventListener('click', function() {
  popupAddPlaceCard.open();
  placeFormValidator.resetForm();
});

popupOpenAvatar.addEventListener('click', function() {
  popupEditUserAvatar.open();
  avatarFormValidator.resetForm();
});

popupEditUser.setEventListeners();
popupAddPlaceCard.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteUserCard.setEventListeners();
popupEditUserAvatar.setEventListeners();
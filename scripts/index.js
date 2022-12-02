let popup = document.querySelector('.popup');
let popupOpenEdit = document.querySelector('.profile__edit-button');
let popupCloseEdit = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_user_name');
let jobInput = document.querySelector('.popup__input_user_about');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__about');

popupOpenEdit.addEventListener('click', openPopup);
popupCloseEdit.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent
    jobInput.value = jobProfile.textContent
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup();
}

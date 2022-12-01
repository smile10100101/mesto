let popupOpenEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseEdit = document.querySelector('.popup__close-button');

function openPopup() {
    popup.classList.add('popup_active');
}

function closePopup() {
    popup.classList.remove('popup_active');
}

popupOpenEdit.addEventListener('click', openPopup);
popupCloseEdit.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_about');

function handleFormSubmit (evt) {
    evt.preventDefault();
    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__about');
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);


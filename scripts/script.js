//Open and close form profile
let profileForm = document.querySelector(".edit-profile");
let closeBtn = document.querySelector(".form__close");
let edditProfileBtn = document.querySelector(".profile__editButton");
let profileBackground = document.querySelector(".form__background");

function toggleProfileForm(form) {
  form.classList.toggle("edit-profile_open");
}

edditProfileBtn.addEventListener("click", () => toggleProfileForm(profileForm));
profileBackground.addEventListener("click", () =>
  toggleProfileForm(profileForm)
);
closeBtn.addEventListener("click", () => toggleProfileForm(profileForm));

//Save Name and about profile

let profileName = document.querySelector(".profile__info-name");
let profileAbout = document.querySelector(".profile__info-about");
let nameInput = document.querySelector(".edit-profile__name");
let aboutInput = document.querySelector(".edit-profile__about");
let saveBtnProfile = document.querySelector(".edit-profile__btn");

let inputsForm = document.querySelector(".edit-profile__inputs");

//Resetea los valores actuales de Name y About

function resetProfile() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  saveBtnProfile.disabled = false;
  saveBtnProfile.classList.add("edit-profile__btn_activa");
}

resetProfile();

//Guarda la edicion de name y about
function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  toggleProfileForm(profileForm);
}

saveBtnProfile.addEventListener("click", saveProfile);
inputsForm.addEventListener("submit", saveProfile);

//Open and close addimage form
let formAddImg = document.querySelector(".addimg");
let addImgBtn = document.querySelector(".profile__addButton");
let addImgBackG = document.querySelector(".addimg__background");
let addImgClose = document.querySelector(".addimg__close");
let addImgCreateBtn = document.querySelector(".addimg__Btn");
let addImgInputs = document.querySelector(".addimg__inputs");

function toggleAddimg(form) {
  form.classList.toggle("addimage_is-opened");
}

addImgBtn.addEventListener("click", () => toggleAddimg(formAddImg));
addImgBackG.addEventListener("click", () => toggleAddimg(formAddImg));
addImgClose.addEventListener("click", () => toggleAddimg(formAddImg));
addImgCreateBtn.addEventListener("click", () => toggleAddimg(formAddImg));

//Add new photo or post
let photos = document.querySelector(".photos");

// Like button action

let likeButton = document.querySelectorAll(".photos__like-btn");

likeButton.forEach(function (button) {
  likeAction(button);
});

function likeAction(evt) {
  evt.addEventListener("click", function () {
    let clickButton = evt.closest(".photos__like-btn");
    let likeImg = evt.querySelector(".photos__like-img");
    if (clickButton) {
      likeImg.classList.toggle("photos__like-btn_activated");
    }
  });
}

function addPhoto(urlPhoto, namePhoto) {
  let photosTemplate = document.querySelector(".photos__template").content;
  let photoElement = photosTemplate
    .querySelector(".photos__content")
    .cloneNode(true);

  photoElement.querySelector(".photos__img").src = urlPhoto;
  photoElement.querySelector(".photos__img").alt = namePhoto;
  photoElement.querySelector(".photos__title").textContent = namePhoto;

  photos.prepend(photoElement);

  // Delete new photo added
  let imgDeletBtn = photoElement.querySelector(".photos__trash-btn");
  imgDeletBtn.addEventListener("click", function () {
    photoElement.remove();
  });

  // Set show popup new photo added
  let photoBtn = photoElement.querySelector(".photos__imgPopup-btn");
  setPopupImgAction(photoBtn);

  // Set like button new photo added
  let photoLikeBtn = photoElement.querySelector(".photos__like-btn");
  likeAction(photoLikeBtn);
}

// Create new post photo
function addNewPhoto(evt) {
  evt.preventDefault();
  let titleInput = document.querySelector(".addimg__title");
  let urlInput = document.querySelector(".addimg__url");

  addPhoto(urlInput.value, titleInput.value);

  urlInput.value = "";
  titleInput.value = "";
  resetform();
}

addImgCreateBtn.addEventListener("click", addNewPhoto);
addImgInputs.addEventListener("submit", addNewPhoto);

//Img popup
let imgPopup = document.querySelector(".img-popup");
let imgPopupBackG = document.querySelector(".img-popup__background");
let imgPopupClose = document.querySelector(".img-popup__close ");
let imgPopupCloseBtn = document.querySelector(".img-popup__close-icon");
let imgPopupPhotoBtn = document.querySelectorAll(".photos__imgPopup-btn");

//
function imgPopupCloseAct(evt) {
  evt.classList.toggle("img-popup_activated");
}

imgPopupClose.addEventListener("click", () => imgPopupCloseAct(imgPopup));
imgPopupCloseBtn.addEventListener("clicl", () => imgPopupCloseAct(imgPopup));
imgPopupBackG.addEventListener("click", () => imgPopupCloseAct(imgPopup));

//Open photo in popup
let imgPopupPhoto = document.querySelector(".img-popup__photo");
let imgPopupTitle = document.querySelector(".img-popup__title");

imgPopupPhotoBtn.forEach(function (btn) {
  setPopupImgAction(btn);
});

function setPopupImgAction(btn) {
  let photoImg = btn.querySelector(".photos__img");
  let photoTitle = btn
    .closest(".photos__content")
    .querySelector(".photos__title");

  btn.addEventListener("click", function () {
    imgPopupPhoto.src = photoImg.src;
    imgPopupTitle.textContent = photoTitle.textContent;
    imgPopupCloseAct(imgPopup);
  });
}

//carga las imagenes preestablecidas por default al website
let photosDefault = [
  { name: "Lago Di Braies", link: "./images/pictures/lago-di-braies.png" },
  { name: "Vrchlabi Czechia", link: "./images/pictures/Vrchlabi Czechia.jpg" },
  { name: "Latemar", link: "./images/pictures/latemar.png" },
  { name: "Monte Calvas", link: "./images/pictures/monte-calvas.png" },
  { name: "Hobbit Town", link: "./images/pictures/hobbit-town.jpg" },
  { name: "Eltz Castle", link: "./images/pictures/eltz-castle.jpg" },
];

photosDefault.forEach(function (item, i) {
  addPhoto(item.link, item.name);
});

//Validacion del formulario y estado de boton submit

const userNameProfile = document.querySelector("[name=username]");
const userAboutProfile = document.getElementById("aboutInput");
const titleImgPost = document.getElementById("imgtitle");
const urlImgPost = document.getElementById("urlInput");
const profileBtn = document.querySelector(".edit-profile__btn");
const createBtn = document.querySelector(".addimg__Btn");

const validateEmptyField = (message, evt) => {
  const field = evt.target;
  const fieldValue = evt.target.value;

  if (fieldValue.trim().length < 2) {
    field.classList.add("invalid");
    field.nextElementSibling.innerText = message;

    btnState();
  } else {
    if (field.name == urlImgPost.name) {
      validarUrl(evt);
    } else {
      btnState();
      field.classList.remove("invalid");
      field.nextElementSibling.innerText = "";
    }
  }
};

userNameProfile.addEventListener("blur", (evt) =>
  validateEmptyField("Escribe un nombre valido. Minimos 2 caracteres", evt)
);

userAboutProfile.addEventListener("blur", (evt) =>
  validateEmptyField("Escribe algo sobre ti. Minimos 2 caracteres", evt)
);

titleImgPost.addEventListener("blur", (evt) =>
  validateEmptyField("Escribe un titulo valido. Minimos 2 caracteres", evt)
);

urlImgPost.addEventListener("blur", (evt) =>
  validateEmptyField("Aporta una Url valida de una imagen", evt)
);

function validarUrl(evt) {
  field = evt.target;
  fieldValue = evt.target.value;
  var image = new Image();
  image.src = fieldValue;

  image.addEventListener("load", () => {
    field.classList.remove("invalid");
    field.nextElementSibling.innerText = "";
    btnState();
  });

  image.addEventListener("error", () => {
    field.classList.add("invalid");
    field.nextElementSibling.innerText = "Url no valida. Por favor verificar";
    btnDisabled();
  });
}

// Estado del boton disabled
function btnDisabled() {
  document.getElementById("btnCrear").disabled = true;
  createBtn.classList.remove("addimg__Btn_activa");

  document.getElementById("btnProfile").disabled = true;
  profileBtn.classList.remove("edit-profile__btn_activa");
}

// Verifica form y activa o desactiva el boton
function btnState() {
  fieldtitle = titleImgPost.value;
  fieldUrl = urlImgPost.value;
  fieldName = userNameProfile.value;
  fieldAbout = userAboutProfile.value;

  if (fieldtitle.trim().length < 2 || fieldUrl.trim().length < 2) {
    document.getElementById("btnCrear").disabled = true;
    createBtn.classList.remove("addimg__Btn_activa");
  } else {
    document.getElementById("btnCrear").disabled = false;
    createBtn.classList.add("addimg__Btn_activa");
  }

  if (fieldName.trim().length < 2 || fieldAbout.trim().length < 2) {
    document.getElementById("btnProfile").disabled = true;
    profileBtn.classList.remove("edit-profile__btn_activa");
  } else {
    document.getElementById("btnProfile").disabled = false;
    profileBtn.classList.add("edit-profile__btn_activa");
  }
}

function resetform() {
  titleImgPost.classList.remove("invalid");
  titleImgPost.nextElementSibling.innerText = "";

  urlImgPost.classList.remove("invalid");
  urlImgPost.nextElementSibling.innerText = "";

  titleImgPost.value = "";
  urlImgPost.value = "";
  btnDisabled();
  resetProfile();
}

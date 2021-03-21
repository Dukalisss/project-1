

const SERVER_URL = 'https://academy.directlinedev.com';
const VERSION_API = '1.0.0';
// Open close popup signIn js 

const popUpFindSingIn = document.querySelector('.popupSignIn_js');
const mobilepopUpFindSingIn = document.querySelector('.mobile-popupSignIn_js');
const popupSignIn = document.querySelector('.popupSignInOpen_js');
const mobilepopupSignIn = document.querySelector('.mobile-popupSignInOpen_js');
const popUpRegister = document.querySelector('.popupRegister_js');
const mobilepopUpRegister = document.querySelector('.mobile-popupRegister_js');
const popupRegisterOpen = document.querySelector('.popupRegisterOpen_js');
const mobilepopupRegisterOpen = document.querySelector('.mobile-popupRegisterOpen_js');
const profileLink = document.querySelector('.profileLink_js');
const mobileprofileLink = document.querySelector('.mobile-profileLink_js');
const OutProfile = document.querySelector(".sing-out-button_js");
const OutProfileMobile = document.querySelector(".mobile-sing-out-button_js");

const registerForm = document.forms.register;
const signIn = document.forms.signIn;
const popupSendMessageOpen = document.querySelector('.popupSendMessageOpen_js');
const sendMessageButton = document.querySelector('.sendMessageButton_js');
const sendEmail = document.querySelector('.sendEmail_js');
const sendMassageForm = document.querySelector('.sendMassageForm_js');
const registerChecked = document.querySelector('.registerChecked_js');
const registerButton = document.querySelector('.registerButton_js');
const sendButton = document.querySelector('.sendButton_js');
const sendCheckbox = document.querySelector('.sendCheckbox_js');

// rating

const ratings = {
  html: 85 ,
  css: 55,
  js: 5,
  git: 15,
  figma: 80,
}

const starsTotal = 100;
document.addEventListener('DOMContentLoaded', getRatings);

function getRatings() {
  for (let rating in ratings) {

    const starPercentage = (ratings[rating] / starsTotal) * 100;

    const starPercentageRounded = `${Math.round(starPercentage / 1) * 1}%`;

    document.querySelector(`.${rating} .skills__level-inner` ).style.width = starPercentageRounded;

    document.querySelector(`.${rating} .skills__value`)  .innerHTML = ratings[rating];
  }
}

//open popup login
(function () {

  let lastFocus;

  popUpFindSingIn.addEventListener('click', function () {

    lastFocus = document.activeElement;
    popupSignIn.classList.add('popup_open');
    popupSignIn.querySelector('.popup__input').focus();


    let close = popupSignIn.querySelector('.popup__close');
    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);

    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      popupSignIn.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();

//mobile open popup login

(function () {

  let lastFocus;

  mobilepopUpFindSingIn.addEventListener('click', function () {

    lastFocus = document.activeElement;
    mobilepopupSignIn.classList.add('popup_open');
    mobilepopupSignIn.querySelector('.popup__input').focus();


    let close = mobilepopupSignIn.querySelector('.popup__close');
    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);

    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      mobilepopupSignIn.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();


// Open close popup Register
(function () {


  let lastFocus;

  mobilepopUpRegister.addEventListener('click', function () {

    lastFocus = document.activeElement;
    mobilepopupRegisterOpen.classList.add('popup_open');
    mobilepopupRegisterOpen.querySelector('.popup__input').focus();


    let close = mobilepopupRegisterOpen.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      mobilepopupRegisterOpen.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();

// Mobile Open close popup Register
(function () {


  let lastFocus;

  popUpRegister.addEventListener('click', function () {

    lastFocus = document.activeElement;
    popupRegisterOpen.classList.add('popup_open');
    popupRegisterOpen.querySelector('.popup__input').focus();


    let close = popupRegisterOpen.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      popupRegisterOpen.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();

//Register 
(function () {

  let removeArr = [];
  let isLoadingRegister = false;

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isLoadingRegister) {
      return
    }
    isLoadingRegister = true;
    const data = getFormData(event.target);
    let errors = validateData(data);
    removeArr.forEach(fn => fn());
    if (Object.keys(errors).length) {
      removeArr = setFormError(registerForm, errors);
      isLoadingRegister = false;
      return
    }
    fetchData({
      method: 'POST',
      url: '/api/users',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {

        if (res.success) {
          alert('Succsess registration');
          popupRegisterOpen.classList.remove('popup_open');

        } else {
          throw res;
        }
        isLoadingRegister = false;
      })
      .catch(err => {
        for (key in err.errors) {
          setFormError(registerForm, err.errors);
          isLoadingRegister = false;
        }
      })
  })

})();

//login 
(function () {

  let isLoadingLogin = false;
  let removeArr = [];

  signIn.addEventListener('submit', function logIn(e) {
    e.preventDefault();
    if (isLoadingLogin) {
      return
    }
    isLoadingLogin = true;
    const data = getFormData(signIn);
    let errors = validateDataLogin(data);
    removeArr.forEach(fn => fn());
    if (Object.keys(errors).length) {
      removeArr = setFormError(signIn, errors);
      isLoadingRegister = false;
      return
    }
    fetchData({
      method: 'POST',
      url: '/api/users/login',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          alert('Пользователь успешно вошел, ID:\n' + res.data.userId)
          updateToken(res.data);
          headerUpdate();
          popupSignIn.classList.remove('popup_open');
          isLoadingLogin = false;
        } else {
          throw res;
        }
      })
      .catch(err => {
        for (key in err.errors) {
          setFormError(signIn, err.errors);
          isLoadingLogin = false;
        }
      })
  })

})();

headerUpdate();


//send message
(function () {
  sendMassageForm.addEventListener('submit', function (e) {
    sendMessage(e);
  })

})();

function sendMessage(event) {
  event.preventDefault();
  let isSending = false;
  let removeArr = [];

  if (isSending) {
    return
  }
  isSending = false;
  let data = getFormData(event.target);
  let errors = validateSendMessage(data);
  removeArr.forEach(fn => fn());
  if (Object.keys(errors).length) {
    removeArr = setFormError(event.target, errors);
    isSending = false;
    return
  }
  let items = {};
  items.body = JSON.stringify(data);
  items.to = '111@asdas.com'
  fetch(SERVER_URL + '/api/emails', {
    method: 'POST',
    body: JSON.stringify(items),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }

  })
    .then(res => res.json())
    .then(res => {
      if (res.success)
        alert('Emeil was sending');
      popupSendMessageOpen.classList.remove('popup_open');
    }
    )
    .catch(() => {
      console.error('Something was wrong. Try again');
    })
}

// Open popup send Message 
(function () {


  let lastFocus;

  sendMessageButton.addEventListener('click', function () {

    lastFocus = document.activeElement;
    popupSendMessageOpen.classList.add('popup_open');
    popupSendMessageOpen.querySelector('.popup__input').focus();


    let close = popupSendMessageOpen.querySelector('.popup__close');

    close.addEventListener('click', exit);

    window.addEventListener('keydown', keyDownEcs);


    function keyDownEcs(event) {
      if (event.code === 'Escape') {
        exit();
      }
    }

    function exit() {
      close.removeEventListener('click', exit);
      window.removeEventListener('keydown', keyDownEcs);
      popupSendMessageOpen.classList.remove('popup_open');
      lastFocus.focus();
    }
  })
})();


//Validation

function validateData(data, errors = {}) {

  if (!checkEmail(data.email)) {
    errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
  }
  if (data.password != data.repeatPassword) {
    errors.password = 'The password and confirm password fields do not match.';
  }
  if (!data.password) {
    errors.password = 'This field is required';

  } else if (data.password.length < 8) {
    errors.password = 'The password is too short';
  }

  if (!data.name) {
    errors.name = 'This field is required';
  }
  if (!data.surname) {
    errors.surname = 'This field is required';
  }
  if (!data.location) {
    errors.location = 'This field is required';
  }
  if (+(data.age) <= 0) {
    errors.age = 'Age is incorrect';
  }
  return errors;
}

function validateDataLogin(data, errors = {}) {

  if (!checkEmail(data.email)) {
    errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
  }

  if (!data.password) {
    errors.password = 'This field is required';

  } else if (data.password.length < 8) {
    errors.password = 'The password is too short';
  }

  return errors;
}

function checkEmail(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function validateSendMessage(data, errors = {}) {

  if (!checkEmail(data.email)) {
    errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
  }

  if (!data.phone) {
    errors.phone = 'This field is required';

  }
  if (!data.name) {
    errors.name = 'This field is required';
  }
  if (!data.messageSubject) {
    errors.messageSubject = 'This field is required';
  }
  return errors;
}

function getFormData(form, data = {}, type = 'json') {
  if (type === 'json') {
    let inputs = form.querySelectorAll('input');
    for (let input of inputs) {
      switch (input.type) {
        case 'radio':
          if (input.checked) {
            data[input.name] = input.value;
          }
          break;
        case 'checkbox':
          if (!data[input.name]) {
            data[input.name] = [];
          }
          if (input.checked) {
            data[input.name].push(input.value);
          }
          break;
        case 'file':
          data[input.name] = input.files;
          break;

        default:
          data[input.name] = input.value;
          break;
      }
    }
    let textareas = form.querySelectorAll('textarea');
    for (let textarea of textareas) {
      data[textarea.name] = textarea.value;
    }
    return data;
  } else {
    return new FormData(form);
  }

}

function setInvalid(input) {
  function handl() {
    input.removeEventListener('input', handl);
    input.classList.remove("invalidInput");
  }
  input.classList.add("invalidInput");
  input.addEventListener('input', handl);
  return handl;
}
function giveInputFeedback(input, error) {
  function handl() {
    message.remove();
    input.removeEventListener('input', handl);
  }

  input.classList.add("invalidInput");
  let message = document.createElement('div');
  message.classList.add("invalidMessage");
  message.innerText = error;
  input.insertAdjacentElement("afterend", message);

  input.addEventListener('input', handl);
  return handl;
}

function setFormError(form, errors) {
  let removeArr = [];
  let inputs = form.querySelectorAll('input');
  let textareas = form.querySelectorAll('textarea');

  for (let input of inputs) {
    if (errors[input.name]) {
      const remove1 = setInvalid(input);
      const remove2 = giveInputFeedback(input, errors[input.name]);
      removeArr.push(remove1, remove2);
    }
  }

  for (let textarea of textareas) {
    if (errors[textarea.name]) {
      const remove3 = setInvalid(textarea);
      const remove4 = giveInputFeedback(input, errors[textarea.name]);
      removeArr.push(remove3, remove4);
    }
  }
  return removeArr;
}

function fetchData({ method = 'GET', url = '', body = null, headers = {} }) {
  return fetch(SERVER_URL + url, {
    method: method,
    body: body,
    headers: headers,
  })
}

function updateToken(response) {
  localStorage.setItem('token', response.token);
  localStorage.setItem('userId', response.userId);
}


function headerUpdate() {
  if (localStorage.getItem('token')) {
    popUpFindSingIn.classList.add('hidden');
    mobilepopUpFindSingIn.classList.add('hidden');
    popUpRegister.classList.add('hidden');
    mobilepopUpRegister.classList.add('hidden');
    profileLink.classList.remove('hidden');
    mobileprofileLink.classList.remove('hidden');
    OutProfile.classList.remove("hidden");
    OutProfileMobile.classList.remove("hidden");
  } else {
    popUpFindSingIn.classList.remove('hidden');
    mobilepopUpFindSingIn.classList.remove('hidden');
    popUpRegister.classList.remove('hidden');
    mobilepopUpRegister.classList.remove('hidden');
    profileLink.classList.add('hidden');
    mobileprofileLink.classList.add('hidden');
    OutProfile.classList.add("hidden");
    OutProfileMobile.classList.add("hidden");
  }
}

function setValueToForm(form, data) {
  let inputs = form.querySelectorAll('input');
  for (let input of inputs) {
    switch (input.type) {
      case 'radio':
        if (data[input.name] === input.value) {
          input.checked = true;
        }
        break;
      case 'checkbox':
        if (data[input.name] && data[input.name].includes(input.value)) {
          input.checked = true;
        }

        break;
      default:
        if (data[input.name])
          input.value = data[input.name];
        break;
    }
  }
  let textareas = form.querySelectorAll('textarea');
  for (let textarea of textareas) {
    if (data[textarea.name])
      textarea.value = data[textarea.name];
  }
  return data;
}


function isDisabled(elem, button) {
  if (elem.checked) {
    button.removeAttribute('disabled');
    button.classList.remove('button_disabled');
  }
  else {
    button.classList.add('button_disabled');
    button.setAttribute('disabled', 'disabled');
  }
}

(function () {

  registerChecked.addEventListener('click', function () {
    isDisabled(registerChecked, registerButton);
  })

})();

(function () {

  sendCheckbox.addEventListener('click', function () {
    isDisabled(sendCheckbox, sendButton);
  })

})();


/* Sing out profile */

let singOutProfile = document.querySelector(".sing-out-button_js");
let singOutProfileMobile = document.querySelector(".mobile-sing-out-button_js");

singOutProfile.addEventListener("click", function(){
  localStorage.removeItem("token");
  window.location.pathname = "/index.html";
});

singOutProfileMobile.addEventListener("click", function(){
  localStorage.removeItem("token");
  window.location.pathname = "/index.html";
});
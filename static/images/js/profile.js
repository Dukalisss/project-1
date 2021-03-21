
const name = document.querySelector('.name_js');
const surname = document.querySelector('.surname_js');
const email = document.querySelector('.email_js');
const password = document.querySelector('.password_js');
const city = document.querySelector('.location_js');
const age = document.querySelector('.age_js');
const changePasswordOpen = document.querySelector('.changePasswordOpen_js');
const changePassword = document.querySelector('.changePassword_js');
const submitChangePassword = document.querySelector('.submitPassword_js');
const changeDataOpen = document.querySelector('.changeDataOpen_js');
const changeData = document.querySelector('.changeData_js');
const submitData = document.querySelector('.submitData_js');
const deleteAcc = document.querySelector('.deleteAccount_js');
const photo = document.querySelector('.photo_js');
let userData = {};
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

getUserDate();


function rerenderUser(userData) {
  name.innerText = userData.name;
  surname.innerText = userData.surname;
  email.innerText = userData.email;
  password.innerText = userData.password;
  city.innerText = userData.location;
  age.innerText = userData.age;
}

function getUserDate() {


  if (!token || !userId) {
    return window.location = '/';
  }

  fetchData({
    method: 'GET',
    url: `/api/users/${userId}`,
  

  })
    .then(res => { 
      return res.json();  
    })
    .then(res => {
   
      if (res.success) {
        userData = res.data;

        photo.style.cssText = `background-image: url('${SERVER_URL + userData.photoUrl}');
        background-position: center;
        background-size: cover;`
        rerenderUser(userData);
  
      } else {
        throw res;   
      }

    })
    .catch(err => {
      console.error(err);   
      return window.location = '/';
    })
}

//Open popup change data
(function () {

  changeDataOpen.addEventListener('click', function (e) {
    changeData.classList.add('popup_open');
    setValueToForm(changeData, userData);

    let close = changeData.querySelector('.popup__close');
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
      changeData.classList.remove('popup_open');
    }
  })



})();

//Open popup change password
(function () {

  changePasswordOpen.addEventListener('click', function (e) {
    changePassword.classList.add('popup_open');

    let close = changePassword.querySelector('.popup__close');
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
      changePassword.classList.remove('popup_open');
    }
  })



})();

changeData.addEventListener('submit', function (e) {
  changeUserData(e); 
  setTimeout(function(){
    location.reload();
  }, 1000);
})

changePassword.addEventListener('submit', function (e) {
  changeUserPassword(e);
})


isLoadingChangeUser = false;
function changeUserData(e) {
  e.preventDefault();

  if (!token) {
    return window.location = ('/');
  }
  if (isLoadingChangeUser) {
    return
  }

  isLoadingChangeUser = true;
  const body = getFormData(e.target, {}, type = 'FormData');

  fetchData({
    method: 'PUT',
    url: '/api/users',
    body: body,
    headers: {
      'x-access-token': token,
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.success) {
        userData = res.data;
        rerenderUser(userData);
        changeData.classList.remove('popup_open');
        isLoadingChangeUser = false;
      } else {
        throw res;
      }
    })
    .catch(() => {
      console.error('Server error')
      isLoadingChangeUser = false;
    })

}


let isLoadingChangePassword = false;


function changeUserPassword(e) {
  e.preventDefault();
  let removeArr = [];

  if (!token) {
    return window.location = ('/');
  }

  if (isLoadingChangePassword) {
    return
  }

  isLoadingChangePassword = true;

  // copipaste
  const body = getFormData(e.target, {}, type = 'json');
  let errors = validateDataPassword(body);
  removeArr.forEach(fn => fn());
  if (Object.keys(errors).length) {
    removeArr = setFormError(changePassword, errors);
    isLoadingChangePassword = false;
    return
  }
  fetchData({
    method: 'PUT',
    url: '/api/users',
    body: JSON.stringify(body),
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json;charset=utf-8',
    }
  })
    .then(res => res.json())
    .then(res => {

      if (res.success) {       
        userData = res.data;
        rerenderUser(userData);
        changePassword.classList.remove('popup_open');
        isLoadingChangePassword = false;
      } else {
        throw res;
      }
    })
    .catch(() => {
      for (key in err.errors) {
        setFormError(e.target, err.errors);
      }
      window.location = '/';
      isLoadingChangePassword = false;
    })

}


function validateDataPassword(data, errors = {}) {
  if (!data.oldPassword) {
    errors.oldPassword = 'This field is required';
  }
  if (!data.newPassword) {
    errors.newPassword = 'This field is required';

  } else if (data.newPassword.length < 8) {
    errors.newPassword = 'The password is too short';
  }

  if (!data.repeatNewPassword) {
    errors.repeatNewPassword = 'This field is required';
  }

  if (data.newPassword != data.repeatNewPassword) {
    errors.newPassword = 'The new password and confirm password fields do not match.';
  }

  return errors;
}




let isLoadingDelete = false;

deleteAcc.addEventListener('click', function (event) {
  let agree = confirm('Are you sure?');
  if (agree) {
    deleteUser(event);
  }


})
function deleteUser(event) {
  event.preventDefault();

  if (isLoadingDelete) {
    return
  }
  if (!token) {
    return window.location = ('/');
  }
  fetchData({
    method: 'DELETE',
    url: `/api/users/${userId}`,
    headers: {
      'x-access-token': token,
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location = '/';
      } else {
        throw res;
      }
    })
    .catch(() => {
      console.error('Server error');
      window.location = '/';

      isLoadingChangePassword = false;
    })


}


/* Поле загрузки изображения*/

const output = document.querySelector('.popup__fileText');
if (window.FileList && window.File) {
  document.getElementById('avatar').addEventListener('change', event => {
    output.innerHTML = '';
    for (const file of event.target.files) {
      const span = document.createElement('span');
      const name = file.name ? file.name : 'NOT SUPPORTED';
      span.textContent = `${name}`;
      output.appendChild(span); 
    }
  }); 
 
}


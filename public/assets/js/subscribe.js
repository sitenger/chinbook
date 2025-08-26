const subscribeForm = document.querySelector('.subscribe-form');

let subemail = document.getElementById('subemail');
let subsend = document.getElementById('subsend-btn');
let remark = 'оставилен email для скидки на аудит сайта -30%';
let absent = 'отсутствует';

subscribeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Attantion this let is importent to work with server.js, we use email:subemail.value.
  let formData = {
    email: subemail.value,
    subject: remark,
    username: absent,
    message: absent,
  };
  subsend.value = 'Подождите';

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');

  xhr.onload = () => {
    console.log(xhr.responseText);

    if (xhr.responseText == 'success') {
      // alert('Email sent');
      notie.alert({ type: 1, text: 'Успешно!', position: 'bottom' });

      subemail.value = '';
      subsend.value = 'Успешно!';
    } else {
      subsend.value = 'oops  ...';
      // alert('Something went wrong...');
      notie.alert({
        type: 3,
        text: 'Что-то пошло не так.',
        position: 'bottom',
      });
    }
  };

  xhr.send(JSON.stringify(formData));

  console.log(formData);
});

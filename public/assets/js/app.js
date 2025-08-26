const contactForm = document.querySelector('.contact-form');

let username = document.getElementById('username');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let send = document.getElementById('send-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = {
    username: username.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };
  send.value = 'Отправка сообщения...';

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');

  xhr.onload = () => {
    console.log(xhr.responseText);

    if (xhr.responseText == 'success') {
      // alert('Email sent');
      notie.alert({
        type: 1,
        text: 'Сообщение отправлено!',
        position: 'bottom',
      });
      username.value = '';
      email.value = '';
      subject.value = '';
      message.value = '';
      send.value = 'Сообщение отправлено!';
    } else {
      send.value = 'Что-то пошло не так...';
      // alert('Something went wrong...');
      notie.alert({
        type: 3,
        text: 'Что-то пошло не так...',
        position: 'bottom',
      });
    }
  };

  xhr.send(JSON.stringify(formData));

  console.log(formData);
});

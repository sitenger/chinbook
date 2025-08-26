const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const path = require('path');

// Middleware
// it was at first
// app.use(express.static('/public'));
app.use('/', express.static(path.join(__dirname + '/public')));

app.use(express.json());

app.get('/', (req, res) => {
  // res.sendFile();  path to connect to contact form a file
  // looks like the endpoint where server.js connects to HTML

  // Attantion!!! it was this way for ONE contact form
  // res.sendFile(__dirname + '/public/contact.html');
  res.sendFile(__dirname + '/public/index.html');
});

//create a post route
app.post('/', (req, res) => {
  console.log(req.body);
  // this is before we start working with nodemailer, after you create all the pages, form, app.js, you come back to this server.js and create a route to send formData to SMTP server and mail it.

  // check if form is not empty

  console.log(req.body.email);
  if (req.body.email === undefined) {
    console.log('fknbot');
  } else {
    // create a transporter
    // create a transporter

    const transporter = nodemailer.createTransport({
      // try pool (what is it ...$^&*&^*)
      service: 'Yandex',
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      // try proxy its not working on local
      // proxy: `http://127.0.0.1:${process.env.PORT}/`,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_KEY,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL,

      to: 'tecpod@yandex.ru',
      cc: 'tec.pod.com@gmail.com',
      subject: `ТЕХПОДДЕРЖКА от ${req.body.email}`,
      text: `tecpod.ru форма:   Еmail: ${req.body.email} ,  Имя посетителя - ${req.body.username} , тема - ${req.body.subject} , текст сообщения -  ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('error');
      } else {
        console.log('Email sent:' + info.response);
        res.send('success');
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res) => {
  res.status(404);
  res.send(`<h1> Error 404: Oops... </h1> `);
});

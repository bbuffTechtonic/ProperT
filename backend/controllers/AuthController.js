import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/User';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { createJWToken, verifyJWTToken } from '../libs/auth.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  }, (err, user) =>  {
    if (err) return res.status(500).send(err);
    res.status(200).send({ auth: true, token: createJWToken({ sessionData: user }) });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server');
    if (!user) return res.status(404).send('The email you’ve entered doesn’t match any account.');
    bcrypt.compareSync(password, user.password)
      ? res.status(200).send({ auth: true, token: createJWToken({ sessionData: user }) })
      : res.status(401).send('Invalid Password.');
  });
});

router.get('/verify', (req, res) => {
  const token = req.headers['x-access-token'];
  verifyJWTToken(token).then(data => {
      res.status(200).send({ auth: true, token: token });
    }).catch(err => res.status(500).send({ auth: false, token: null, message: 'Invalid auth token provided.' }));
});

router.post('/forgot', (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'propert.pass.help',
      pass: process.env.gmail_password,
    },
  });
  User.findOne({ email: email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server');
    if (!user) return res.status(404).send('The email you’ve entered doesn’t match any account.');
    const resetPassToken = createJWToken({ sessionData: user });
    const mailOptions = {
      from: 'ProperT',
      to: email,
      subject: 'Reset your Password',
      html: `<p>
                Hi ${user.firstName},<br>
                <br>We've received a request to reset your password.<br>
                <br>If you didn't make the request, just ignore this message. Otherwise, you can reset your password using this link:<br>
                  <br><a href="https://proper-t.herokuapp.com?reset_pass_token=${resetPassToken}">Click here to reset your password (this link includes a token that will expire in 1 hour)</a><br>
                  <br>Thanks,
                  <br>The ProperT Team
            </p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send('Error sending reset email');
        res.status(200).send('Email sent: ' + info.response);
      }
    );
  });
});

module.exports = router;

import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { verifyJWT_MW } from '../middleware';
import { createJWToken } from '../libs/auth.js';

const router = express.Router();

router.use(bodyParser.json());

router.all('*', verifyJWT_MW);

router.get('/', (req, res) => {
  const userID = req.user._doc._id;
  User.findById(userID, function (err, user) {
    if (err) return res.status(500).send('There was a problem finding the user info');
    res.status(200).send(user);
  });
});

router.put('/put', (req, res) => {
  const userID = req.user._doc._id;
  const { currentPassword, newPassword, resetPassword } = req.body;
  const data = resetPassword ? { password: bcrypt.hashSync(resetPassword, 8)} : req.body;
  const verifyPassword = currentPassword ? bcrypt.compareSync(currentPassword, req.user._doc.password) : null;
  const userChanges = verifyPassword ? { password: bcrypt.hashSync(newPassword, 8) } : data;
  if (verifyPassword === false) return res.status(401).send('Current password is invalid');
  if (verifyPassword !== false) {
    User.findOneAndUpdate({ _id: userID }, { $set: userChanges }, {new: true}, function (err, changes) {
      if (err) return res.status(500).send('There was a problem saving user changes');
      res.status(200).send({ token: createJWToken({ sessionData: changes }) });
    });
  }
});

module.exports = router;

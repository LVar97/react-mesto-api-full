const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUserId, patchUser, patchAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', getUserId);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(10),
  }),
}), patchAvatar);

module.exports = router;

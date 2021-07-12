const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard, getCards, deleteCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }).unknown(true),
}), createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardsId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardsId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // валидируем заголовки
  }).unknown(true),
}), deleteCardId);
router.put('/cards/likes/:cardsId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardsId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
router.delete('/cards/likes/:cardsId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardsId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;

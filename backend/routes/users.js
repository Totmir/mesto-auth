const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const {
  getUsers,
  getUser,
  setCurrentUser,
  setUserAvatar,
  getCurrentUser,
  logout
} = require("../controllers/users");

const isUrlRegexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

router.patch("/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), setCurrentUser);
router.patch("/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(isUrlRegexp),
  }),
}), setUserAvatar);
router.get("/me", getCurrentUser);
router.get("/", getUsers);
router.get("/:id", celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
}), getUser);
router.delete("/me", logout);

module.exports = router;

const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authController = require('../controllers/authController');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // limite de 10 tentativas por IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).render('login', {
      error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
    });
  }
});

router.get('/login', authController.showLoginForm);
router.post('/login', loginLimiter, authController.login);
router.post('/logout', authController.logout);

module.exports = router;

const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const app = express();
const game = {};

const registerChoice = (game) => (req, res, next) => {
  const { sessionId: playerId } = req.cookies;
  game[playerId] = req.body.choice;
  res.end();
};

const registerUser = (req, res, next) => {
  req.session.name = req.body.name;
  console.log(req.session);
  res.redirect('/');
};

const serveRegisterPage = (req, res, next) => {
  const name = req.session.name;
  console.log(req.session.name);
  if (name) {
    next();
    return;
  }
  res.sendFile('/registerPage.html', { root: process.cwd().concat('/public') });
};

app.use(morgan(':method :url :status'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'sessionId',
  keys: ['water']
}));
app.post('/register', registerUser);
app.use('/', serveRegisterPage);
app.post('/game', registerChoice(game));
app.use(express.static('public'));

app.listen(80, () => console.log('server started listening on port 80'));
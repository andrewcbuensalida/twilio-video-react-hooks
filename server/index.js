const config = require('./config');
const express = require('express');
const cors = require('cors')
const { videoToken } = require('./tokens');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

//not sure I need a get and a post that does the same thing. just one uses query strings, and the other uses req.body
app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});
app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

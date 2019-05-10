var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  });
});

router.post('/api/login', (req, res) => {
  //Mock user
  const user = {
    id: 07,
    username: 'Sasikant',
    email: 'onlyjax@gmail.com'
  };

  jwt.sign({user: user}, 'my_secret_key', (err, token) => {
    res.json({
      token: token
    });
  });
});


router.post('/api/protected', verifyToken, (req, res) => {
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        text: 'this is protected',
        data: data
      });
    }
  });
});

//Verify Token
function verifyToken(req, res, next) {
  //Get Auth Header value
  const bearerHeader = req.headers['authorization'];
  //Check if the Bearer is Undefined
  if(typeof bearerHeader !== 'undefined') {
    //split at the space
    const bearer = bearerHeader.split(' ');
    //get Token from array
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    //next middleware
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}


module.exports = router;

const axios = require('axios');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  app.post('/api/register', (req, res) => {
    let user = new UserModel(req.body);
    user.save();
    res.json({success: true, message: 'Create user successful'});
  })

  app.post('/api/login', (req, res) => {
    let user = UserModel.findOne({email: req.body.email}).then(user => {
      if (!user) return res.json({success: false, message: 'no such user'});
      // test a matching password
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) return res.json({success: false, message: 'password mismatch'});
        return res.json({success: true});
      });
    })
  })

  app.post('/setUserPersonality', (req, res) => {
    const username = req.body.username;
    const personalityLabel = req.body.catpersonality;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.email;
    var doc = new UserModel({
      username: username,
      catpersonality: personalityLabel,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    doc.save(function (err, doc) {
      if (err) return console.error(err);
      console.log('Document inserted successfully!');
    });
    res.json({ status: 'success' });
  });

  app.get('/api/getPets', async (req, res) => {
    const clientId = process.env.PET_FINDER_KEY;
    const clientSecret = process.env.PET_FINDER_SECRET;
    if (!clientId || !clientSecret) {
      console.log('Please specify PET_FINDER_KEY and PET_FINDER_SECRET environment variables')
      return res.json({
        animals: [],
        status: 'missing api credentials',
      })
    }
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://api.petfinder.com/v2/oauth2/token',
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    });
    const petResults = await axios.get(
      'https://api.petfinder.com/v2/animals?type=cat;location=66215;',
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      }
    );
    return res.json(petResults.data);
  })

  app.get('/', (req, res) => {
    res.sendFile('./client/build/index.html', { root: '.' })
  })

  return app
}
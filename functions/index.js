const functions = require('firebase-functions')
const data = require('./netflix-titles.json')

exports.getNetflixTitles = functions
  .region('europe-west1')
  .https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    response.send(data)
  })

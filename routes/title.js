const express =  require('express');
const router = express.Router();
const async = require('async');

const https = require('https');
const utilities = require('../utils/utils');

router.get('/' ,async (req,res) => {

  // Using Simple CallBacks

  // var addresses = typeof req.query.address === "string" ? [req.query.address] : req.query.address;
  // if (!addresses) {
  //   return response.send('Give the address in URL to get the result')
  // }
  // var titlesOfUrls = []
  // const urls = utilities.getCorrectUrls(addresses);
  // let urlsLength = urls.length;
  // urls.forEach((url, i) => {
  //   utilities.fetchRequest(url, addresses[i], (title) => {
  //     titlesOfUrls.push(title)
  //     setView(titlesOfUrls , () => { return; })
  //   })
  // })
  // function setView(titlesOfUrls , callback) {
  //   if (titlesOfUrls.length === urlsLength) {
  //     callback(res.render('index', {titlesOfUrls}));
  //   }
  // }

  // End Call Back implementation



  // Using Promises 

    // var addresses = typeof req.query.address === "string" ? [req.query.address] : req.query.address;
    // if (!addresses) {
    //   return response.send('Give the address in URL to get the result')
    // }
    // const urls = utilities.getCorrectUrls(addresses);

    // Promise.all(urls.map((url,i) =>
    //   utilities.getPromiseData(url, addresses[i])
    // )).then(titlesOfUrls => {
    //   res.render('index', { titlesOfUrls });
    // })
    //   .catch((error) => {
    //     console.log('error: ', error);
    //   })

  // End of Promise implementation


  // Using control flow library Async.js

  var addresses = typeof req.query.address === "string" ? [req.query.address] : req.query.address;
    if (!addresses) {
      return response.send('Give the address in URL to get the result')
    }
    const urls = utilities.getCorrectUrls(addresses);
    console.log(addresses);
    async.map(urls , async (url,index) => utilities.getPromiseData(url,addresses[index]), (err, titlesOfUrls) => {
      if (err) throw err;
      console.log(titlesOfUrls);
      res.render('index', { titlesOfUrls })
    })



});
module.exports = router;
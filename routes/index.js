var express = require('express');
var router = express.Router();
const mongo = require('../bin/mongo') ;

/* GET home page. */
router.get('/', function(req, res, next) {
  mongo.getInstance().collection('contacts').count((err, nbContact) => {
    mongo.getInstance().collection('contacts').find().sort({addedDate: -1}).limit(3).toArray((err, contacts) => {
      res.render('index', { title: 'Annuaire', contacts : contacts, nbContact : nbContact});
    })
  })
});


//ADD CONTACT
router.post('/', (req, res) => {
  // verifier les données reçues en post
  console.log(req.body);
  if(req.body.firstname){
    mongo.getInstance().collection('contacts').insertOne(
    { 
      "firstname" : req.body.firstname,
      "lastname" : req.body.lastname,
      "description" : req.body.description,
      "avatar": req.body.avatar,
      "mail" : req.body.mail,
      "mail2" : req.body.mail2,
      "telephone" : req.body.telephone,
      "telephone2" : req.body.telephone2,
      "addedDate" : new Date()
    }, (err, user) => {
      if (err) throw err;
      mongo.getInstance().collection('contacts').count((err, nbContact) => {
        mongo.getInstance().collection('contacts').find().sort({addedDate: -1}).limit(3).toArray((err, contacts) => {
      res.render('index',{ title: 'Annuaire',  contacts : contacts, nbContact : nbContact, message: "contact ajouté" });
    })
  })
    })
  }else{
    res.render('index',{ title: 'Annuaire', message: "une erreur est survenue" });
  }
})

module.exports = router;
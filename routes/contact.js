var express = require('express');
var router = express.Router();
var mongo = require('../bin/mongo');
const ObjectID = require('mongodb').ObjectID;

//GET ALL CONTACTS
router.get('/', function(req, res, next) {
    mongo.getInstance().collection('contacts').find().sort({'firstname': 1}).toArray((err, contacts) => {
      res.render('contacts', { title: 'Annuaire', contacts : contacts});
  })
});


//GET ONE BY ID
router.get('/:id', function(req, res, next) {
    mongo.getInstance().collection('contacts').findOne({_id: ObjectID(req.params.id)},
    (err, contact) => {
        res.render('detailedContact', { title: 'Annuaire', contact : contact});
    })
  });


//DELETE
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    mongo.getInstance().collection('contacts').findOne({ _id: ObjectID(req.params.id) },
      (err) => {
        if (err) throw err;
  
        mongo.getInstance().collection('contacts').deleteOne({ _id: ObjectID(req.params.id) });
        res.send({ ok: true});
      });
  });
  

//UPDATE
router.put('/:id', (req, res) => {
    console.log(req.body)
    let datas = Object.assign({}, req.body);
    if (datas.firstname) {
    mongo.getInstance().collection('contacts').update({ _id: ObjectID(req.params.id) },
      { $set: datas }, (err) => {
        if (err) throw err;
        res.send({ ok: true });
      });
    }
  })

module.exports = router;
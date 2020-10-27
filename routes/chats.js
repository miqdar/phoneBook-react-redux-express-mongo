var express = require('express');
var router = express.Router();
const Chat = require('../models/chat')


router.get('/', function (req, res, next) {
  // Chat.find({}).limit(limit).skip(offset).then((data) => {
  let url = req.url == '/' ? '/?page=1' : req.url;
  let page = req.query.page || 1
  let start = page * 3 - 3
  let limit = 3
  let offset = (page - 1) * limit
  Chat.countDocuments({}, (err, pages) => {
    pages = Math.ceil(pages / limit)
    Chat.find({}).sort({ 'id': -1 }).limit(limit).skip(offset).then((data) => {    // sort yg terbaru diatas
      data.push({ pages, page })
      res.status(200).json(data)
    }).catch((err) => {
      res.status(500).json(err)
    })
  })

});

router.get('/:author/:message', function (req, res, next) {
  let url = req.url == '/' ? '/?page=1' : req.url;

  let page = req.query.page || 1
  let start = page * 3 - 3
  let limit = 3
  let offset = (page - 1) * limit
  Chat.countDocuments({}, (err, pages) => {
    pages = Math.ceil(pages / limit)
    Chat.find({ $or: [{ author: req.params.author }, { message: req.params.message }] }).then((data) => {
      data.push({ pages, page })
      res.status(200).json(data)
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
});

router.post('/', function (req, res, next) {
  Chat.create({ id: Number(req.body.id), author: req.body.author, message: req.body.message }).then((data) => {
    res.status(200).json(data)
  }).catch((err) => {
    res.status(500).json(err)
    console.log(err)
  })
});

router.put('/:id', function (req, res, next) {
  Chat.findOneAndUpdate({ id: req.params.id }, { author: req.body.author, message: req.body.message }, { new: true }).then((data) => {
    res.status(201).json(data)
  }).catch((err) => {
    res.status(500).json(err)
    console.log(err)
  })
});

router.delete('/:id', function (req, res, next) {
  Chat.findOneAndRemove({ id: req.params.id }).then((data) => {
    res.status(201).json(data)
  }).catch((err) => {
    res.status(500).json(err)
    console.log(err)
  })
});

module.exports = router;

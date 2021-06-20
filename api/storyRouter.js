const express = require('express');
const router = express.Router();

const { getDataForNodeId, createChildForNodeId } = require('../resolver/story');

//redirect to start of story
router.get('/', (req, res, next) => {
  res.redirect('/story/0')
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const resObj = getDataForNodeId(id);

  if (resObj) {
    res.status(200).render('story', {
      resObj: resObj
    });
  } else {
    res.status(204).json({
      error: {
        message: 'Story id not found'
      }
    })
  }
});

router.post('/', (req, res, next) => {
  const resObj = createChildForNodeId(req.body);
  if (resObj.error) {
    res.status(400).json(resObj);
  } else {
    res.status(201).render('story', {
      resObj: resObj
    });
  }
});

module.exports = router;
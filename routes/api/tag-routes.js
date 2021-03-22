const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
      model: Tag,
      attributes: [
        'rock music',
        'pop music',
        'blue',
        'red',
        'green',
        'white',
        'gold',
        'pop culture'
      ]
      }
    ]
  })
  .then((dbTagData) => res.status(200).json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
})
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    
    include: [
      {
        attributes: [
       'rock music',
        'pop music',
        'blue',
        'red',
        'green',
        'white',
        'gold',
        'pop culture'
        ],
        model: Tag,
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
    
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
})
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.params.id
    }
  }
)
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
})
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
})
});
module.exports = router;

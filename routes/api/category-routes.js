const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'catagory_id'
      ]
      }
    ]
  })
  .then((dbCategoryData) => res.status(200).json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    
    include: [
      {
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'catagory_id'
        ],
        model: Product,
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No catagory found' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    catagory_name: req.body.catagory_name,
    
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
})
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id
    }
  }
)
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No catagory found' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
})
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No catagory found' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
})
});

module.exports = router;

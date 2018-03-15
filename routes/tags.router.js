'use strict';

const express = require('express');

const knex = require('../knex');

const router = express.Router();

router.get('/tags', (req, res, next) => {
    knex.select('id', 'name')
        .from('tags')
        .then(results => {
            res.json(results);
        })
        .catch(err => next(err));
});



router.get('/tags/:id', (req, res, next) => {
    const tagsId = req.params.id

    knex.select('id', 'name')
        .from('tags')
        .where({ id: tagsId })
        .then(result => {
            console.log(result);
            if (result) {
                res.json(result);
            } else {
                next();
            }
        })
        .catch(err => next(err));
});

router.post('/tags', (req, res, next) => {
    const { name } = req.body;
  
    /***** Never trust users. Validate input *****/
    if (!name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }
  
    const newItem = { name };
  
    knex.insert(newItem)
      .into('tags')
      .returning(['id', 'name'])
      .then((results) => {
        // Uses Array index solution to get first item in results array
        const result = results[0];
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => next(err));
  });

  router.put('/tags/:id', (req, res, next) => {
    const tagsId = req.params.id;
    const updateObj = {};
    const updateableFields = ['name'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            updateObj[field] = req.body[field];
        }
    });

    if (!updateObj.name) {
        const err = new Error('Missing `name` in request body');
        err.status = 400;
        return next(err);
    }

    knex('tags')
        .where({ id: tagsId })
        .update({
            name: updateObj.name
        })
        .returning(['id', 'name'])
        .then(item => {
            if (item) {
                res.json(item);
            } else {
                next();
            }
        })
        .catch(err => next(err));
});

router.delete('/tags/:id', (req, res, next) => {
    const id = req.params.id;
    knex('tags')
      .where({id})
      .del()
      .then(count => {
        if (count) {
          res.status(204).end();
        } else {
          next();
        }
      })
      .catch(err => next(err));
  });

module.exports = router;
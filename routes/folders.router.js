'use strict';

const express = require('express');

const knex = require('../knex');

const router = express.Router();



router.get('/folders', (req, res, next) => {
    knex.select('id', 'name')
        .from('folders')
        .then(results => {
            res.json(results);
        })
        .catch(err => next(err));
});



router.get('/folders/:id', (req, res, next) => {
    const folderId = req.params.id

    knex.select('id', 'name')
        .from('folders')
        .where({ id: folderId })
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



router.put('/folders/:id', (req, res, next) => {
    const folderId = req.params.id;
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

    knex('folders')
        .where({ id: folderId })
        .update({
            name: updateObj.name
        })
        .then(item => {
            if (item) {
                res.json(item);
            } else {
                next();
            }
        })
        .catch(err => next(err));
});



router.post('/folders', (req, res, next) => {
    const { name } = req.body;
    const newFolder = { name };

    if (!newFolder.name) {
        const err = new Error('Missing `name` in request body');
        err.status = 400;
        return next(err);
    }

    knex('folders')
        .insert({
            name: newFolder.name
        })
        .then(item => {
            if (item) {
                res.location(`http://${req.headers.host}/folders/${item.id}`).status(201).json(item);
            }
        })
        .catch(err => next(err));
});



router.delete('/folders/:id', (req, res, next) => {
    const id = req.params.id;
    knex('folders')
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

module.exports = router
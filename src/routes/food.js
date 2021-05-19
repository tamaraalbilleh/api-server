'use strict';
const express = require ('express');
const DataCollector = require ( '../models/data-collection-class.js');
const foodModel = require ('../models/food.js');
const dataCol = new DataCollector (foodModel);

//
// from lab 03 
// const food = new Food ();
//

const router = express.Router();

router.post ('/', foodAddHandler);
router.get ('/', foodReadAllHandler);
router.get ('/:id', foodReadOneHandler);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

async function foodAddHandler (req,res ,next){

  try {
    const foodObj = req.body;
    const resObj = await dataCol.create(foodObj);
    res.status(201).json(resObj);
  } catch (error) {
    next (error);
  }

}

async function foodReadAllHandler (req,res , next){

  try {
    let foodObject = await dataCol.read ();
    res.json (foodObject);
  } catch (error) {
    next (error);
  }
  
}

async function foodReadOneHandler (req,res , next){

  try {
    const foodObject = await dataCol.read(req.params.id);
    res.json(foodObject);
  } catch (error) {
    next ( error);
  }
  
}

async function deleteFood(req, res , next ) {
  
  try {
    const foodObject = await dataCol.delete(req.params.id);
    res.json(foodObject);
  } catch (error) {
    next (error);
  }
  
}

async function updateFood(req, res, next) {
  
  try {
    const foodObj = req.body;
    const foodObject = await dataCol.update(req.params.id, foodObj);
    res.json(foodObject);
  } catch (error) {
    next (error);
  }
  
}

module.exports = router;
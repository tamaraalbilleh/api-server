'use strict';
const express = require ('express');
const DataCollector = require ( '../models/data-collection-class.js');
const clothesModel = require ('../models/clothes.js');
const dataCol= new DataCollector (clothesModel);

//
// from lab 03 
// const clothes = new Clothes ();
//
const router = express.Router();

router.post ('/', clothesAddHandler);
router.get ('/', clothesReadAllHandler);
router.get ('/:id', clothesReadOneHandler);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);


async function clothesAddHandler (req,res,next){

  try {
    const clothesObject = req.body;
    const responseObject =await dataCol.create(clothesObject);
    res.status(201).json (responseObject);
  } catch (error) {
    next (error);
  }
  

}

async function clothesReadAllHandler (req,res ,next ){

  try {
    let clothesObject = await dataCol.read ();
    res.json (clothesObject);
  } catch (error) {
    next (error);
  }

}

async function clothesReadOneHandler (req,res , next){

  try {
    const clothesObject = await dataCol.read(req.params.id);
    res.json(clothesObject);
  } catch (error) {
    next (error);
  }
  
}

async function deleteClothes(req, res , next) {

  try {
    const clothesObject =await dataCol.delete(req.params.id);
    res.json(clothesObject);
  } catch (error) {
    next (error);
  }
 
}

async function updateClothes(req, res , next) {

  try {
    const clothesObj = req.body;
    const clothesObject = await dataCol.update(req.params.id, clothesObj);
    res.json(clothesObject);
  } catch (error) {
    next (error);
  }
  
}

module.exports = router;
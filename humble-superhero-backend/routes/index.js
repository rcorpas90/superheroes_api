var express = require('express');
var router = express.Router();
var superheroes=require("../models/superheroes.js");


router.get('/superheroes', async (req, res, next)=> {
  try {
    let heroes=await superheroes.getSuperHeroes();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({message:error});
  }  
});

router.post('/superheroes', async (req, res, next)=> {
  try {
    await superheroes.addSuperHero(req.body);
    res.status(200).json({success:true});
  } catch (error) {
    res.status(500).json({message:error});
  }  
});

module.exports = router;

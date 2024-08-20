const express = require('express');
const otherPage = require('../controllers/otherPageController');
const { pageAuth, checkUser } = require('../middleware/authmiddleware');
const path = require('path');
const multer = require('multer');
const Movie = require('../models/movies')

const router = express.Router();

router.get('*', checkUser);

  

router.get('/', otherPage.home_get);

router.get('/movie', otherPage.movie_get);

router.get('/animation', otherPage.animation_get);

router.get('/series', otherPage.series_get); 

router.get('/profile-Update', pageAuth, otherPage.profileUpdate_get);

router.get('/pic-upload', pageAuth, otherPage.picUpload_get);

router.post('/pic-upload', otherPage.picUpload_post);

router.post('/profileUpdate', pageAuth, otherPage.profileUpdate_post);

router.post('/movie-search', otherPage.movieSearch_post);

router.get('/:id', otherPage.id); 


module.exports = router;
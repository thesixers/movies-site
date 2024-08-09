const express = require('express');
const otherPage = require('../controllers/otherPageController');
const { pageAuth, checkUser } = require('../middleware/authmiddleware');
const path = require('path');
const multer = require('multer');
const Movie = require('../models/movies')

const router = express.Router();

router.get('*', checkUser);

  

router.get('/', pageAuth, otherPage.home_get);

router.get('/movie', pageAuth, otherPage.movie_get);

router.get('/animation', pageAuth, otherPage.animation_get);

router.get('/series', pageAuth, otherPage.series_get); 

router.get('/profile-Update', pageAuth, otherPage.profileUpdate_get);

router.get('/pic-upload', pageAuth, otherPage.picUpload_get);

router.post('/pic-upload', otherPage.picUpload_post);

router.post('/profileUpdate', pageAuth, otherPage.profileUpdate_post);

router.post('/movie-search', otherPage.movieSearch_post);

router.get('/:id', pageAuth, otherPage.id); 


module.exports = router;
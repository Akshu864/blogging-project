const express = require('express')
const router = express.Router();
const authorController=require("../controller/authorController");
const blogController=require("../controller/blogController");
const blogModel = require('../models/blogModel');





router.get('/get' , blogController.getblog)
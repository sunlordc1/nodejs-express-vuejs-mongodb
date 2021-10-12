const express = require('express'); // khai báo framework
var router = express.Router()
router.get('/',(req,res)=>{
    res.json('router 1 user');
})
router.get('/product',(req,res)=>{
    res.json('product');
})
// Truyền param id vào method get
router.get('/product/:id',(req,res)=>{
    res.json('product' + req.params.id);
})

module.exports =  router;
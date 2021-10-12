const express = require('express'); // khai báo framework

const app = express() 
const port = process.env.PORT || 3000; // Trong máy tính có rất nhiều cổng cho các chương trình chạy, thường thì 1-1000 thì các cổng đã được máy tính sử dụng r chú ý đặt cổng lớn hơn 1000
var router = express.Router()

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

router.get('/',(req,res)=>{
    res.send('router 1 user GET')
})
router.post('/',(req,res)=>{
    res.json('router 1 user POST')
})
router.post('/:id',(req,res)=>{
    res.json('router 1 user POST'+req.id)
})
router.put('/',(req,res)=>{
    res.json('router 1 user PUT')
})
router.delete('/',(req,res)=>{
    res.json('router 1 user Delete')
})
app.use('/',router)//
app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})

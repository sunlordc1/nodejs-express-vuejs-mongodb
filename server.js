const express = require('express'); // khai báo framework
const app = express() 
const port = process.env.PORT || 3000; // Trong máy tính có rất nhiều cổng cho các chương trình chạy, thường thì 1-1000 thì các cổng đã được máy tính sử dụng r chú ý đặt cổng lớn hơn 1000

var product = require('./api/product.js')
// Response a JSON by method GET in app
// app.get('/',(req,res)=>{
//     // res.send('Hello world')
//     res.json('Home')
// })

//MIDDLEWARE
//Middleware nào được use trước thì bắt buộc phải pass middleware đó mới đi tiếp được
app.use((req,res,next)=>{
    console.log('middle first time')
    next()
})
// Viết 1 middleware
var dangnhap = 1
var checkLogin = (req,res,next)=>{
    console.log('md1')
    if(dangnhap){
        next()
    }else{
        res.json('Bạn chưa đăng nhập')
    }
};
// Thêm middleware vào trực tiếp hoặc gián tiếp
app.get('/',checkLogin,(req,res,next)=>{
    console.log('md2')
    next()
},(req,res,next)=>{
    console.log('md3')
    res.json('hello im pass middleware')
})


//----
app.use('/api/v1/',product)//Liên quan tới việc chỉnh sửa cấu hình sử dụng use
app.use('/admin/api/v1/',product)//
app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
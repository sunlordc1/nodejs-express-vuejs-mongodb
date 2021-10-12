const express = require('express'); // khai báo framework

const app = express() 
const port = process.env.PORT || 3000; // Trong máy tính có rất nhiều cổng cho các chương trình chạy, thường thì 1-1000 thì các cổng đã được máy tính sử dụng r chú ý đặt cổng lớn hơn 1000
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const AccountModel = require('./models/account')
var accountRouter = require('./api_v1/account')
app.post('/register',(req,res,next)=>{
    let  username = req.body.username;
    let  password = req.body.password;
    // console.log(req.body)
    AccountModel.findOne({
        username:username
    })
    .then(data=>{
        if(data){
            res.json({error:true,message:'User đã tồn tại'})
        }else{
            return AccountModel.create({
                username:username,
                password:password
            })
        }
    })
    .then(data=>{ //return bởi AccountModel then tại đây
            res.json({error:false,message:'Tạo tài khoản thành công'})
    })
    .catch(err=>{
        res.status(500).json({error:true,message:'Tạo tài khoản thất bại'})
    })
})

app.post('/login',(req,res,next)=>{
    let  username = req.body.username;
    let  password = req.body.password;

    AccountModel.findOne({
        username:username,
        password:password
    })
    .then(data=>{
        if(data){
            res.json({error:false,message:'Đăng nhập thành công'})
        }else{
            res.status(500).json({error:true,message:'Đăng nhập thất bại vui lòng kiểm tra lại thông tin đăng nhập'})
        }

    })
    .catch(err=>{
        res.status(500).json({error:true,message:'Đăng nhập thất bại vui lòng kiểm tra lại thông tin đăng nhập'})
    })
})
app.use('/api/account/',accountRouter)//

































app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})

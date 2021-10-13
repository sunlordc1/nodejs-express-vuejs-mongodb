const express = require('express'); // khai báo framework

const app = express() 
const port = process.env.PORT || 3000; // Trong máy tính có rất nhiều cổng cho các chương trình chạy, thường thì 1-1000 thì các cổng đã được máy tính sử dụng r chú ý đặt cổng lớn hơn 1000
const path= require('path')


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
app.get('/fakeAccount',(req,res,next)=>{
    let  username = req.body.username;
    let  password = req.body.password;

   for (let i = 0 ;i < 20;i++){
    AccountModel.create({
        username:username,
        password:password
    })
   }
   res.json('ok')
})
const PAGE_SIZE = 4; // Số lượng tối đa lấy được
app.get('/user',(req,res,next)=>{
    let page = req.query.page;
    if(page){
        //get page
        page = parseInt(page);
        page<1?page = 1:page=page
     
        let skip = (page - 1)*PAGE_SIZE  // số lượng bỏ qua
        AccountModel.find({})
        .skip(skip)
        .limit(PAGE_SIZE) 
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json({error:true,message:'Cos loi'})

        })
    }else{
        //get all
        AccountModel.find({})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json({error:true,message:'Tạo tài khoản thất bại'})
        })
    }
   
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
//Chỉ folder nào được add static mới được công khai
app.use('/public',express.static(path.join(__dirname,'/public'))) // folder này được công khai
app.get('/',(req,res)=>{
    // Khi chỉ khi server cho phép trả về thì lập tức client mới xem được,còn ngược lại sẽ được server ẩn giấu đi
    // Muốn làm được điều đó thì server cần phải public ra đường dẫn trong file ( ví dụ ./style.css)
    
    let duongDanFile = path.join(__dirname,'home.html');
    res.sendFile(duongDanFile)
})

app.use('/api/account/',accountRouter)//
































app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})

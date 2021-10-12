const express = require('express');
var router = express.Router();
const AccountModel = require('../models/account')
// Chuẩm resful là gì

//Get lấy dữ liệu từ database
router.get('/',(req,res,next)=>{
    AccountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({error:true,message:'Lỗi server'})
    })
})
//Post thêm mới dữ liệu từ DB

router.post('/',(req,res,next)=>{
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
//Put thêm mới dữ liệu từ DB

router.put('/:id',(req,res,next)=>{
    let id = req.params.id;
    let  newPassword = req.body.password;
    AccountModel.findByIdAndUpdate(id,{
        password:newPassword
    })
    .then(data=>{
        res.json({error:false,message:'Cập nhật thành công'})
    })
    .catch(err=>{
        res.status(500).json({error:true,message:'Cập nhật thất bại'})
    })
})
//Xóa thêm mới dữ liệu từ DB
router.delete('/:id',(req,res,next)=>{
    let id = req.params.id;
    console.log(id)
    AccountModel.findByIdAndDelete(id)
    .then(data=>{
        res.json({error:false,message:'Xóa thành công'})

    })
    .catch(err=>{
        res.status(500).json({error:true,message:'Xóa thất bại thất bại'})
    })
})

module.exports = router ;
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/club_manager',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// Schema như 1 khung xương, khung nhà
const Schema = mongoose.Schema;

const user = new Schema({
    user_name:String,
    password:String,
    avatar:String,
},{collection:'Users'})

const UserModel = mongoose.model('user',user);

//Object trong find document chứa query cần tìm, nếu object search trống thì sẽ là tìm tất
UserModel.find({})
.then(function(data){
    console.log('data',data)
})
.catch(function(err){
    console.log('loi',err)

})

//Tìm theo kiểu có operator
// Person.
//   find({
//     occupation: /host/,
//     'name.last': 'Ghost',
//     age: { $gt: 17, $lt: 66 }, (greater than = $gt - less than ....)
//     likes: { $in: ['vaporizing', 'talking'] }
//   }).
//   limit(10).
//   sort({ occupation: -1 }).
//   select({ name: 1, occupation: 1 }).
//   exec(callback);
//https://mongoosejs.com/docs/queries.html 
// Create documents


UserModel.create({
    user_name:'loc',
    password:'8888',
    phone:12345467
})
.then(function(data){
    // Update documents update(Giá trị tìm kiếm, giá trị thay đổi) -- để trong resolve của promise tạo user để thay đổi giá trị khí bất đồng bộ tạo user được gọi thành công
    UserModel.updateMany({user_name:'loc'},{password:'98731231'})
    .then(function(data){
        console.log(data)
    })
    .catch((err)=>{
        console.log('loi',err)
    })
    
})
.catch((err)=>{
    console.log('loi',err)
})




const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/club_manager',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// Schema như 1 khung xương, khung nhà
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    user_name:String,
    password:String,
    age:Number,
    salary:Number,
    course:{
        type:String,
        ref:'Course'
    }
},{
    collection:'Account'
})

const CourseSchema = new Schema({
    name:String,
    teacher:String,
    lesson:[],
    salary:{}
},{
    collection:'Course'
})


const AccountModel = mongoose.model('Account',AccountSchema);
const CourseModel = mongoose.model('Course',CourseSchema);

AccountModel.find({
    username:'student1'
})
.populate('Course')
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})

// Multiple populate :
AccountModel.find({
    username:'student1'
})
.populate('Course')
.populate({
    path:'Course',
    populate:{path:'teacher'}
})
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})
//Populate in a object
AccountModel.find({
    username:'student1'
})
.populate('list_course.Course')
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})
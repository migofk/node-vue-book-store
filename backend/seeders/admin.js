const User = require('../models/user')
const bcrypt = require("bcrypt");
exports.superAdmin = async ()=>{
    try{
    let password = await  bcrypt.hash('admin@1234', 10);
    let admin = await User.findOne({email:'admin@admin.com'})
    if(!admin){
    User.create({
        first_name:'super',
        last_name:'admin',
        email:'admin@admin.com',
        password: password,
        role:'super-admin'
    })}
   }catch(error){
    console.log(error)
   }
}
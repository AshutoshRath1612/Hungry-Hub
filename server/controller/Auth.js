const Users = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Vendors = require('../model/Vendors')
const Otp = require('../model/Otp')


const StudentRegister = async(req,res) =>{
    try{
        const salt  = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        const newStudent = new Users({
            regdNo:  req.body.regdNo,
            password: hash,
            mobileNo: req.body.mobileNo,
        })
        await newStudent.save()
        res.status(200).json(newStudent);
    }
    catch(err){
        console.log(err)
    }
}

const VendorRegister = async(req, res) => {
    try{
        const salt  = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        let uniqueId = generateUniqueId()
        let isUnique = await Vendors.findOne({uniqueId: uniqueId})
        while(isUnique !=null){
            uniqueId = generateUniqueId()
            isUnique = await Vendors.findOne({uniqueId: uniqueId})
        }
        const vendor = new Vendors({
            username: req.body.username,
            password: hash,
            uniqueId: uniqueId,
            mobileNumber: req.body.mobileNumber,
            shopName: req.body.shopName
        });
        await vendor.save()
        res.status(200).send(vendor)
    }
    catch(err){
        console.log(err)
    }
};

const Login = async(req,res) =>{
    console.log(req.body)
    try{
        const vendor = await Vendors.findOne({uniqueId:req.body.uniqueId})
        const student = await Users.findOne({regdNo:req.body.uniqueId});
        const user = student != null ? student : vendor;
        if(!user){
            return res.status(404).send("User Not Found!")
        }
        else{
            const isCorrectPass = await bcrypt.compare(req.body.password , user.password)
            if (!isCorrectPass) {
                return res.status(401).send("Invalid Password!")
        }
        try{
        const token = jwt.sign({id:user._id, uid:req.body.uniqueid},process.env.JWT)
        const {password , ...others} = user._doc;
        res.status(200).json({token, ...others})
        }
        catch(err){
            console.log(err)
        }
    }
}catch(err){
        console.log(err)
    }
}

const verifyToken = (req,res)=>{
    const {token} = req.body;
    try{
        const decoded = jwt.verify(token , process.env.JWT)
        res.status(200).json(decoded.regdNo)
    }
    catch(err){
        res.status(401).send('Invalid Token')
    }
}

const generateUniqueId = () =>{
    let id = ''
    for (let i=0;i<6;i++){
        id += Math.floor(Math.random()*9)
    }
    return id;
}

const OTPGenerate  = async(req,res) => {
    const phone = req.body.mobileNo
    const otp = Math.floor(100000 + Math.random()*900000)
    await Otp.deleteOne({phone: phone})
    const newOtp = new Otp({ phone, otp });
    await newOtp.save();
    res.status(200).send({ success: true, message: 'OTP sent successfully' });
}

const OTPVerify = async(req,res) => {
    const { mobileNo, otp } = req.body;
    console.log(req.body);
    const existingOtp = await Otp.findOne({ phone:mobileNo, otp });
    if (existingOtp) {
       await Otp.deleteOne({ phone:mobileNo, otp })
      res.send({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).send({ success: false, message: 'Invalid OTP' });
    }
}

const StudentUnique = async(req,res)=>{
    const {regdNo , mobileNo} = req.params;
    const student = await Users.findOne({regdNo:regdNo, mobileNo:mobileNo})
    const studentRegd  =await Users.findOne({regdNo:regdNo})
    const studentMobile = await Users.findOne({mobileNo:mobileNo})
    if(student || studentRegd || studentMobile){
        res.status(400).send("User Already Exists")
    }
    else{
    res.status(200).send("Success")
    }
}

const VendorUnique = (req,res)=>{

}

module.exports = {StudentRegister,VendorRegister,
    Login,verifyToken,
    OTPGenerate,OTPVerify,
    StudentUnique,VendorUnique}
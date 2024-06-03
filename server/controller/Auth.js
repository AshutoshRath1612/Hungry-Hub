const Users = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Vendors = require('../model/Vendors')
const Otp = require('../model/Otp')
const Shop = require('../model/Shop')
const Payment  = require('../model/Payment')
const Order = require('../model/Order')

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
        res.status(200).json({message: "User added successfully!"});
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
            mobileNo: req.body.mobileNo,
            shopName: req.body.shopName
        });
        const shop = new Shop({
            name: req.body.shopName
        })
        await vendor.save()
        await shop.save()
        res.status(200).json({uniqueId:uniqueId})
    }
    catch(err){
        console.log(err)
    }
};

const Login = async(req,res) =>{
    try{
        const vendor = await Vendors.findOne({uniqueId:req.body.uniqueId})
        const student = await Users.findOne({regdNo:req.body.uniqueId});
        const user = student != null ? student : vendor;
        if(!user){
            return res.status(404).send({message:"User Not Found!"})
        }
        else{
            const isCorrectPass = await bcrypt.compare(req.body.password , user.password)
            if (!isCorrectPass) {
                return res.status(401).send({message:"Invalid Password!"})
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

     client.messages
  .create({
     body: `Your OTP is ${otp}. Please do not share it with anyone. OTP is valid for 5 minutes.`,
     from: process.env.TWILIO_PHONE_NUMBER,
     to: `+91${phone}`
   })
  .then(message => console.log(message.sid));
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

const VendorUnique = async(req,res)=>{
    const {username , mobileNo} = req.params;
    const vendor = await Vendors.findOne({username:username, mobileNo:mobileNo})
    const vendorUsername  =await Vendors.findOne({username:username})
    const vendorMobile = await Vendors.findOne({mobileNo:mobileNo})
    if(vendor || vendorUsername || vendorMobile){
        console.log(vendor)
        res.status(400).send("User Already Exists")
    }
    else{
    res.status(200).send("Success")
    }
}

const saveToken = async(req,res) => {
    const { userId, expoPushToken,isStudent } = req.body;
  try {
    let user;
    if(isStudent){
      user = await Users.findByIdAndUpdate(userId, { expoPushToken });
    }
    else{
    user =  await Vendors.findByIdAndUpdate(userId , {expoPushToken})
    }
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    console.log(user)
    res.status(200).send('Token saved');
  } catch (error) {
    res.status(500).send('Error saving token');
  }
}

const orderDelivery = async(req,res) => {
    const uniqueCode = req.body.code;
    
    try{
        const paymentData = await Payment.findOne({orderId:uniqueCode.split("|")[0]});
        if(paymentData){
            const order = await Order.findOne({orderId : paymentData.orderId})
            const paymentCode = `${paymentData.orderId}|${paymentData.paymentId}|${paymentData.signature}`
            if(uniqueCode === paymentCode && order.status !== 'Delivered'){
                res.status(200).json({isSuccess: true})
            }
            else{
                if(uniqueCode !== paymentCode){
                    res.status(404).json({message: "Invalid QR Code",isSuccess : false})
                }
                else{
                    res.status(404).json({message: "Order Already Delivered", isSuccess : false})
                }
            }
        }
        else
        res.status(404).json({isSuccess: false})
    }
    catch(err){
       res.status(500).json({message: "Internal Server Error"}) 
    }  
}

module.exports = {StudentRegister,VendorRegister,
    Login,verifyToken,
    OTPGenerate,OTPVerify,
    orderDelivery,
    saveToken,
    StudentUnique,VendorUnique}
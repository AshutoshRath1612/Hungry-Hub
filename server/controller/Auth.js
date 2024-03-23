const Users = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Vendors = require('../model/Vendors')


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


module.exports = {StudentRegister,VendorRegister,Login}
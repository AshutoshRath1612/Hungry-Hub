const Users = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const StudentRegister = async(req,res) =>{
    try{
        console.log(req.body)
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

const StudentLogin = async(req,res) =>{
    try{
        const user = await Users.findOne({regdNo:req.body.regdNo})
        if(!user){
            return res.status(404).send("User Not Found!")
        }
        else{
            const isCorrectPass = await bcrypt.compare(req.body.password , user.password)
            if (!isCorrectPass) {
                return res.status(401).send("Invalid Password!")
        }
        try{
        const token = jwt.sign({id:user._id, regdNo:user.regdNo},process.env.JWT)
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


module.exports = {StudentRegister,StudentLogin}
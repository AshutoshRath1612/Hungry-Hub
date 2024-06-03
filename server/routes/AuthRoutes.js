const express = require('express')
const {StudentRegister,VendorRegister, Login ,OTPGenerate,OTPVerify, StudentUnique , VendorUnique, orderDelivery, saveToken} = require('../controller/Auth')


const router = express.Router()


router.post('/student/register' , StudentRegister)
router.post('/vendor/register',VendorRegister)
router.post('/login' , Login)
router.post('/otp/generate' , OTPGenerate)
router.post('/otp/verify' , OTPVerify)

router.post('/delivery' , orderDelivery);
router.post('/save-token' ,saveToken)

router.get('/unique/student/:regdNo/:mobileNo' , StudentUnique)
router.get('/unique/vendor/:username/:mobileNo' , VendorUnique)

module.exports = router
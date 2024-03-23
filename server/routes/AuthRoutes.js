const express = require('express')
const {StudentRegister, Login, VendorRegister} = require('../controller/Auth')


const router = express.Router()


router.post('/student/register' , StudentRegister)
router.post('/vendor/register',VendorRegister)
router.post('/login' , Login)

module.exports = router
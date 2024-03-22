const express = require('express')
const {StudentRegister, StudentLogin} = require('../controller/Auth')


const router = express.Router()


router.post('/studentregister' , StudentRegister)
router.post('/studentlogin' , StudentLogin)

module.exports = router
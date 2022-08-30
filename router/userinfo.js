const express=require('express')
const router=express.Router()
// 导入验证数据合法性的中间件
const expressJoi=require('@escook/express-joi')
// 导入需要的验证规则
const {update_userinfo_schema,update_password_schema,update_avatar_schema}=require('../schema/user')
const userinfoHandler=require('../router_handler/userinfo')
// 挂载路由
router.get('/userinfo',userinfoHandler.getUserInfo)
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfoHandler.updateUserInfo)
router.post('/updatepwd',expressJoi(update_password_schema),userinfoHandler.updatePassword)
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfoHandler.updateAvatar)
module.exports=router
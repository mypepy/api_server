const express=require('express')
const router=express.Router()
// 导入文章分类的路由处理函数模块
const artcate_handler=require('../router_handler/artcate')
const expressJoi=require('@escook/express-joi')
const {add_cate_schema,delete_cate_schema}=require('../schema/artcate')
// 获取文章分类列表数据
router.get('/cates',artcate_handler.getArticleCates)
// 新增文章分类
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates)
// 删除文章分类
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.deleteCateById)
// 根据id获取文章分类（查询）使用删除验证规则
router.get('/cates/:id',expressJoi(delete_cate_schema),artcate_handler.getArtCateById)
// 根据id修改分类数据 使用新增文章分类验证规则
router.post('/updatecate',expressJoi(add_cate_schema),artcate_handler.updateCateById)
module.exports=router

// 导入express模块
const express = require('express')
// 导入cors中间件
const cors = require('cors')
const joi = require('joi')

// 创建express的服务器实例
const app = express()
// 将cors注册为全局中间件
app.use(cors())
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
// 一定要在路由之前封装res.cc
app.use((req, res, next) => {
    // status默认为1，表示失败
    // err可能是个错误对象，也可能是错误的描述字符串
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 在配置路由之前配置解析Token中间件
const expressJWT=require('express-jwt')
const config=require('./config')
// unless指定哪些接口不需要验证
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息路由模块
const userinfoRouter=require('./router/userinfo')
app.use('/my',userinfoRouter)
// 导入并使用文章分类路由模块
const artCateRouter=require('./router/artcate')
app.use('/my/article',artCateRouter)
// 导入并使用文章路由模块
const articleRouter =require('./router/article')
app.use('/my/article',articleRouter)
// 托管静态资源文件
app.use('/uploads',express.static('../uploads'))
// 定义错误级别中间件
app.use((err, req, res, next) => {
    // 验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败
    if(err.name==='UnauthorizedError') return res.cc('身份验证失败')
    // 未知的错误
    res.cc(err)

})

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(8080, function () {
    console.log('api server running at http://127.0.0.1:8080')
})
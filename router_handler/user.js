// 导入数据库操作模块
const db = require('../db/index')
// 导入bcrybjs
const bcryptjs = require('bcryptjs')
// 导入生成Token包
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config')
// 注册处理函数
exports.regUser = (req, res) => {
    // 获取用户提交到服务器的信息
    const userinfo = req.body
    // 对表单中的数据，进行合法校验
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不合法' })
    // }

    // 定义sql语句，查重用户名
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, [userinfo.username], (err, results) => {
        // 执行SQL语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 判断是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请换一个' })
            return res.cc('用户名被占用，请换一个')
        }
        // 对密码进行加密
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10)
        //  定义插入新用户sql语句
        const sql = 'insert into ev_users set ?'
        // 调用db.query()执行SQL语句
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 判断语句是否执行成功
            // if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册用户成功
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功', 0)
        })
    })

}
// 登录处理函数
exports.login = (req, res) => {
    // 接受表单数据
    const userinfo = req.body
    // 定义sql语句
    const sql = `select * from ev_users where username=?`
    // 执行sql语句
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登陆失败')
        //判断密码是否正确
        const compareResult = bcryptjs.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('密码错误')
        // 在服务器端生成token字符串
        // 剔除密码和头像
        const user = { ...results[0], password: '', user_pic: '' }
        // 对用户信息加密，生成token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn:config.expiresIn })
        // 将token响应给客户端
        res.send({
            status:0,
            message:'登陆成功',
            token:'Bearer '+tokenStr
        })

    })

}
// 导入数据库操作模块
const db = require('../db/index')
// 导入处理路径的path核心模块
const path = require('path')
// 发布新文章
exports.addArticle = (req, res) => {
    //   手动判断是否上传文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('请上传封面')
    // 实现发布文章功能
    const articleInfo = {
        // 标题，内容，状态，所属分类id
        ...req.body,
        // 文章封面在服务器的存放路径
        cover_img: path.join('/uploads', req.file.fieldname),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者id
        author_id: req.user.id
    }
    //发布文章sql语句
    const sql = `insert into ev_articles set ?`
    db.query(sql,articleInfo,(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows!==1) return res.cc('发布文章失败')
        res.cc('发布文章成功',0)
    })
}
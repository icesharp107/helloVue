/*
    
*/

//Mock来写假接口
before(app){
    let userpoor=[
        {username:'xiaod',password:'123456'},
        {username:'tim',password:'123456'},
    ]
    let tokenkey='xdclass'

   //app.get('/地址',(req,res)=>{ res.json({ 返回的数据 })})

    //注册
    app.get('/api/register',(req,res)=>{ //获取用户名及密码，判断如果

    })
    //登录
    app.get('/api/login',(req,res)=>{ //核对用户名及密码，符合返回message、token、code
        const {username,password}=req.query
        if(username=='xiaod' && password=='123456' || username=='xiaod' && password=='123456'){
            res.json({
                code:0,
                message:'登录成功',
                toke:tokenkey+'-'+username+'-'+(new Date().getTime+60*60*1000)
            })
        }else{
            res.json({
                code:1,
                message:'账号或密码错误'
            })
        }
    })
    //首页轮播图数据接口
    // 结构 data：[]----{},{}
    app.get('/api/banner',(req,res)=>{
        res.json({
            data:[
               {
                   url:'https://m.xdclass.net',
                   image:'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png'
               },
               {
                url:'https://m.xdclass.net',
                image:'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png'
                },
            ]
        })
    })
    //滚动分类接口
    //结构 data:[]--[]*2--{}*10
    app.get('/api/rollinglist',(req,res)=>{
        res.json({
            data:[
                [
                    {
                        url:'https://m.xdclass.net',
                        image:'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                     
                ],[]
            ]
        })
    })
    //获取分类页的分类接口
    //结构 0-20 1~6 -4
    app.get('/api/classify',(req,res)=>{
        switch(req.query.type){
            case '0':
                res.json({
                    data:[
                        {
                            image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                            label:'小米'
                        },
                        {
                            image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                            label:'华为'
                        },
                        {
                            image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                            label:'荣耀'
                        },
                    ]
                });
                break;
            case '1':
                res.json({});
                break;
            case '2':
                res.json({});
                break;
            case '3':
                res.json({});
                break;
            case '4':
                res.json({});
                break;
            case '5':
                res.json({});
                break;
            case '6':
                res.json({});
                break;
        }
    })
}
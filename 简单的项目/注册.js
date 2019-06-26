/*
  1、cube-form，model、schema、sumit=submitHandler
  2、写样式
  3、submitHandler 提交处理函数
  4、注册接口   app.get('',()=>{})
  5、路由
*/

/*
   data{}   data:function(){}     data(){} 
   对象写法、和函数写法
   对象==共享内存，函数==独立内容

   多次调用同一个组件，用函数---独立
*/
/*  
   <cube-form
  :model="model"
  :schema="schema"
  @submit="submitHandler"
  ></cube-form>

   model 数据源，
   schema 定义的模式，子配置
   submit 校验成功后提交事件，
   validate 每次有数据校验更新的事件，
   

   schema{
      fields:[
          {
                       type:'类型',
                       modelKey:'数据对象',
                       label:'',
                       rules:{
                           required:true
                           type:
                           min:
                           max:
                       },
                       trigger:'blur/change'失焦
                       messages:{校验信息
                           required:'对应true',
                           min:
                           max:
                       }
          },
      ]
   }
*/
/*
   submitHandler函数   
    简单  console.log('注册成功')
    发起请求  this.$http.get().then().catch()
    成功：返回响应，显示res.success里面的信息
*/
  submitHandler(e){
    e.preventDefault()
    //console.log('注册成功')
    this.$http.get('/api/register',{params:this.model})
    .then(res=>{
        console.log(res.success)
    })
    .catch(err=>{
        console.log(err)
    })
  }

  /*
    注册接口 , 1结构赋值 req.query
              2 判断 usename是否已存在，res.json({})
     
    userpoor:信息池
    filter:新数组v，是userpoor的复制数组，过滤符合条件，不符合删除

    遍历并过滤出  存在userpoor.usename==usename 证明：用户名已注册过
    存在那么:length= n >0
  */
 before(app){
     let userpoor=[
        {username:'xiaod',password:'123456'},
        {username:'tim',password:'123456'}
     ]

     app.get('/api/register',(req,res)=>{
         const {username,password} = req.query
         const userlength=userpoor.filter(v=>v.username==username).length
         if(userlength>0){
             res.json({
                 success:false,
                 message:'已存在'
             })
         }else{
             res.json({
                 success:true,
                 message:'注册成功'
             })
         }
     })
 }

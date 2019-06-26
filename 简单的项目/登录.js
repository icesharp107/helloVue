import { async } from "q";

/*
  步骤：接口、store、请求
 登录和注册大同小异
 不同：登录需要token 
    要用到usern ，需要结构赋值  const {username,password} = req.query
     接口：如果用户名+密码正确，返回有token
*/
befor(app){
    let tokenkey='xdclass'

    app.get('url',(req,res)=>{
        //直接返回 res.json()，里面有 code、message、token
        const {username,password} = req.query
        if(username=='xiaod' && password=='123456' ||username=='tim' && password=='123456'){
            res.json({
                code:0,
                message:'登录成功',
                token:tokenkey+'-'+username+'-'+(new Date().getTime()+60*60*1000)
            })
        }else{
            res.json({
                code:1,
                message:'账号或密码错误',
            })
        }
    })
}

/*
 在store   state有 token
    mutation  settoken    将token赋值给 state.token------这里token 是 result.token

*/
et store=new Vuex.Store({
    state:{
      token:''
    },
    mutations:{
      settoken(state,token){
        state.token=token
      }
    }
  })
  
  export default store

  /*写异步请求  try---catch
     请求成功，有 0 是登录成功，存储token
              没有   代表请求成功但用户名或密码不对
     
this.$route   激活当前路由--只读
this.$route.query  表示 URL 查询参数
   */

   async submitHandler(e){
       e.preventDefault()
      try{
        const result=await this.$http.get('ulr',{params:this.model})
        if(result.code=='0'){
            this.$store.commit('token',result.token)
            window.localStorage.setItem('token',result.token)

            if(this.$route.query.redirect){
                this.$router.replace({path:this.$route.query.redirect})
            }else{
                this.$router.replace({path:'/batnav/index'})
            }
        }else{
            alert(result.message)
        }
      }catch(err){
        console.log(err)
      }

   }
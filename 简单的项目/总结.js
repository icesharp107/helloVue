

/*
  在入口main导入 vuex、axios 
  Vue.prototype.$http=axios  将vue的请求改为axios
 
*/
//在mutation里
settoken(state,res.token){
    state.token=res.token
}
// 直接来   返回res.json----success、message
this.$http.get('url',{params:this.module})
.then()
.catch()

//通常异步来  直接请求，返回什么都不管     返回res.json----code、message、（token）
try(){
    const res=this.$http.get('url',{params:this.module})
}catch(err){

}
//返回什么做判断
res=>{
    console.log(res)  //res是响应对象，内有非常多键值对，都是字符串
    // 显示 可以是 res.code/success/message
}
//做其他判断    成功返回code=0，存储toekn到本地和store
if(res.code=='0'){
    this.$store.commit('settoken',res.token)
    window.localStorage.setItem('token',res.token)
}else{
    alert(res.message)
}

// 注册---显示
// 登录---存储toekn，跳转路由



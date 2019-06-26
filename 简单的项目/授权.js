/* 
   在main.js入门文件配置全局路由守卫 router.beforeEach(to,from,next){}
    1、将本地存储到vuex，vuex刷新就没了
    3、登录有就有toekn   2、meta.requireAuth=true，需要授权--来区分
    4、有Auth没有token，跳转/login，query存储参数：完整路径

*/

router.beforeEach(to,from,next){
    store.commit('settoken',localStorage.getItem('token'))
    if(to.meta.requireAuth){
        if(store.state.token){
            next()
        }else{
            next({
                path:'/login',
                query:{redirect:to.fullPath}
            })
        }
    }else{
        next()
    }
}

//根节点
//new Vue({}).$mount('#app')   手动挂载--未挂载的--实例
new Vue({
    router,
    store,
    render:h=>h(App)
}).$mount('#app')
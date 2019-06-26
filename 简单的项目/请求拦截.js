import axios from 'axios'
import router from '@/router'
import store from '@/store'
//全局请求拦截， 
//用到 请求、当前路由、当前store
//请求拦截 如果有token， 请求头就带上token值
//响应--如果成功，返回 res.data,  +一些判断   最终返回response
//比如清空了 store的token数据，回到登录页

//最后  在mian.js 引入并允许  

export default  function setAxios(){
    //req
    axios.interceptors.request.use(config=>{
        if(store.state.token){
            config.headers.token=store.state.token
        }
        return config
    })

    //res
    axios.interceptors.response.use(response=>{
        if(response.status==200){
            const data=response.data  //简写 

            if(data.code==-1){
                store.commit('settoken','') //清空store.state 里token
                localStorage.removeItem('token') //清空本地token
                router.replace({path:'/login'})  //跳转指定页面
            }   //还可以其他操作
            return data
        }
        return response
    })
}
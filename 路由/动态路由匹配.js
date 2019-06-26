//1 响应路由参数的变化
//模式匹配到的所有路由，全都映射到同个组件
//vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：
const User = {
    template: '<div>User</div>'
  }
  
  const router = new VueRouter({
    routes: [
      // 动态路径参数 以冒号开头
      { path: '/user/:id', component: User }
    ]
  })

//一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，
//可以在每个组件内使用。
  const User = {
    template: '<div>User {{ $route.params.id }}</div>'
  }

  //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象
  const User = {
    template: '...',
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
      }
    }
  }
//或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫
  const User = {
    template: '...',
    beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
    }
  }

//2捕获所有路由或 404 Not found 路由
//常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配任意路径，我们可以使用通配符 (*)
{
    // 会匹配所有路径
    path: '*'
  }
  {
    // 会匹配以 `/user-` 开头的任意路径
    path: '/user-*'
  }

//当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分
  // 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
/*
3高级匹配模式
vue-router 使用 path-to-regexp  作为路径匹配引擎，所以支持很多高级的匹配模式，
例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。

#
4匹配优先级
有时候，同一个路径可以匹配多个路由，
此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。
*/
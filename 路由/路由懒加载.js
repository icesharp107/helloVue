/*
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，
然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的异步组件 和 Webpack 的代码分割功能 ，轻松实现路由组件的懒加载。

首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：
 */
const Foo = () => Promise.resolve({ /* 组件定义对象 */ })

//第二，在 Webpack 2 中，我们可以使用动态 import 语法来定义代码分块点 (split point)
import('./Foo.vue') // 返回 Promise

//结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件

//在路由配置中什么都不需要改变，只需要像往常一样使用 Foo
const router = new VueRouter({
    routes: [
      { path: '/foo', component: Foo }
    ]
  })

//组件按组分块
  //有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。
  //只需要使用 命名 chunk ，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
//Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中
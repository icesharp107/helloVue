//解决：臃肿------Vuex 允许我们将 store 分割成模块（module）
    //甚至是嵌套子模块——从上至下进行同样方式的分割
    const moduleA = {
        state: { ... },
        mutations: { ... },
        actions: { ... },
        getters: { ... }
      }
      
      const moduleB = {
        state: { ... },
        mutations: { ... },
        actions: { ... }
      }
      
      const store = new Vuex.Store({
        modules: {
          a: moduleA,
          b: moduleB
        }
      })
      
      store.state.a // -> moduleA 的状态
      store.state.b // -> moduleB 的状态

//模块的局部状态
      //对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象
      const moduleA = {
        state: { count: 0 },
        mutations: {
          increment (state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
          }
        },
      
        getters: {
          doubleCount (state) {
            return state.count * 2
          }
        }
      }

//同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，
    //根节点状态则为 context.rootState：
    const moduleA = {
        // ...
        actions: {
          incrementIfOddOnRootSum ({ state, commit, rootState }) {
            if ((state.count + rootState.count) % 2 === 1) {
              commit('increment')
            }
          }
        }
      }

 //对于模块内部的 getter，根节点状态会作为第三个参数暴露出来
 const moduleA = {
    // ...
    getters: {
      sumWithRootCount (state, getters, rootState) {
        return state.count + rootState.count
      }
    }
  }

  /*
  默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样
  使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，
        你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，
它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

例如：
    更改 namespaced 属性后不需要修改模块内的代码。
  */
 const store = new Vuex.Store({
    modules: {
      account: {
        namespaced: true,
  
        // 模块内容（module assets）
        state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
        getters: {
          isAdmin () { ... } // -> getters['account/isAdmin']
        },
        actions: {
          login () { ... } // -> dispatch('account/login')
        },
        mutations: {
          login () { ... } // -> commit('account/login')
        },
  
        // 嵌套模块
        modules: {
          // 继承父模块的命名空间
          myPage: {
            state: { ... },
            getters: {
              profile () { ... } // -> getters['account/profile']
            }
          },
  
          // 进一步嵌套命名空间
          posts: {
            namespaced: true,
  
            state: { ... },
            getters: {
              popular () { ... } // -> getters['account/posts/popular']
            }
          }
        }
      }
    }
  })

/*
    在带命名空间的模块内访问全局内容（Global Assets）

如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，
    也会通过 context 对象的属性传入 action。
若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
*/
  modules: {
    foo: {
      namespaced: true,
  
      getters: {
        // 在这个模块的 getter 中，`getters` 被局部化了
        // 你可以使用 getter 的第四个参数来调用 `rootGetters`
        someGetter (state, getters, rootState, rootGetters) {
          getters.someOtherGetter // -> 'foo/someOtherGetter'
          rootGetters.someOtherGetter // -> 'someOtherGetter'
        },
        someOtherGetter: state => { ... }
      },
  
      actions: {
        // 在这个模块中， dispatch 和 commit 也被局部化了
        // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
        someAction ({ dispatch, commit, getters, rootGetters }) {
          getters.someGetter // -> 'foo/someGetter'
          rootGetters.someGetter // -> 'someGetter'
  
          dispatch('someOtherAction') // -> 'foo/someOtherAction'
          dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
  
          commit('someMutation') // -> 'foo/someMutation'
          commit('someMutation', null, { root: true }) // -> 'someMutation'
        },
        someOtherAction (ctx, payload) { ... }
      }
    }
  }

  /*
    在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。例如：
{
  */
 
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}

//带命名空间的绑定函数

//当使用 mapState, mapGetters, mapActions 和 mapMutations 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}

//于是上面的例子可以简化为
//对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}

//通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。
//它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}

//给插件开发者的注意事项----------模块的空间名称问题

//你可以通过插件的参数对象来允许用户指定空间名称

// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
    return function (store) {
      // 把空间名字添加到插件模块的类型（type）中去
      const namespace = options.namespace || ''
      store.dispatch(namespace + 'pluginAction')
    }
  }

  //动态注册

  //在 store 创建之后，你可以使用 store.registerModule 方法注册模块


  // 注册模块 `myModule`
store.registerModule('myModule', {
    // ...
  })
  // 注册嵌套模块 `nested/myModule`
  store.registerModule(['nested', 'myModule'], {
    // ...
  })

  /*
  之后就可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。

例如，vuex-router-sync  插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 store.unregisterModule(moduleName) 来动态卸载模块。
    注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。


        保留 state
在注册一个新 module 时，你很有可能想保留过去的 state，
    例如从一个服务端渲染的应用保留 state。
你可以通过 preserveState 选项将其归档：store.registerModule('a', module, { preserveState: true })。

当你设置 preserveState: true 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会。

这里假设 store 的 state 已经包含了这个 module 的 state 并且你不希望将其覆写。
  */
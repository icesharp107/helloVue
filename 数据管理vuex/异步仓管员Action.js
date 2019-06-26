/*
Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更状态。
        Action 可以包含任意异步操作。
*/

//注册action

const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
    }
  })    

  /*
  Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，
  或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，
  你就知道 context 对象为什么不是 store 实例本身了。
实践中，我们会经常用到 ES2015 的 参数解构  来简化代码（特别是我们需要调用 commit 很多次的时候）：
  */
 actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }


  //  分发( 提交commit )：：：：Action 通过 store.dispatch 方法触发
  store.dispatch('increment')

  /*
  乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？
  实际上并非如此，还记得 mutation 必须同步执行这个限制么？
        Action 就不受约束！我们可以在 action 内部执行异步操作：
  */
 actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }

  //Actions 支持同样的载荷方式和对象方式进行分发

  // 以载荷形式分发
store.dispatch('incrementAsync', {
    amount: 10
  })
  
  // 以对象形式分发
  store.dispatch({
    type: 'incrementAsync',
    amount: 10
  })


  //购物车示例，涉及到调用异步 API 和分发多重 mutation：
  actions: {
    checkout ({ commit, state }, products) {
      // 把当前购物车的物品备份起来
      const savedCartItems = [...state.cart.added]
      // 发出结账请求，然后乐观地清空购物车    checkout_request
      commit(types.CHECKOUT_REQUEST)
      // 购物 API 接受一个成功回调和一个失败回调
      shop.buyProducts(
        products,
        // 成功操作
        () => commit(types.CHECKOUT_SUCCESS),
        // 失败操作
        () => commit(types.CHECKOUT_FAILURE, savedCartItems)
      )
    }
  }

//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。 
//每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
//这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})

/*
你不能直接调用一个 mutation handler。这个选项更像是事件注册：
“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，
你需要以相应的 type 调用 store.commit 方法：
*/
store.commit('increment')

//mutation 的 载荷（payload）      向 store.commit 传入额外的参数， 
mutations: {
    increment (state, n) {
      state.count += n
    }
  }
  store.commit('increment', 10)

  //在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
  // ...
mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  }
  store.commit('increment', {
    amount: 10
  })

  //提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
store.commit({
  type: 'increment',
  amount: 10
})

/*
  最好提前在你的 store 中初始化好所有所需属性。
    当需要在对象上添加新属性时，你应该
      使用 Vue.set(obj, 'newProp', 123), 或者
以新对象替换老对象。
*/
state.obj = { ...state.obj, newProp: 123 }


//用常量替代 Mutation 事件类型

// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})

//记住 mutation 必须是同步函数
/*
现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。
然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：
因为当 mutation 触发的时候，
回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。
*/

mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
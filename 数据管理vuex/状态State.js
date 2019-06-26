/*
Vuex 使用单一状态树    ，用一个对象就包含了全部的应用层级状态。
        作为一个“唯一数据源 (SSOT )”而存在。
每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，
在调试的过程中也能轻易地取得整个当前应用状态的快照。
单状态树和模块化并不冲突——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。
*/

//在 Vue 组件中获得 Vuex 状态,
//状态存储是响应式的，从 store 实例中读取状态最简单的方法就是::::在计算属性 中返回某个状态：

// 创建一个 Counter 组件
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
      count () {
        return store.state.count
      }
    }
  }


  const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
      <div class="app">
        <counter></counter>
      </div>
    `
  })

/*
当一个组件需要获取多个状态时候，
      将这些状态都声明为计算属性会有些重复和冗余。

为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键
*/
  // 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

//当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

//组件仍然保有局部状态
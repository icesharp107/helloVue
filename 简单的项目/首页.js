/*  轮播图
   <cube-slide :data="items"/>
    
   item:[{url,image},{},{}]

   cube-slide-item 轮播图页的自定义
            :data 数据的数组，让组件监听数据变化
    autoPlay 自动播放？ =false
    interval 播放间隔
    direction horizontal/vertical 水平/垂直
    speed 切换速度 =400
事件
 change 页面切换触发  scroll 滚动时派发
 scroll-end 滚动结束
*/

// 获取数据--要在显示前---created(){}
//get请求，将 数据数组--赋值给--数组（lists、items）结构：url、image、label
 const items=this.$http.get('url')
 this.items=items.data


 //接口 api/banner---对应items数组
  data:[{url:'',image:''},{} ]

  // api/rollinglist
  data:[
      [],
      [{url:'',image:'',label:''},{},{}]
  ]




 
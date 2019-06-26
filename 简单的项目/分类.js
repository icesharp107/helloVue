/*
   cube-scroll .leftpanels  30%
   cube-scroll.rightpanels  70% 
   
   
forEach(值、索引、数组对象)---数组的值、数组的索引、数组本身
*/ 

// tabs是数组,  参数是 list的索引---list是数组
//  单击list的索引与tags挂钩
// 判断 list的索引= tabs的索引，   
Selection(index){
    //tabs遍历 ，val就是{labe、active}，ind就是索引
    this.tab.forEach((val,ind)=>{
        if(index == ind){
            val.active=true  //改变tabs里面val
        }else{
            val.active=false
        }
    })
    this.getclassify(index)  //tags
}
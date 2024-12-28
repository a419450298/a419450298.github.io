---
title: vue中引入外部js文件
date: 2021-10-28 16:39:03
ags: vue2
categories:
- 知识复习


---

今天被前同事问到vue中引入js文件报错的问题

[![5L3qu8.png](https://z3.ax1x.com/2021/10/28/5L3qu8.png)](https://imgtu.com/i/5L3qu8)

大多数情况下习惯了通过/</script/>/标签在public中的index.html引入js文件，但是在vue中通常引入，依然会报错

在es6或者在vue中不会直接支持

一、自己写的代码引入

[![5L822q.png](https://z3.ax1x.com/2021/10/28/5L822q.png)](https://imgtu.com/i/5L822q)

下面举个例子

```dart
function textMessage(){
	alert("This is what I want say")
}

export {
    textMessage
}
```

我们在宿主那里，我们引入改文件

```dart
<template>  
    <div class="teslist">  
        <button @click="methods1">显示console</button>  
    </div>  
</template>  
<script src="../../lib/textMessage.js"></script>  
<script>  
    import { textMessage } from '../../lib/textMessage.js'  
    export default {  
        methods:{
　         methods1:function(){  
              textMessage();  
           }  
    }}  
</script>  
<style>  
    .teslist {  
    }  
</style> 
```

二、直接引入的 不能用npm下载的

[![5Lt6mV.png](https://z3.ax1x.com/2021/10/28/5Lt6mV.png)](https://imgtu.com/i/5Lt6mV)

在view.vue中的代码这样写：

```dart
<template>
...
</template>
<script>
import swiper from './swiper.js'
import common from '../common.vue'
export default {
    data(){
        return{
        }
    },
    mounted:function(){
        this.swippertab();
    },
    methods:{
        swippertab(){
             var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 30
            });
        },
    } 
}
</script>
<style scoped>
@import './swiper.css';
</style>
```

**注意一下的就是在swiper.js中需要改一下代码，在最后面改成用export导出Swiper,并且代码原有的amd格式的导出需要注释掉**

未完待续

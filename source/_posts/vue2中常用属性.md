---
title: vue2中常用属性
date: 2021-10-18 14:11:52
tags: vue2
categories:
- 知识复习
---

## Vue中$set的用法

由于 Vue 会在初始化实例时进行双向数据绑定，使用Object.defineProperty()对属性遍历添加 getter/setter 方法，所以**属性必须在 data 对象上存在**时才能进行上述过程 ，这样才能让它是响应的。如果要给对象添加新的属性，此时新属性没有进行过上述过程，不是响应式的，所以会出想数据变化，页面不变的情况。此时需要用到$set。

```bash
<!--先看一个例子-->

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>vue $set</title>
<script src="https://static.runoob.com/assets/vue/1.0.11/vue.min.js"></script>
</head>
<body>
<div id="app">
  姓名：{{ name }}<br>
    年龄：{{age}}<br>
    性别：{{sex}}<br>
    说明：{{info.content}}
</div>
<!-- JavaScript 代码需要放在尾部（指定的HTML元素之后） -->
<script>
var data = {
    name: "简书",
    age: '3',
    info: {
        content: 'my name is test'
    }
}    
var key = 'content';
var vm = new Vue({
    el:'#app',
    data: data,
    ready: function(){
        //Vue.set(data,'sex', '男')
        //this.$set('info.'+key, 'what is this?');
    }
});
<!--如果直接新增sex属性，就会出现下图情况-->
data.sex = '男'；
</script>
</body>
```

在age及name都有get和set方法,但是在sex里面并没有这两个方法，因此，设置了sex值后vue并不会自动更新视图；

***vue中双向绑定的值，直接赋值的话，无法再次被改变。这时需要使用$set再次激活***

在age及name都有get和set方法,但是在sex里面并没有这两个方法，因此，设置了sex值后vue并不会自动更新视图；

![](https://z3.ax1x.com/2021/10/18/5Nzzb4.png)

解决办法

数组：

```kotlin
this.$set(Array, index, newValue)
```

```bash
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
解决：用$set方法
当你修改数组的长度时，例如：vm.items.length = newLength
解决：vm.items.splice(newLength)
```

对象：

```csharp
this.$set(Object, key, value)
```

```dart
有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。
但是，添加到对象上的新属性不会触发更新。
在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```


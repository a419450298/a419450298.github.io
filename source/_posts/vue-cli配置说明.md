---
title: vue-cli配置说明
date: 2021-10-20 10:21:32
tags: vue2
categories:
- 知识复习

---

### vue-cli中配置多个代理

如果要研究vue-cli工具，一定要仔细阅读官方文档

[vue-cli官方配置文档](http://vuejs-templates.github.io/webpack/commands.html)

[vue-cli脚手架](https://cli.vuejs.org/zh/guide/)

### 一、cli2 和cli3的区别

在介绍配置之前有必要先介绍一下，cli2和cli3的区别

#### 目录的区别

#### ![](https://z3.ax1x.com/2021/10/20/5BP1Re.png)

vue-cli 3.0的项目摈弃了 **config 、 build 、 static** 目录，新增了 **public** 目录，将根目录下的 index.html 放置在 public 目录下。

新增 **webpack** 的配置文件 **vue.config.js** ，可以在该文件中进行webpack的相关配置，例如 **loader、开发环境**等等。

新增 .**browserslistrc** 文件，指定了项目的目标浏览器的范围，用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀，可以理解为浏览器兼容。

新增 **babel.config.js** 替代原先的**.babelrc**，具备和原先.babelrc一样的作用。

src文件夹中多了 views 文件夹，相比2.0，在 index.js 变为了 router.js

2.0版本相比3.0版本 有build和config文件夹等，src文件夹中有router文件夹，里面有index.js

#### 启动项目

3.x启动项目：

```undefined
npm run serve
```

2.x启动项目：

```undefined
npm run dev  或   npm run start
```

#### 配置项

![](https://z3.ax1x.com/2021/10/20/5BApy4.png)

vue-cli2.0的域名配置，分为开发环境和生产环境，所以配置域名时，需要在**config中的dev.env.js和prod.env.js中分别配置**

前面说过，到了3.0 config文件已经被移除，但是多了.env.production和env.development文件，除了文件位置，实际配置起来和2.0没什么不同

当然，没了config文件，**跨域需要配置域名时，从config/index.js 挪到了vue.config.js中，配置方法不变**

### 二、vue.config.js配置

vue-cli 3.x 脚手架搭建完成后，项目目录中没有 vue.config.js 文件，**需要手动在根目录中创建 vue.config.js**。vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。你也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。

```bash
module.exports = {
    // 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' 
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    // 输出文件目录：在npm run build时，生成文件的目录名称 
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 
    assetsDir: "assets",
    // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 
    productionSourceMap: false,
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
    filenameHashing: false,
    // 代码保存时进行eslint检测
    lintOnSave: false,
    // webpack-dev-server 相关配置
    devServer: {
        // 自动打开浏览器
        open: true,
        host: 'localhost',
        // 端口
        port: 9930,
        // https
        https: false,
        // 热更新
        hotOnly: false,
        // 使用代理
        proxy: {
            '/api': {
                // 目标代理服务器地址
                target: 'http://47.100.47.3/',
                // 开启代理，本地创建一个虚拟服务器 允许跨域
                changeOrigin: true, 
            },
        },
    },
}
```

### 三、cli2设置多个反向代理

设置

```bash
proxyTable: {
  sencod: {
    target: 'https://cnodejs.org/',     //这里只是例子
        filter(pathname, req) {
          // console.info('pathname',pathname)
          const isApi = pathname.indexOf('/api') == 0;   //这里的abc是和后台商量好=>api
          const ret = isApi;
          return ret;
        },
        changeOrigin: true,
    },
  three: {
    target: ' https://easy-mock.com/mock/59d78f3b9d/', //另外的一个接口例如mock的
        filter(pathname, req) {
          // console.info('pathname',pathname)
          const isApi = pathname.indexOf('/baseapi') == 0;   //这里的abc是和后台商量好=>baseapi
          const ret = isApi;
          return ret;
        },
        changeOrigin: true,
      },
    },
```

调用

```bash
methods: {
      getData() {
        axios.get('/api/v1/topics', { //cnodejs的接口
          params: {
            page: 20,
            limit: 10
          }
        })
          .then(function (response) {
            //console.log(response);
          })
          .catch(function (error) {
            //console.log(error);
          });
      },
      getDatathree() {
        axios.get('/baseapi/table') //easy-mock的模拟出来的接口
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
```

### 四、cli3设置多个反向代理

设置

```bash
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    filenameHashing: true,
    devServer: {
      open: true,  // 自动打开浏览器
      host: '127.0.0.1',
      port: 8081,
      https: false,
      hotOnly: false,
      disableHostCheck: true,
      proxy: {
          "/api": {
              target: 'http://xxxxxxx', // 这个地址结尾我原本加了一个‘/’,然后一直报404，去掉就好了
              changeOrigin: true,
              pathRewrite: {
                  '^/api': '/'
              }
          },
          '/bpi': {
              target: "http://xxxxxx", // 目标地址
              ws: true,  // 是否启用websockets
              changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              pathRewrite: {
                '^/bpi': '/'  //这里重写路径
            }
          },
          '/cpi': {
              target: 'http://',
              changeOrigin: true,
              pathRewrite: {
                '^/cpi': '/'
            }
          }
      },
  
      before: app => {
      }
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
  
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
  
    // 第三方插件配置
    pluginOptions: {}
  };
```

调用

1. 在main.js里面，设置baseURL，Vue.prototype.$http=axios; 这里根据实际需要设置请求头之类的

```bash
this.$http({
    method: 'post',
    url: '/api/xxx/xxx',
    data: params
}).then(res => {
    console.log(res.data)
}).catch(error => {
    console.log(error)
})
```

### 五、一句话总结

配置多个反向代理需要前端或后端约定,url中判断出区别从而代理到不同的接口

### 六、其他

#### 一、产生原因

- 跨域是a页面想要获取b页面资源，如果a,b页面的协议、域名、端口号、子域名不同，所进行的访问都是跨域的，而浏览器一般为了安全都限制了跨域访问，也就是不允许跨域访问资源。

#### 二、解决办法

##### 1.JSONP

- JSONP是一个非官方协议，它允许在服务器端集成script tags返回至客户端，通过javascript callback的形式实现跨域访问。
- 基本思想：网页通过添加一个`<script>`元素，向服务器请求JSON数据，这种做法不受同源策略限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。



```xml
    <script type="text/javascript">
        function jsonpCallback(result){
            //alert(result);
            for(var i in result){
                alert(i + ":" + result[i]);     //循环输出
            }
        }
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        JSONP.src = "http://crossdomain.com/services.php?callback=jsonpCallback";
        document.getElementsByTagName("head")[0].appendChild(JSONP);
    </script>
```

##### 2.window.name

- window.name+iframe需要目标服务器响应window.name，window对象有一个name属性，该属性有个特征：即在一个窗口（window）的生命周期内，窗口载入的所有的页面都是共享一个window.name的，每个页面对window. name都有读写的权利，window.name 是持久存在一个窗口载入过的所有页面中的！

##### 3.window.postMessage

- HTML5引入了一个全新的API：跨文档消息传输Cross Document Messaging 。它的目标是在一个单独的持久连接上提供全双工、双向通信。（同源策略对web sockets不适用）
- web sockets原理：在JS创建了web sockets之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockets协议。
- `otherWindow.postMessage(message, targetOrigin)`
   otherWindow：指目标窗口，也就是给哪个窗口发消息，是window.frames属性的成员或者由window.open方法创建的窗口。
   参数说明：
   (1)message：是要发送的消息，类型为string，object
   (2)targetOrigin：是限定消息接收范围，不限制使用“ * ”

##### 4.CORS

- 基本思想：使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。

##### 5.web sockets

- web sockets是浏览器的一种API，它的目标是在一个单独的持久连接上提供全双工、双向通信。(同源策略对web sockets不适用)
- web sockets原理：在JS创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议。


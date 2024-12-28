---
title: Npm包管理工具私有化
date: 2021-10-11 01:18:58
tags: 工具
categories:
- 工具的使用
---

[![5VST3D.png](https://z3.ax1x.com/2021/10/11/5VST3D.png)](https://imgtu.com/i/5VST3D)

## 一、前言

在工作中，我们常常会开发很多通用性的代码，比如UI库，工具类，公用业务逻辑代码等。随着前端队伍越来越壮大，为了快速的进行模块化开发提高复用性，项目间共享代码就变得尤为必要。常用的框架/类库没必要在每个项目都放一份，团队内部产出的公共模块也需要有合理的共享机制。现在，用npm管理前端代码已经是业界趋势。通常我们可能会将代码发布到npm，需要的项目npm/yarn安装引入，但是npm无法保证源码的私密性，这时我们就需要使用到私有的npm仓库。 

## 二、私有npm仓库优势

- 只能在公司的局域网(内网)使用，保证了代码的私密性
- 因为使用局域网，依赖包下载更快
- 可以将发布和安装npm的包进行权限设置，利于npm仓库的维护
- 修改了第三方npm包，但是发布包的作者未将PR合并到master，导致该功能无法在安装包后引用，这时我们可以将第三方包源码修改，发布于私有仓库，即可下载安装，而不用在node_modules中更改源码
- 微前端框架（qiankun，single-spa）可以弥补js沙盒隔离的问题，更便于公司产品化
- 利于公司前端的技术沉淀

## 三、工具选择

CNPM 私服：需要占用服务器资源，有些公司可能还需要 DevOps 同事的支持

Nexus 私服：[Nexus](https://link.jianshu.com/?t=https://www.sonatype.com/nexus-repository-oss) 对 Maven 包管理的私服工具，其实他还支持 npm 、docker 、yum 等等。

Sinopia：[sɪ'nəʊpɪə]]：已经停止维护

Verdaccio (威尔达乔): Sinopia停更后社区在维护

## 四、服务端搭建

Verdaccio 是一个 **Node.js**创建的**轻量的私有npm proxy registry** （推荐使用）

基于 windows10 进行搭建

```
// 安装 verdaccio
npm install -g verdaccio

// 加上–unsafe-perm的原因是防止报 grywarn 权限的错
npm install -g verdaccio --unsafe-perm

// 启动
verdaccio

```

##  五、客户端使用

```
// 更换 npm 库
npm set registry http://localhost:4873/

```

tips：

① 推荐使用 npr 对 npm registry 进行统一管理，具体使用如下

```
// 安装 nrm
npm install -g nrm

// 添加地址到 nrm 中
nrm add [registry name] [registry address] 
nrm add verdaccio http://localhost:4873/

// 查看 nrm 镜像源地址
nrm ls

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/ 
  verdaccio --- http://localhost:4873/

// nrm 切换 registry 地址
nrm use verdaccio

```

② 推荐使用 pm2 对 verdaccio 进行托管

```
// 安装 pm2
npm install -g pm2 --unsafe-perm

// 使用 pm2 启动 verdaccio
pm2 start verdaccio

// 查看 pm2 守护下的进程 verdaccio 的实时日志
pm2 show verdaccio 

```

## 六、发布

```
// 注册
npm adduser --registry http://localhost:4873/

// orr
npm adduser
// 输入用户名、密码、账号 

// if you use HTTPS, add an appropriate CA information ("null" means get CA list from OS)
npm set ca null

```

现有一 npm-test 文件夹需要打包至私有仓库，如何执行？

```
// 在 npm-test 文件夹根目录下执行 npm init, 初始化包填写信息
npm init

// 已经切换到我们私服地址的情况下
npm publish         

// 未切换到我们的私服时，直接加后缀可以发布到私服上
npm publish --registry http://localhost:4873/ 

// 还可以在 package.json 中加入 publishConfig，就可以直接发布，无需设置仓库
"publishConfig": {
    "registry": "http://localhost:4873/"
}

```

## 七、下载

```
npm install npm-test
```

## 八、其他设置

由于官网访问比较慢且表述不容易读懂这里推荐,如权限管理，如何做运维，docker部署等等都有相关说明

[阿西河](https://www.axihe.com/npm/verdaccio/home.html)

[Verdaccio官网](https://verdaccio.org/)

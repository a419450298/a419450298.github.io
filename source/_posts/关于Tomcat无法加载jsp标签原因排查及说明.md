---
title: 关于Tomcat无法加载jsp标签原因排查及说明
date: 2023-03-06 01:06:22
tags: 工作中问题 
categories:
- 报错解决集合
---

1. 问题说明

程序war包发布到服务器之后，用浏览器访问带有

```bash
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
```

标签的jsp页面时，会出现服务响应500的情况

2. 解决流程

   1）Servlet和Tomact的版本确认，然后再根据版本使用对应jsp解析的jar包，也就是jstl.jar；

[![ppmVuHH.png](https://s1.ax1x.com/2023/03/08/ppmVuHH.png)](https://imgse.com/i/ppmVuHH)

​    2）控制变量法将不能访问的jsp页面中的<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>标签删除，随后再次发包，页面能够再次打开并能访问，但是出现了一些接口响应404，也就是服务器没有对应的接口资源；

​    3）在/WebRoot/WEB-INF下新建一个文件夹，用于存放jsp应用的资源，然后将不能访问的jsp页面中，将<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>标签复原，随后再次发包，此时此前不能访问的jsp面能再次访问，并且接口都是正常响应。

[![ppmVl4I.png](https://s1.ax1x.com/2023/03/08/ppmVl4I.png)](https://imgse.com/i/ppmVl4I) 

3. 最后说明

导致的原因为，Tomcat跳过了加载jstl.jar包中，相应解析jsp的依赖，后续访问jsp页面时，由于jsp标签没有引用，就会相应500；将对应的依赖放置于新建的文件中，会让Tomcat二次加载。

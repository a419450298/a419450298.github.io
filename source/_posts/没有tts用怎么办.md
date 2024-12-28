---
title: 没有tts用怎么办
date: 2023-03-06 00:28:23
tags: 工具
categories:
- 音频处理
---

####  主要步骤：

第一步：油猴插件下载：https://www.tampermonkey.net/ 

第二步：微软tts 下载按钮 https://greasyfork.org/zh-CN/scripts/444347-azure-speech-download

第三步：微软TTS语音引擎文字转语音网址 https://azure.microsoft.com/en-us/products/cognitive-services/text-to-speech/#overview

#### 重要说明：

1.下载安装油猴插件

[![ppmVJv8.md.png](https://s1.ax1x.com/2023/03/08/ppmVJv8.md.png)](https://imgse.com/i/ppmVJv8)

2.下载油猴插件脚本

[![ppmVtKS.md.png](https://s1.ax1x.com/2023/03/08/ppmVtKS.md.png)](https://imgse.com/i/ppmVtKS)

3.在微软的文字转tts选择自己需要的配置，注意查看自己的脚本是否为开启状态

[![ppmVdEj.md.png](https://s1.ax1x.com/2023/03/08/ppmVdEj.md.png)](https://imgse.com/i/ppmVdEj)

4.注意如果没有开启的状态，自己调整关闭浏览器重新访问启用一下，接下来微软网页翻到最下面，可以试听和下载

[![ppmVr80.md.png](https://s1.ax1x.com/2023/03/08/ppmVr80.md.png)](https://imgse.com/i/ppmVr80)

5.下载有多种输出频率单主要是MP3，可以用ffmpeg转一下，ffmpeg怎么用可以参考我之前的文章（https://stonelst.gitee.io/2021/12/04/ffmpeg%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4/），当然你也可以自己百度。

#### 为什么不用python给我们写一个脚本：

1.懒

2.写了pyttsx3出来的声音不自然，百度aip使用有限制，数量有限

![Snipaste_2023-03-06_00-58-06.png](http://s5.nsloop.com:17969/images/2023/03/06/Snipaste_2023-03-06_00-58-06.png)

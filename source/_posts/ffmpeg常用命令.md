---
title: ffmpeg常用命令
date: 2021-12-04 23:28:35
tags: 工具
categories:
- 视频处理

---

ffmpeg下载：

推荐官网下载(http://www.ffmpeg.org/download.html), 当然也可以采用国内的镜像源，我这里采用的是windows系统的版本，记得自己配置环境变量

![](https://thumbnail1.baidupcs.com/thumbnail/5a28e05f8l22ba7094b3a0e502ba2f4e?fid=588163855-250528-1070814146298986&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-zQbcJBmEjfrDqxQQEU0kTWfx8V8%3d&expires=8h&chkbd=0&chkv=0&dp-logid=165598699728324489&dp-callid=0&time=1645876800&size=c1920_u1080&quality=90&vuk=588163855&ft=image&autopolicy=1)

自身信息查看:

```bash
ffmpeg -h             :查看基本帮助信息
ffmpeg -h long        :查看高级帮助信息
ffmpeg -h full        :查看所有帮助信息
ffmpeg -version       :查询版本
ffmpeg -buildconf     :查询编译配置
ffmpeg -formats       :查询可用格式
ffmpeg -muxers        :查询可用复用器
ffmpeg -demuxers      :查询可用解复用器
ffmpeg -codecs        :查询可用编解码器
ffmpeg -decoders      :查询可用解码器
ffmpeg -encoders      :查询可用编码器
ffmpeg -bsfs          :查询可可用比特流filter
ffmpeg -protocols     :查询可用的协议
ffmpeg -filters       :查询可用的过滤器
ffmpeg -pix_fmts      :查询可用的像素格式
ffmpeg -layouts       :查询标准声道名称
ffmpeg -sample_fmts   :查询可用的音频采样格式
ffmpeg -colors        :查询可用的颜色名称

```

主要参数：

```bash
-i               设置输入文件
-f               设置输出格式
-y               若输出文件已存在时则覆盖文件
-fs              超过指定的文件大小时则结束转换
-t               指定输出文件的持续时间，以秒为单位
-ss              从指定时间开始转换，以秒为单位
-title           设置标题
-timestamp       设置时间戳
-vsync           增减Frame使影音同步
-c               指定输出文件的编码
-metadata        更改输出文件的元数据
-b:v             设置影像流量，默认为200Kbit/秒。（单位请引用下方注意事项）
-r               设置帧率值，默认为25
-s               设置画面的宽与高
-aspect          设置画面的比例
-vn              不处理影像，于仅针对声音做处理时使用
-vcodec( -c:v )  设置影像影像编解码器，未设置时则使用与输入文件相同之编解码器
-b:a             设置每Channel（最近的SVN版为所有Channel的总合）的流量。（单位请引用下方注意事项）
-ar              设置采样率
-ac              设置声音的Channel数
-acodec ( -c:a ) 设置声音编解码器，未设置时与影像相同，使用与输入文件相同之编解码器
-an              不处理声音，于仅针对影像做处理时使用
-vol             设置音量大小，256为标准音量。（要设置成两倍音量时则输入512，依此类推。）
```

视频参数：

```bash
-b 设定视频流量(码率)，默认为200Kbit/s 
-r 设定帧速率，默认为25 
-s 设定画面的宽与高 
-aspect 设定画面的比例 
-vn 不处理视频 
-vcodec 设定视频编解码器，未设定时则使用与输入流相同的编解码器 
```

音频参数：

```bash
-ar 设定采样率 
-ac 设定声音的Channel数 
-acodec 设定声音编解码器，未设定时则使用与输入流相同的编解码器 
-an 不处理音频
```

##### 1.视频格式转换

```bash
ffmpeg -i input.avi output.mp4
ffmpeg -i input.mp4 output.ts
```

##### 2. 提取音频

```bash
ffmpeg -i test.mp4 -acodec copy -vn output.aac
ffmpeg -i test.mp4 -acodec aac -vn output.aac
ffmpeg -i test.mp4 -f mp3 -vn test.mp3
```

##### 3.提取视频

```bash
ffmpeg -i input.mp4 -vcodec copy -an output.mp4
```

##### 4.视频剪切

00:00:15开始，截取5秒钟的视频

```bash
ffmpeg -ss 00:00:15 -t 00:00:05 -i input.mp4 -vcodec copy -acodec copy output.mp4
```

##### 5.码率控制

码率控制对于在线视频比较重要。因为在线视频需要考虑其能提供的带宽。

那么，什么是码率？很简单：
bitrate = file size / duration
比如一个文件20.8M，时长1分钟，那么，码率就是：
biterate = 20.8M bit/60s = 20.810241024*8 bit/60s= 2831Kbps
一般音频的码率只有固定几种，比如是128Kbps，
那么，video的就是
video biterate = 2831Kbps -128Kbps = 2703Kbps。

说完背景了。好了，来说ffmpeg如何控制码率。
ffmpg控制码率有3种选择，-minrate -b:v -maxrate
-b:v主要是控制平均码率。
比如一个视频源的码率太高了，有10Mbps，文件太大，想把文件弄小一点，但是又不破坏分辨率。

```bash
ffmpeg -i input.mp4 -b:v 2000k output.mp4
```

上面把码率从原码率转成2Mbps码率，这样其实也间接让文件变小了。目测接近一半。
不过，ffmpeg官方wiki比较建议，设置b:v时，同时加上 -bufsize
-bufsize 用于设置码率控制缓冲器的大小，设置的好处是，让整体的码率更趋近于希望的值，减少波动。（简单来说，比如1 2的平均值是1.5， 1.49 1.51 也是1.5, 当然是第二种比较好）

```bash
ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k output.mp4
```

-minrate -maxrate就简单了，在线视频有时候，希望码率波动，不要超过一个阈值，可以设置maxrate。

```bash
ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k -maxrate 2500k output.mp4
```

##### 6.视频编码格式转换

```bash
ffmpeg -i input.mp4 -vcodec h264 output.mp4
ffmpeg -i input.mp4 -vcodec mpeg4 output.mp4
ffmpeg -i input.mp4 -c:v libx265 output.mp4
ffmpeg -i input.mp4 -c:v libx264 output.mp4
```

##### 7. 只提取视频ES数据

```bash
ffmpeg –i input.mp4 –vcodec copy –an –f m4v output.h264
```

##### 8. 过滤器的使用

###### 8.1.将输入的1920x1080缩小到960x540输出:

```bash
ffmpeg -i input.mp4 -vf scale=960:540 output.mp4
```

###### 8.2 为视频添加logo

```bash
ffmpeg -i input.mp4 -i iQIYI_logo.png -filter_complex overlay output.mp4
```

[![oGvMz8.png](https://z3.ax1x.com/2021/12/01/oGvMz8.png)](https://imgtu.com/i/oGvMz8)

右上角：

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=W-w output.mp4
```

左下角：

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=0:H-h output.mp4
```

右下角：

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=W-w:H-h output.mp4
```

###### 8.3 去掉视频的logo

有时候，下载了某个网站的视频，但是有logo很烦，咋办？有办法，用ffmpeg的delogo过滤器。
语法：-vf delogo=x:y:w:h[:t[:show]]
x:y 离左上角的坐标
w:h logo的宽和高
t: 矩形边缘的厚度默认值4
show：若设置为1有一个绿色的矩形，默认值0。

```bash
ffmpeg -i input.mp4 -vf delogo=0:0:220:90:100:1 output.mp4
```

结果如下所示：

[![otnJRf.png](https://z3.ax1x.com/2021/12/02/otnJRf.png)](https://imgtu.com/i/otnJRf)

##### 9. 抓取视频的一些帧，存为jpeg图片

比如，一个视频，我想提取一些帧，存为图片，咋办？

```bash
ffmpeg -i input.mp4 -r 1 -q:v 2 -f image2 pic-%03d.jpeg
```

-r 表示每一秒几帧
-q:v表示存储jpeg的图像质量，一般2是高质量。
如此，ffmpeg会把input.mp4，每隔一秒，存一张图片下来。假设有60s，那会有60张。

[![otMusU.png](https://z3.ax1x.com/2021/12/02/otMusU.png)](https://imgtu.com/i/otMusU)

60张？什么？这么多？不要不要。。。。。不要咋办？？
可以设置开始的时间，和你想要截取的时间呀。

```bash
ffmpeg -i input.mp4 -ss 00:00:20 -t 10 -r 1 -q:v 2 -f image2 pic-%03d.jpeg
```

-ss 表示开始时间
-t表示共要多少时间。
如此，ffmpeg会从input.mp4的第20s时间开始，往下10s，即20~30s这10秒钟之间，每隔1s就抓一帧，总共会抓10帧。
[![otQAmD.png](https://z3.ax1x.com/2021/12/02/otQAmD.png)](https://imgtu.com/i/otQAmD)

##### 10. 将带透明的png图片转为带透明的webM视频

```bash
ffmpeg -f image2 -i cap_%d.png -c:v libvpx -auto-alt-ref 0 -r 10000 ./out_vp8.webm
```

##### 11. 视频与音频合并

###### 11.1 视频本身有声音的情况

命令：

```bash
ffmpeg -i input_video.mp4 -i input_audio.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4
```

最后时长是音频或视频的时长的最大值。

-map的意思是，使用第一个输入源的视频，第二个输入源的音频

###### 11.2 视频本身没声音的情况

命令：

```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac output.mp4
```

如果合并希望视频或音频哪个先结束，就完成合并，则加一个参数-shortest

###### 11.3 剪切视频的部分区域

```bash
ffmpeg -i in.mp4 -filter:v "crop=out_w:out_h:x:y" out.mp4
```

out_w 视频截取的宽
out_h 视频截取的高
x and y 截取的左上角坐标

例如，把一个1080p的横屏视频，截取为一个宽高为576x1024的竖屏视频

```bash
ffmpeg -i input.mp4 -filter:v "crop=576:1024:0:0" cut_out.mp4
```

###### 11.4 合并2个视频

最好2个视频是同样格式以及大小。
用如下3个命令，先把2个输入文件转为临时文件，保证格式一样，然后合并
合并2个视频：

```bash
ffmpeg -i input1.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts intermediate1.ts
ffmpeg -i input2.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts intermediate2.ts
ffmpeg -i "concat:intermediate1.ts|intermediate2.ts" -c copy -bsf:a aac_adtstoasc output.mp4
```

--未完待续--

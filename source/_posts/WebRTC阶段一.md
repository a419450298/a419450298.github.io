---
title: WebRTC阶段一
date: 2021-10-05 12:57:23
tags: webrtc
categories:
- WebRTC
---

## webRTC概述

音视频处理 + 即时通讯的开源库

2010年Google将其收购

它是一个非常优秀的多媒体框架，跨平台

## WebRTC能做啥

音视频实时互动

游戏，即时通讯，文字传输等等

它是一个百宝箱，传输，音视频处理（回音降噪，降噪等）

音视频设备访问与管理

音视频数据的采集

数据的传输与实时互动

## WebRTC的工作机制

![](https://z3.ax1x.com/2021/10/05/4vIMmF.png)

## 架构组件

### Your Web App

Web开发者开发的程序，Web开发者可以基于集成WebRTC的浏览器提供的web API开发基于视频、音频的实时通信应用。

### Web API

面向第三方开发者的WebRTC标准API（Javascript），使开发者能够容易地开发出类似于网络视频聊天的web应用，需要注意的是可能在不同浏览器中API接口名会不太一样, 所以推荐使用这个JS适配器来协调各个浏览器的不同接口。 这些API可分成Media API、 RTCPeerConnection、Peer-to-peer Data API三类:

### Media API

MediaStream：MediaStream用来表示一个媒体数据流。 MediaStreamTrack：在浏览器中表示一个媒体源。

### RTCPeerConnection

RTCPeerConnection：一个RTCPeerConnection对象允许用户在两个浏览器之间直接通讯。 SDP: 用来描述当前连接者想要传输的内容，支持的协议类型，支持的编解码类型等。 RTCIceCandidate：表示一个ICE协议的候选者，简单的说，就是目标节点的IP以及端口。 RTCIceServer：表示一个ICE Server，其主要用于当前主机的IP发现，通过和ICE Server通讯，我们会得到一组可供连接使用的IP:Port候选值，双方通过交换ICE候选值来建立起连接。

### Peer-to-peer Data API

DataChannel：数据通道( DataChannel)接口表示一个在两个节点之间的双向的数据通道，该通道可以设置成可靠传输或非可靠传输 。

### WebRTC Native C++ API

本地C++ API层，使浏览器厂商容易实现WebRTC标准的Web API，抽象地对数字信号过程进行处理。

### Transport / Session

传输部分可基于TCP/UDP，会话层组件采用了libjingle库的部分组件实现

### AudioEngine

音频引擎是包含一系列音频多媒体处理的框架，包括从视频采集卡到网络传输端等整个解决方案。

### VideoEngine

视频引擎是包含一系列视频处理的整体框架，从摄像头采集视频到视频信息网络传输再到视频显示整个完整过程的解决方案。

## 通讯内容的确立

首先，两个客户端（Alice & Bob）想要创建连接，一般来说需要有一个双方都能访问的服务器来帮助他们交换连接所需要的信息。有了交换数据的中间人之后，他们首先要交换的数据是SessionDescription（SD），这里面描述了连接双方想要建立怎样的连接。 

![](https://z3.ax1x.com/2021/10/05/4v5zSP.jpg)

## WebRTC的目录结构

webrtc windows 目录结构，不过都差不多

#### 根目录： 

| 目录         | 功能                                                   |
| ------------ | ------------------------------------------------------ |
| api          | WebRTC接口层，浏览器都是通过该接口调用webRTC           |
| call         | 数据流的管理层，Call代表同一个端点的所有数据的流入流出 |
| video        | 与视频相关的逻辑                                       |
| audio        | 与音频相关的逻辑                                       |
| common_audio | 音频算法相关                                           |
| common_video | 视频算法相关                                           |
| media        | 与多媒体相关的逻辑处理，如编解码的逻辑处理             |
| logging      | 日志相关                                               |
| module       | 最重要的目录，子模块                                   |
| pc           | Peer Connection,链接相关的逻辑层                       |
| p2p          | 端对端相关代码,stun,turn                               |
| rtc_base     | 基础代码，如线程，锁相关的统一接口代码                 |
| rtc_tool     | 音视频分析相关的工具代码                               |
| tool_webrtc  | WebRTC测试相关的工具代码。如CPU特性,原子操作等         |
| stats        | 存放各类数据统计相关的类                               |
| sdk          | 存放Android和IOS层代码。如视频采集，渲染等             |
|              |                                                        |

video_capture:

windows 上webrtc采用的是dshow技术，实现枚举视频的设备信息和视频数据的采集，这意味着可以支持大多数的视频采集设备；对那些需要单独驱动程序的视频采集卡（比如海康高清卡）就无能为力了。  （别买HIK的摄像头）

video_coding:

WebRTC采用I420/VP8编解码技术。VP8是google收购ON2后的开源实现，并且也用在WebM项目中。VP8能以更少的数据提供更高质量的视频，特别适合视频会议这样的需求。  (VP8压缩率实际不如h264,webrtc处理264的时候有问题，以后说)

video_processing:

 视频图像处理针对每一帧的图像进行处理，包括明暗度检测、颜色增强、降噪处理等功能，用来提升视频质量。

#### 子目录：

| 目录                     | 功能                                         |
| ------------------------ | -------------------------------------------- |
| audio_coding             | 音频编解码相关代码                           |
| audio_device             | 音频采集与音频播放相关代码 （设备相关）      |
| audio_mixer              | 混音相关代码（多人实时互动，要混在一起传输） |
| audio_processing         | 音频先后处理的相关代码（轨迹消除，降噪）     |
| bitrate_controller       | 码率控制相关代码（码流500k，1M）             |
| congestion_controller    | 流控相关代码(流量控制)                       |
| desktop_capture          | 桌面采集相关代码                             |
| pacing                   | 码率探测及平滑处理相关的代码                 |
| remote_bitrate_estimator | 码率探测及平滑处理相关的代码                 |
| rtp_rtcp                 | rtp/rtcp协议相关的代码                       |
| video_capture            | 视频采集相关的代码                           |
| video_coding             | 视频编解码相关的代码                         |
| video_processing         | 视频前后处理相关的代码                       |

## webRTC的运行机制

### 轨与流

Track :一路轨是平行且不相交的音频轨，视频轨 

MediaStream: 借鉴了传统的媒体流的概念

### WebRTC重要类

MediaStream (包含很多轨)

RTCPeerConnection   (最重要的类  里面包含了一些大而全的类，对于应用层来说将MediaStream塞到RTCPeerConnection   就好了，重点掌握) 

RTCDataChannel（普通的二进制数据通过PeerConnection获取，再通过DataChannel塞到PeerConnection中去）

### PeerConnection调用过程

![](https://z3.ax1x.com/2021/10/05/4v0pEF.png)

### 调用时序图

![](https://z3.ax1x.com/2021/10/05/4vBxkF.png)

![](https://z3.ax1x.com/2021/10/05/4vRdm9.png)

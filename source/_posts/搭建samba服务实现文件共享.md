---
title: 搭建samba服务实现文件共享
date: 2023-01-28 09:24:10
tags: DevOps
categories:
  - DevOps
---

在一些中小型网络，或者企业的内部网中，利用 Linux 建立文件服务器是一个很好的解决方案。针对企业内部网中的绝大部分客户机采用 Windows 的情况，我们可以通过使用 Samba 来实现文件服务器功能。
Samba 是在 Linux 及 Unix 上实现 SMB（Server Message Block）协议的一个免费软件，由服务器及客户端程序构成。这里我们只介绍服务器程序。
我们首先介绍一些 SMB 协议的情况。SMB 协议是建立在 NetBIOS 协议之上的应用协议，是基于 TCP138、139 两个端口的服务。NetBIOS 出现之后，Microsoft 就使用 NetBIOS 实现了一个网络文件/打印服务系统。这个系统基于 NetBIOS 设定了一套文件共享协议，Microsoft 称之为 SMB（Server Message Block）协议。这个协议被用于 Lan Manager 和 Windows 服务器系统中，实现不同计算机之间共享打印机和文件等。因此，为了让 Windows 和 Unix/Linux 计算机相集成，最好的办法就是在 Unix/Linux 计算机中安装支持 SMB 协议的软件。这样使用 Windows 的客户端不需要更改设置，就能像使用 Windows NT 或 Windows 2000 服务器一样，使用 Unix/Linux 计算机上的共享资源了。Samba 使 SMB 协议运行在 NetBIOS 协议上，并且使用 Windows 的 NetBEUI 协议让 Unix/Linux 服务器可以在 Windows 的网络邻居上被访问到。

## 安装：

```bash
##（首先更新系统的软件下载源）
sudo apt-get update
##（可选对ubuntu进行系统升级！）
sudo apt-get upgrade
## 正式安装
sudo apt-get install samba
## 安装结束后创建Samba用户，用户名及密码
sudo smbpasswd -a xxx  ## xxx为用户名
##（输入密码2次：）
New SMB password:
Retype new SMB password:

## 备份原配置
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
## 编辑配置文件
sudo gedit /etc/samba/smb.conf
## 如果提示 gedit:1505157): Gtk-WARNING **: 23:46:14.954: cannot open display:可以通过vim进行编辑
sudo vim /etc/samba/smb.conf
```

## 配置：

### 配置文件常用指令说明:

comment=STRING :注释；
path=/PATH/TO/FILENAME :当前共享所映射的文件系统路径；
browseable=YES :是否可浏览，指是否可被用户查看；
guest ok=YES :是否允许来宾账号访问；
browseable = No :是否公开目录
writable=YES :是否可写；
read only = no|yes :是否为只读
write list=/PATH/TO/user_list :拥有写权限的用户列表；

**在文件尾部添加以下内容，根据自己需要修改，并保存文件**

```bash
[share]
path = /media/pi  ## 路径建议提前分配好读写权限 sudo chmod -R 777 /media/pi
available = yes
browsealbe = yes
valid usere = pi     ## 创建的用户名
writable = yes
guest ok = no
read only = no
```

- [share] 是共享文件夹显示的名称
- 上面配置了禁止匿名登录，允许用户读写文件
- 更多配置方式https://www.samba.org/
- 注意 如果共享的文件夹中包含中文可能会出现乱码，建议在[global]修改字符集为 utf-8

```bash
## 原有
   display charset = cp936
   unix charset = cp936
   dos  charset = cp936
## 更改为
   dos charset = UTF-8
   unix charset = utf-8
   display charset = utf-8
```

- 如果映射过慢，可采用如下方法, 通过 testparm 检查配置

```bash
## 在[global]下添加如下配置
   read raw = Yes
   write raw = Yes
   socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072
   min receivefile size = 16384
   use sendfile = true
   aio read size = 16384
   aio write size = 16384
   max xmit = 65535
   max connections = 0
   deadtime = 0
## 配置结束
[printers]
   comment = All Printers
```

## 启动：

保存退出:wq

```bash
/etc/init.d/smbd restart  ## 重启SMB 使配置生效
```

这个时候 samba 的安装配置工作就已经完成了，当然可以保底操作一下,确保一切正常

```bash
sudo apt install cifs-utils -y ## 安装cifs
sudo apt-get install samba -y ## 更新samba
sudo ufw allow samba ## 防火墙豁免
/etc/init.d/smbd restart ## 重启即可
```

## 验证

win + R 输入\\192.168.1.66\share 输入实际的主机 ip 可通过 ifconfig 在 linux 机器上查

```bash
netstat -tunpl | grep smbd
```

- 注意：如果是服务商接入会屏蔽掉 445 139 端口
  在配置文件的[global]项中加入一行

```bash
smb ports = 1314
```

## 小结

samba 服务器功能
1）提供 Windows 风格文件或打印机的共享
2）在 Windows 网络中解析 NETBIOS 名字
3）提供 smb 客户功能
4）提供一个命令行工具，利用该工具限制支持 Windows 的某些管理功能

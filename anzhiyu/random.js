var posts=["2025/01/01/搭建samba服务实现文件共享/","2025/01/05/wireshark从入门到实战/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };
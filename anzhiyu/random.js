var posts=["2024/12/29/写给2024的一封信/","2025/01/01/搭建samba服务实现文件共享/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };
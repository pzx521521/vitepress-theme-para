# innosetup 制作的安装包 密码破解思路

## 如果是这种的exe可以按以下步骤破解密码



+ exeinfo 展示信息为此信息的是innosetup 制作的安装包

![61332a7ba958f2e9518e7bf7d6dcc4ad.png](https://s1.imagehub.cc/images/2023/01/12/61332a7ba958f2e9518e7bf7d6dcc4ad.png)

+ 输入密码如图所示:

![c41eff996e5e7d64e5ca25967eb61ed5.png](https://s1.imagehub.cc/images/2023/01/12/c41eff996e5e7d64e5ca25967eb61ed5.png)



+ 下载 InnoExtractor, 打开想要破解的exe

注意如果文件过多,会加载很长时间.耐心等待即可, 加载完成后源码文件如下图:

![373852fa84541fe822b0e7e873644e58.png](https://s1.imagehub.cc/images/2023/01/12/373852fa84541fe822b0e7e873644e58.png)



+ 把如图所示的CompiledCode.bin解压出来, 里面就是innosetip的二进制代码. 直接打开  CompiledCode.bin 看密码即可:

![e648ed0f15746bef740e89a15066fdf8.png](https://s1.imagehub.cc/images/2023/01/12/e648ed0f15746bef740e89a15066fdf8.png)



## 破解过程解析及源码

### 示例exe

下载了一个很大的游戏,但是发现安装的时候居然有密码, 而且原论坛提供的密码不对

原贴

https://www.52pojie.cn/thread-1729506-1-1.html

把其中的密码程序提取出来PH17.exe: 

https://wwtw.lanzoum.com/itwIj0ktqzfg

### od尝试

本来以为很简单的OD就好了, 发现OD不行.

+ 字符串没法找到定位

+ vb/delphi 按钮查找脚本 找不到按钮事件

### innounp

最后在[stackoverflow.](https://stackoverflow.com/questions/49194957/disassembling-strings-from-inno-setup-code/49195240#49195240), 看到了[解决办法]([stackoverflow.](https://stackoverflow.com/questions/49194957/disassembling-strings-from-inno-setup-code/49195240#49195240)): 使用 innounp

[innounp官网](https://innounp.sourceforge.net/)

[innounp源码](https://sourceforge.net/projects/innounp/files/innounp/innounp%200.50/innounp050src.rar/download)

```
innounp -x -m PH18.exe 
```

innounp他是可以代替exe直接解压的

但是如果打包文件过多,因为它不会跳过解压普通文件, 如果文件过大的话,只能必须等他全部解压完.才可以得到CompiledCode.bin, 才可以知道密码.

修改innounp源码 `innounp.dpr lin475 `前加入

```
AddEmbeddedFiles
```

就可以先解压CompiledCode.bin








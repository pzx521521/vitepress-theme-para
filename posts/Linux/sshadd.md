---
title: "git 免密登录"
hidemeta: true
---
# git 免密登录

git 分为2种模式:

ssh 形如: git@codeup.aliyun.com:para/hugo.git

https 形如: https://codeup.aliyun.com/para/hugo.git

## ssh 免密登录

### 临时添加:

```
ssh-add ~/.ssh/id_rsa
```

如果报错:

````
Could not open a connection to your authentication agent.
````

限执行

```
ssh-agent bash
```

再执行

```
ssh-add ~/.ssh/id_rsa
```

### 永久添加

[参考](https://stackoverflow.com/questions/3466626/how-to-permanently-add-a-private-key-with-ssh-add-on-ubuntu)

在 `~/.ssh/config`中添加:
widnwos:
```
Host *
   AddKeysToAgent yes
   IdentityFile C:\Users\Administrator\.ssh\id_rsa
```
Mac
```
Host *
   AddKeysToAgent yes
   UseKeychain yes
   IdentityFile ~/.ssh/id_rsa
```

Linux
```
Host *
   AddKeysToAgent yes
   IdentityFile ~/.ssh/id_rsa
```


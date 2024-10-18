---
title: "记一次阿里code-flow(云效)git pull出现的问题"
hidemeta: true
---
# 记一次阿里code-flow(云效)git pull出现的问题
git pull 本地可以 但是通过阿里flow 不可以
## git pull 提示如下:
```
Permission denied (publickey).
fatal: Could not read from remote repository.
Please make sure you have the correct access rights
and the repository exists.
```
## 原因分析
+ 使用的是ssh, 而非https 对git 进行管理
+ 本地的id_rsa_pub 已经添加到阿里云
+ id_rsa 是包含密码的
+ 服务器通过 ssh-add(ssh-agent) 实现免ssh的 passphrase 输入
## 是没有输入ssh的 passphrase 原因
因为ssh-agent 在某些情况下并不会启动, 导致还是要输入passphrase, 在没有输入的情况下会报错
## 解决方案1, 输入passphrase:
[参考](https://stackoverflow.com/questions/34155308/provide-passphrase-to-git-in-bash-script)
修改脚本如下:
```
cd /root/hugo/para/hugo/
expect <<EOD
spawn git pull 
expect "Enter passphrase for key '/root/.ssh/id_rsa': "
send "passphrase\r"
expect eof
EOD
/root/hugo/hugo
```
要先安装 expect
```
yum -y install expect
```
## 解决方案2, 使用https 代替 ssh, 输入密码:
### 使用 expect 参考上面可以:
```
CONID='Your git account' 
CONKEY='Your git password' 
 
cd /home/wwwroot/default/project
expect -c "spawn git pull origin; expect \"*Username*\" { send \"${CONID}\n\"; exp_continue } \"*Password*\" { send \"${CONKEY}\n\" }; interact"

```
### 使用url
[参考](https://stackoverflow.com/questions/14629107/how-to-input-password-to-git-pull-command)

**Synopsis:**

```
git pull "https://<username>:<password>@github.com/<github_account>/<repository_name>.git" <branch_name>
```

**Example:**

```
git pull "https://admin:12345@github.com/Jet/myProject.git" master
```


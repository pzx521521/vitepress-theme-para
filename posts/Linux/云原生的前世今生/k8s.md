

# 一、环境准备

## ~~1. 卸载podman~~

centos8默认安装了podman容器，它和docker可能有冲突需要卸载掉

```bash
sudo yum remove podman
```

## 2. 关闭交换区

- 临时关闭

```bash
sudo swapoff -a
```

- 永久关闭
  把/etc/fstab中的swap注释掉

```bash
sudo sed -i 's/.*swap.*/#&/' /etc/fstab
```

## 3. 禁用selinux

- 临时关闭

```bash
setenforce 0
```

- 永久关闭

```bash
sudo sed -i "s/^SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
```

## 4. 关闭防火墙

```bash
sudo systemctl stop firewalld.service
sudo systemctl disable firewalld.service
```

# 二、安装K8S

## 1. 配置系统基本安装源

```bash
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```

## 2. 添加K8S安装源

将如下内容保存到：/etc/yum.repos.d/kubernetes.repo

```
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
```

由于目前阿里镜像中还没有CentOS8的kubernetes，但是可以使用CentOS7的安装包，所以上面是使用的kubernetes-el7-x86_64，如果有CentOS8的，则为kubernetes-el8-x86_64。

## 3. 安装docker

```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2 net-tools
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum -y install docker-ce
sudo yum install docker-ce docker-ce-cli containerd.io

```

为了docker加速pull，可以设置阿里云加速：

```bash
sudo mkdir -p /etc/docker
sudo vim /etc/docker/daemon.json
```

设置为如下内容：

```bash
{
  "registry-mirrors": [
    "https://bd1vumeq.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

启动docker

```
systemctl enable docker && systemctl start docker
docker --version
```



## 4. 安装kubectl、kubelet、kubeadm

安装kubectl、kubelet、kubeadm，设置kubelet开机启动，启动kubelet。

```
sudo yum install -y kubectl kubelet kubeadm
sudo systemctl enable kubelet
sudo systemctl start kubelet
```

查看K8S版本

```bash
kubeadm version
kubectl version --client
kubelet --version
```
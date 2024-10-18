# CI/CD

持续集成Continuous Integration(CI)()和持续交付Continuous Delivery(CD)

CI :代码->svn exe (自动构建exe到测试环境)

CD: svn exe->用户  (测试环境到自动发版)

CI/CD流程体验:[github action](https://github.com/marketplace?type=actions)

github action实现原理是[云原生](.\云原生的前世今生\云原生的前世今生.md)

# CI脚本说明

## 前置知识

### SVN 命令行

+ 使用[apache svn](http://subversion.apache.org/)

+ [Documentation](http://subversion.apache.org/docs/)
+ [Download](http://subversion.apache.org/packages.html)

### delphi CI by MSBuild

[MSBuild说明 ](https://docwiki.embarcadero.com/RADStudio/Sydney/en/MSBuild )

1.图标,版本,生成路径 等都在hyplatform.dproj, 在MSBuild中设置无效

## 如何使用

+ 1.下载apache svn 并放入C:/windows中(或者把目录加入系统环境变量)
+ 2.把```CI脚本.bat```放入 hyplatform.dproj的同级目录
+ 3.修改```CI脚本.bat```
  + 2.1 修改```exePath``` 为 hyplatform.exe所在的目录 为自己的目录
  + 2.2 修改```BDS```为delphi IDE的目录
  + 2.3 修改```FrameworkDir```为.Net MSBuild的目录 并把改目录加入系统环境变量(默认已加入)
  + 2.4 修改FrameworkVersion为.Net MSBuild的版本
+ 4. 双击运行 即可

### CI流程

1.svn 更新代码目录

2.svn 更新exe目录

3.build exe

4.svn 解决冲突

5.svn 上传


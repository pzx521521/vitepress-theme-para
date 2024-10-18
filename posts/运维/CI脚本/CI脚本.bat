set exePath=E:\PMSoft\NewBin\项目管理\main
::更新代码
svn up
::更新exe
cd %exePath%
svn up
::切换会代码目录 build
cd %~dp0

set BDS=C:\Program Files (x86)\Embarcadero\RAD Studio\8.0
set FrameworkDir=C:\Windows\Microsoft.NET\Framework\v4.0.30319
set FrameworkVersion=v4.0
MSBuild.exe hyplatform.dproj /p:Configuration=Release  /t:Build
:: 上传 exe  解决冲突
cd %exePath%
svn resolve --accept mine-full hyplatform.exe
:: 上传 exe  
svn commit  -m 测试

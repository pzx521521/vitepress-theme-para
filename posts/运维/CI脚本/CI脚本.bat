set exePath=E:\PMSoft\NewBin\��Ŀ����\main
::���´���
svn up
::����exe
cd %exePath%
svn up
::�л������Ŀ¼ build
cd %~dp0

set BDS=C:\Program Files (x86)\Embarcadero\RAD Studio\8.0
set FrameworkDir=C:\Windows\Microsoft.NET\Framework\v4.0.30319
set FrameworkVersion=v4.0
MSBuild.exe hyplatform.dproj /p:Configuration=Release  /t:Build
:: �ϴ� exe  �����ͻ
cd %exePath%
svn resolve --accept mine-full hyplatform.exe
:: �ϴ� exe  
svn commit  -m ����

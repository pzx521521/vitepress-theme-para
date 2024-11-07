import{_ as a,c as r,a0 as t,o as i}from"./chunks/framework.DADtiyJ8.js";const u=JSON.parse('{"title":"CI/CD","description":"","frontmatter":{},"headers":[],"relativePath":"posts/运维/CI脚本/CI脚本说明.md","filePath":"posts/运维/CI脚本/CI脚本说明.md"}'),l={name:"posts/运维/CI脚本/CI脚本说明.md"};function o(n,e,d,h,p,s){return i(),r("div",null,e[0]||(e[0]=[t('<h1 id="ci-cd" tabindex="-1">CI/CD <a class="header-anchor" href="#ci-cd" aria-label="Permalink to &quot;CI/CD&quot;">​</a></h1><p>持续集成Continuous Integration(CI)()和持续交付Continuous Delivery(CD)</p><p>CI :代码-&gt;svn exe (自动构建exe到测试环境)</p><p>CD: svn exe-&gt;用户 (测试环境到自动发版)</p><p>CI/CD流程体验:<a href="https://github.com/marketplace?type=actions" target="_blank" rel="noreferrer">github action</a></p><p>github action实现原理是<a href="./.\\云原生的前世今生\\云原生的前世今生.html">云原生</a></p><h1 id="ci脚本说明" tabindex="-1">CI脚本说明 <a class="header-anchor" href="#ci脚本说明" aria-label="Permalink to &quot;CI脚本说明&quot;">​</a></h1><h2 id="前置知识" tabindex="-1">前置知识 <a class="header-anchor" href="#前置知识" aria-label="Permalink to &quot;前置知识&quot;">​</a></h2><h3 id="svn-命令行" tabindex="-1">SVN 命令行 <a class="header-anchor" href="#svn-命令行" aria-label="Permalink to &quot;SVN 命令行&quot;">​</a></h3><ul><li><p>使用<a href="http://subversion.apache.org/" target="_blank" rel="noreferrer">apache svn</a></p></li><li><p><a href="http://subversion.apache.org/docs/" target="_blank" rel="noreferrer">Documentation</a></p></li><li><p><a href="http://subversion.apache.org/packages.html" target="_blank" rel="noreferrer">Download</a></p></li></ul><h3 id="delphi-ci-by-msbuild" tabindex="-1">delphi CI by MSBuild <a class="header-anchor" href="#delphi-ci-by-msbuild" aria-label="Permalink to &quot;delphi CI by MSBuild&quot;">​</a></h3><p><a href="https://docwiki.embarcadero.com/RADStudio/Sydney/en/MSBuild" target="_blank" rel="noreferrer">MSBuild说明 </a></p><p>1.图标,版本,生成路径 等都在hyplatform.dproj, 在MSBuild中设置无效</p><h2 id="如何使用" tabindex="-1">如何使用 <a class="header-anchor" href="#如何使用" aria-label="Permalink to &quot;如何使用&quot;">​</a></h2><ul><li>1.下载apache svn 并放入C:/windows中(或者把目录加入系统环境变量)</li><li>2.把<code>CI脚本.bat</code>放入 hyplatform.dproj的同级目录</li><li>3.修改<code>CI脚本.bat</code><ul><li>2.1 修改<code>exePath</code> 为 hyplatform.exe所在的目录 为自己的目录</li><li>2.2 修改<code>BDS</code>为delphi IDE的目录</li><li>2.3 修改<code>FrameworkDir</code>为.Net MSBuild的目录 并把改目录加入系统环境变量(默认已加入)</li><li>2.4 修改FrameworkVersion为.Net MSBuild的版本</li></ul></li><li><ol start="4"><li>双击运行 即可</li></ol></li></ul><h3 id="ci流程" tabindex="-1">CI流程 <a class="header-anchor" href="#ci流程" aria-label="Permalink to &quot;CI流程&quot;">​</a></h3><p>1.svn 更新代码目录</p><p>2.svn 更新exe目录</p><p>3.build exe</p><p>4.svn 解决冲突</p><p>5.svn 上传</p>',21)]))}const b=a(l,[["render",o]]);export{u as __pageData,b as default};

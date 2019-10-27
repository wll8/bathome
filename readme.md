# 批处理之家第三方库 - 镜像
本仓库收集自 http://www.bathome.net/s/tool 。

## 启动
你可以使用任何一个支持静态网页的服务启动。

例 nodejs :

``` sh
npx http-server -p 8080 # 然后访问 http://127.0.0.1:8080/www.bathome.net/s/tool
```

### 常用第三方

- [bcn - 第三方下载工具<span></span>](http://www.bathome.net/s/tool/?down&key=bcn)
- [pkg - 离线包管理工具](http://www.bathome.net/s/tool/?down&key=pkg)
- [sed](http://www.bathome.net/s/tool/?down&key=sed)
- [grep](http://www.bathome.net/s/tool/?down&key=grep)
- [gawk](http://www.bathome.net/s/tool/?down&key=gawk)
- [iconv](http://www.bathome.net/s/tool/?down&key=iconv)
- [curl](http://www.bathome.net/s/tool/?down&key=curl)
- [wget](http://www.bathome.net/s/tool/?down&key=wget)
- [nircmdc](http://www.bathome.net/s/tool/?down&key=nircmdc)
- [rar](http://www.bathome.net/s/tool/?down&key=rar) 

### 搜索语法

- 输入 grep 检索名称、说明、标签中包含 grep 的条目，可指定关键词匹配方式和匹配项目 
- 支持通配符：? 表示任意字符 * 表示任意长度的任意字符，允许以空格分隔多个字符串条件 
- 例如输入 grep 检索名称包含 grep 的条目 
- 在第一个 / 号之前的部分被解析为版本号，可指定版本的匹配方式，不支持通配符 
- 例如输入 2.5.1/grep 可筛选版本为 2.5.1 且名称包含 grep 的条目 
 

### 常见问题

- Q: 如何搜索第三方工具？
- A: 在搜索框中输入搜索条件，即时显示匹配项（详见搜索语法），右侧设置匹配规则


- Q: 搜索到结果后要如何下载？
- A: 在结果列表中单击版本号下载对应文件，蓝底白字的版本为推荐版本，未指定版本号时优先使用此链接


- Q: 可以保存当前选项为默认设置吗？
- A: 点击右上方的 `更多功能` 按钮，在弹出的面板中点击 `记住设置` 按钮

- Q: 如何将当前搜索结果分享给朋友？
- A: 点击右上方的 `更多功能` 按钮，在弹出的面板中有实时更新的分享地址

- Q: 输入关键词后，为什么没反应？
- A:
  - 1.顶部是否有与页面等宽的蓝色线条，若看不见蓝条，请确认 Javascript 是否被禁用；
  - 2.顶部是否有蓝色粗线，若仍在滚动说明正在加载列表，请耐心等待；
  - 3.点击更多功能中的  按钮，重新输入关键词再试
  - 若仍无反应，请到[批处理之家反馈](http://www.bathome.net/thread-36408-1-1.html)

### url参数语法
基本语法如 `http://www.bathome.net/s/tool/?参数1=值1&参数2=值2&参数N=值N`
各项参数的功能参见下表

| 参数=<值>                        | 说明                                                                                                |
|-------------------------------|---------------------------------------------------------------------------------------------------|
| key=`<var>`                     | 设置默认关键词为 `<var>`                                                                                    |
| filterby=`<var1>,<var2>,<var3>` | 设置关键词为 `<var1> <var2> <var3>`，可多选可选项有 name,help,lable或其对应中文名 名称, 说明, 标签或者使用中文全称 匹配名称, 匹配说明, 匹配标签    |
| vermode=`<var>`                 | 设置版本号检索模式为 `<var>`可选项有 0,1,2,3或其对应中文名 等于, 不高于, 不低于, 高于或者使用中文全称 等于指定版本, 不高于指定版本, 不低于指定版本, 高于指定版本     |
| keymode=`<var>`                 | 设置关键词检索模式为 `<var>`可选项有 0,1,2,3,4或其对应中文名 局部与, 局部或, 头部, 尾部, 完全或者使用中文全称 局部与匹配, 局部或匹配, 头部匹配, 尾部匹配, 完全匹配 |
| down=`<var>`                    | 下载 `<var>`，若为空，则使用 key 的 `<var>`                                                                      |
| bat=`<var>`                     | 显示获取 `<var>` 的 bat 代码                                                                               |
| hta=`<var>`                     | 显示获取 `<var>` 的 hta 代码                                                                               |
| color=`<var>`                   | 设置配色为 `<var>`可选项为任意 html 颜色格式，以下三者是等价的green, rgb\(0,255,0\), %2300FF00 （\# 需转义为 %23）                |


### 项目合作者
改进与维护： CrLf, bailong360, happy886rr, Batcher
推荐和建议： templinshi, 依山居, tigerpower

[所有人员均来自[批处理之家](http://www.bathome.net/)]

---
所有权归批处理之家所有。

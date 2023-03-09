# 重要提示

1.本项目是基于 [gin-vue-admin](https://www.gin-vue-admin.com/) 二次开发，如果您将此项目用于商业用途请咨询相关开发者。

2.本项目需要您有一定的golang和vue基础。

3.本项目分为[前端](https://github.com/z354392349/smart-campus-web)和[后端](https://github.com/z354392349/smart-campus-server)两个仓库存储。需要全部下载才能使用。



### 1.项目背景与意义

&emsp;&emsp;随着社会的高速发展和科技的不断进步人们对知识的需求与更高效的全方面受教育程度越来越重视，从而传统的纯人工教学管理和教务管理模式变得越发吃力起来，所以以电子科技为支撑的学校信息化建设尤为重要。自2000年起互联网卓越发展并取得的显著成绩，现如今人们手机与电脑变成日常标配，所以线上的教学管理模式可以更好的提高工作效率与精确性，并且后台数据的存储也保障了学生与老师的信息安全，从而可以更高效与规范的完成学校信息管理。

&emsp;&emsp;由于每年学生不断递增。学校也在不断的扩招学生，因此学校在教务信息的管理与学生成绩起伏管理方面的压力日益增加，传统的人工教学管理运行操作难度越来越大，时间越来越长。由于传统的教学管理不能实现信息集成效应，使得各方面信息独立存在无法实现信息共享，从而信息孤岛问题越发严重。学校不得不加大对学生教师信息处理的投入力度，极大的浪费了学校的管理力量，与资金的投入。但即便如此，传统的教学管理模式效率低的弊端显而易见，因此，考虑到学校教学管理的迫切需求，搭建智慧校园信息管理系统尤为重要。



### 2.项目功能介绍

&emsp;&emsp;本项目主要包含总览、成绩分析、教师管理、学生管理、年级管理、班级管理、科目管理、考务管理、通行记录、考勤记录、系统管理等。其中成绩分析、考务管理、通行记录、考勤记录、系统管理又分别包含下列子模块。

- 成绩分析包括：年级分析、班级分析、学生分析。

-  考务管理包括：考场管理、考试管理、考场查询、成绩查询。

- 通行记录包括：车辆通行、教师通行、学生通行。

- 考勤记录包括：教师考勤、学生考勤。

- 系统管理包括：角色管理、用户管理、菜单管理、API管理、操作历史。

  
### 3.使用说明

  ```
- node版本 > v16.8.3
- golang版本 >= v1.16
- IDE推荐：Goland
  ```



#### 3.1 前端运行

```
git clone  https://github.com/z354392349/smart-campus-web.git
cd smart-campus-web 
npm install 
npm run server

http://localhost:8000
账号：admin, 密码：123456
```



#### 3.2后端运行

```
git clone https://github.com/z354392349/smart-campus-server.git
cd smart-campus-server
go get 
修改config-serve.yaml 中MySQL相关信息
导入backup/db/ 下的数据
go run ./main.go
```



### 4.部分界面展示

<img src="https://raw.githubusercontent.com/z354392349/image/main/smart-campus/kcgl.png" width="1920">

<img src="https://github.com/z354392349/image/blob/main/smart-campus/ksgl.png?raw=true" width="1920">

<img src="https://raw.githubusercontent.com/z354392349/image/main/smart-campus/njfx.png" width="1920">

<img src="https://github.com/z354392349/image/blob/main/smart-campus/zonglan.png?raw=true" width="1920">



### 5.感谢 

&emsp; &emsp;感谢gin-vue-admin的作者，能提供这么好的项目，在学习Go语言期间对我的很大。有兴趣的同学也可以查看下gin-vue-admin的源码。



### 6.展望

&emsp;&emsp;本项目后期会继续完善同时也会将最新的代码进行更新，也欢迎各位同学多提出宝贵意见和我一起来完善这个项目。



### 7.联系方式

&emsp;&emsp;wx:48988840




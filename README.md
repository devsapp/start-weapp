## 🚀 一键部署
您可以点击 点击`一键部署`按钮,进行快速体验

[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=start-weapp)
# 微信小程序案例

> 快速部署和体验 Serverless 架构下的 Typescript + hapi + Taro + React 的微信小程序项目。

- [微信小程序案例](#微信小程序案例)
  - [源代码](#源代码)
  - [效果预览](#效果预览)
  - [整体体验流程](#整体体验流程)
  - [如何开发？](#如何开发)
    - [小程序客户端](#小程序客户端)
    - [准备](#准备)
    - [替换 `s.yaml` 中的变量](#替换-syaml-中的变量)
    - [本地开发](#本地开发)
    - [通过云上应用中心部署](#通过云上应用中心部署)
    - [通过本地环境部署](#通过本地环境部署)
    - [通过本地环境部署（不包括 node_modules）](#通过本地环境部署不包括-node_modules)
    - [创建并发布层](#创建并发布层)
## 源代码

- [:octocat: 服务端源代码](https://github.com/devsapp/start-weapp/tree/main/src)
- [:octocat: 客户端源代码](https://github.com/devsapp/weapp-client)
  
## 效果预览

可以在手机里使用你的小程序

![try](https://img.alicdn.com/imgextra/i4/O1CN01anewVJ1gAlPEkkA1U_!!6000000004102-0-tps-258-258.jpg)

![view](https://img.alicdn.com/imgextra/i3/O1CN01tcjzXg1UKaVsUjhTw_!!6000000002499-0-tps-404-528.jpg)

## 整体体验流程

1. 在[阿里云函数计算](https://fcnext.console.aliyun.com/)控制台的“应用中心”中一键部署当前小程序后端。
2. 在[微信公众平台](https://mp.weixin.qq.com/)上注册微信小程序。
3. `git clone git@github.com:devsapp/weapp-client.git` 下载当前示例的小程序客户端代码。并按照[说明](https://github.com/devsapp/weapp-client/blob/main/README.md)构建，并发布小程序客户端。
4. 在[微信公众平台 -> 开发管理 -> 开发设置](https://mp.weixin.qq.com/)页面获取小程序的 AppID 和 AppSecret，然后在函数计算控制台给函数配置名称为 `APP_ID` 和 `SECRET` 的环境变量。
5. 在[微信公众平台](https://mp.weixin.qq.com/)找到测试二维码，然后通过手机进行测试。您也可以添加更多体验成员，使用您的小程序。
## 如何开发？
### 小程序客户端

客户端代码地址为 https://github.com/devsapp/weapp-client
请按照客户端中的说明配置并发布小程序客户端。

在本项目的认证模块`auth/index.ts`中，我们实现了微信用户的登录，您可以获取到微信用户的唯一 id。您申请完小程序后，需要找到在微信公众平台上（开发管理 -> 开发设置页面）获取小程序的 AppID 和 AppSecret ，然后在控制台上编辑函数，给函数设置名称为 `APP_ID` 和 `SECRET` 的环境变量。在本地开发时，您也可以在本地环境设置这两个环境变量。
### 准备

1. 下载安装 Serverless Devs：`npm install @serverless-devs/s` 
    > 详细文档可以参考 [Serverless Devs 安装文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/main/docs/zh/install.md)
2. 配置密钥信息：`s config add`
    > 详细文档可以参考 [阿里云密钥配置文档](https://github.com/devsapp/fc/blob/main/docs/zh/config.md)
3. 安装 Docker
4. 安装 Node，Npm 等
### 替换 `s.yaml` 中的变量

修改`s.yaml`中的 `"{{ access }}"` `"{{ region }}"` `"{{ serviceName }}"` 为您自己函数的密钥，地域和服务名。
### 本地开发

1. `npm install`
2. `npm run dev`

启动本地开发环境。然后您可以通过 http://localhost:9000/api/tasks 进行访问。
您也可以通过 http://localhost:9000/documentation 查看基于 swagger 自动生成的 API 文档。

注意：此 Demo 使用的是本地数据库，挂载到 Nas 做持久化，不能用于生产环境。 您可以创建自己的云数据，然后修改 `common/base-repository` 中的代码。[查看相关文档和案例](https://help.aliyun.com/document_detail/84514.html)

### 通过云上应用中心部署

您可以直接修改代码，推送到代码仓库或发布 Release 后，将自动触发 CICD 流程，从而发布您的最新改动。
如果您不希望把 node_modules 直接打到代码包里，而是使用[层](https://help.aliyun.com/document_detail/193057.html)来维护 node_modules，请按照 `s.yaml` 中的说明进行修改。关于层的创建请参考“创建并发布层”。
### 通过本地环境部署

`npm run deploy:all` 

编译，并将最新改动部署到线上函数。
### 通过本地环境部署（不包括 node_modules）

`npm run deploy:code` 

编译，并将最新改动部署到线上函数。但是部署的代码包中，不包含 node_modules。node_modules 需要通过[层](https://help.aliyun.com/document_detail/193057.html)进行部署。这样可以较少 CICD 的时间和冷启动时间。具体方式请参考“创建并发布层”。

### 创建并发布层

`npm run create:layer` 

根据最新的 package.json 构建所需的 node_modules，并创建[层](https://help.aliyun.com/document_detail/193057.html)。
创建成功后，您需要在控制台中配置函数使用这个层。

注意：每次需要修改依赖时，您需要使用此命令构建新的层，并更新函数的配置，使用新的层。

> - Serverless Devs 项目：https://www.github.com/serverless-devs/serverless-devs   
> - Serverless Devs 文档：https://www.github.com/serverless-devs/docs   
> - Serverless Devs 钉钉交流群：33947367    
> - 后端代码来自：[typescript-hapi-starter]https://github.com/BlackBoxVision/typescript-hapi-starter
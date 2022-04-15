# animal

> An electron-vue project

#### Build Setup

```bash
# install dependencies
mkdir node-animal-http
cd node-animal-http
npm init fastify
yarn
#代码编写监听运行
yarn run watch

# 编译
yarn run build

#本地测试
yarn run dev

# 线上
yarn run start

#参数解析说明
req.params // user/:id  解析  {id:1}
req.query ?传参解析  user?id=1  {id:1}
req.file().file//获取post 处理 form-data 类型请求
req.body//获取post 参数 x-www-form-urlencoded

#状态码
statusCode = 500 服务错误
statusCode = 401 auth错误
statusCode = 1000 成功
statusCode = 1001 参数错误
statusCode = 1002 不存在
statusCode = 1003 其它错误

#python 3

py -3 .\excal2json_mission.py
```

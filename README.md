# abackend
[![codeclimate analysis](https://img.shields.io/codeclimate/github/frantic1048/abackend.svg?style=flat-square)](https://codeclimate.com/github/frantic1048/abackend)
![coverage](https://img.shields.io/codeclimate/coverage/github/frantic1048/abackend.svg?style=flat-square)
[![build status](https://img.shields.io/travis/frantic1048/abackend.svg?style=flat-square)](https://travis-ci.org/frantic1048/abackend)
![david-dm](https://img.shields.io/david/frantic1048/abackend.svg?style=flat-square)

一个记事本应用的 Web API 服务器，提供身份验证，同步记事等 API。

# 使用指南

## 部署

安装运行时，前往 [nodejs.org](https://nodejs.org/) 安装 Node.js。

前往 [mongodb.org](https://www.mongodb.org/) 安装 MongoDB。

克隆该仓库代码到本地：

```bash
git clone https://github.com/frantic1048/abackend.git
```

安装依赖（以下命令均在仓库根目录执行）：

```bash
npm install
```

至此程序就绪。

## 配置（可选）

编辑 `abackend.conf.js`。文件中有相应注释。

## 测试

**在 `abackend.conf.js` 启用 `dev` 选项（置其值为 `true`）。**

启动 MongoDB（启动一次即可，重复执行测试时不需要重启数据库，后面也是同样）：

```bash
mongod -f mongodb.conf
```

执行测试：

```bash
gulp
```

## 运行

**务必在 `abackend.conf.js` 关闭 `dev` 选项（置其值为 `false`）。**

启动 MongoDB：

```bash
mongod -f mongodb.conf
```

启动服务器：

```bash
gulp run
```

## 更新

更新程序：

```bash
git pull
```

# API

## /api/registration

### POST：注册新用户

#### 请求

请求体（JSON 格式）：

```json
{
  "id": "<userid>",
  "name": "<username>",
  "password": "<password>"
}
```

#### 响应

##### 注册成功

HTTP 状态码：`201 Created`

响应体（JSON 格式）：

```json
{
  "success": true
}
```

##### 注册失败

- 用户名已存在：`409 Conflict`
- 非法用户名：`422 Unprocessable Entity`

响应体（JSON 格式）：

```json
{
  "success": false,
  "message": "<error info>"
}
```

## /api/authentication

### POST：认证

#### 请求

请求体（JSON 格式）：

```json
{
   "id": "<userid>",
   "password": "<password>"
}
```

#### 响应

##### 验证成功

HTTP 状态码：`200 OK`

响应体（JSON 格式）：

```json
{
  "success": true,
  "token": "<access token>"
}
```

响应中的 `<access token>` 在后面的 API 有多次用到，以 `token` 指带。

##### 验证失败

- 用户不存在：`401 Unauthorized`
- 密码错误：`401 Unauthorized`

响应体（JSON 格式）：

```json
{
  "success": false,
  "message": "<error info>"
}
```

## /api/users/:user\_id

### PATCH：改密码

#### 请求

请求头：

```
x-access-token：<token>
```

token 指通过 `POST /api/authentication`  认证之后在响应体中获得的 token 的内容。

请求体（JSON 格式）：

```json
{
  "password": "<password>",
  "newPassword": "<newPassword>"
}
```

#### 响应

##### 成功

HTTP 状态码：`200 OK`

响应体（JSON 格式）：

```json
{
  "success": true
}
```

##### 失败

HTTP 状态码：`401 Unauthorized`

响应体（JSON 格式）：

```json
{
  "success": false,
  "message": "<error info>"
}
```

### DELETE：删除账户

#### 请求

请求头：

```
x-access-token：<token>
```

请求体（JSON 格式）：

```json
{
   "password": <"password">
}
```

#### 响应

##### 成功

HTTP 状态码：`204 No Content`

##### 失败（密码错误）

HTTP 状态码：`401 Unauthorized`

响应体（JSON 格式）：

```json
{
  "success": false,
  "message": <"error info">
}
```

## /api/users/:user\_id/notes

### GET：获取记事列表

#### 请求

请求头：

```
x-access-token：<token>
```

#### 响应

##### 成功

HTTP 状态码：`200 OK`

响应体（JSON 格式）：

```json
{
  "success": true,
  "noteList": [note]
}
```

## /api/users/:user\_id/notes/:note\_id

### POST：创建新记事

#### 请求

请求头：

```
x-access-token：<token>
```

请求体（JSON 格式）：

```json
{
  "id": "<noteId>",
  "title": "<noteTitle>",
  "date": <"noteDate">,
  "tags": <["noteTag"]>,
  "body": <"noteBody">
}
```

id 是对于单个用户的记事的唯一识别符（字符串），同一个用户不会拥有两个 id 相同的记事。

noteDate 是表示日期的字符串，遵循 [ECMA-262](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) 中规定的格式。

在其后获取记事相关的 API 中，返回的记事对象的格式与此请求结构一致。

#### 响应

##### 成功

HTTP 状态码：`201 Created`

响应体（JSON 格式）：

```json
{
  "success": true
}
```

##### 失败

- noteId 已存在：`409 Conflict`

响应体（JSON 格式）：

```json
{
  "success": false,
  "message": <error info>
}
```

### PATCH：更新已有记事

#### 请求

请求头：

```
x-access-token：<token>
```

请求体（JSON 格式）：

仅填充需要更新的记事属性即可。

```json
{
  "title": <"noteTitle">,
  "date": <"noteDate">,
  "tags": <["noteTag"]>,
  "body": <"noteBody">
}
```

#### 响应

##### 成功

HTTP 状态码：`200 OK`

响应体（JSON 格式）：

```json
{
  "success": true
}
```

### GET：获取记事

#### 请求

请求头：

```
x-access-token：<token>
```

#### 响应

##### 成功

HTTP 状态码：`200 OK`

响应体（JSON 格式）：

```json
{
  "success": true,
  "note": <note>
}
```

##### 失败（笔记不存在）

HTTP 状态码：`404 Not Found`

响应体（JSON 格式）：

```json
{
  "success": false
}
```


### DELETE：删除记事

#### 请求

请求头：

```
x-access-token：<token>
```

#### 响应

##### 成功

HTTP 状态码：`204 No Content`

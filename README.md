[![codeclimate](https://img.shields.io/codeclimate/github/frantic1048/abackend.svg?style=flat-square)](https://codeclimate.com/github/frantic1048/abackend)
![coverage](https://img.shields.io/codeclimate/coverage/github/frantic1048/abackend.svg?style=flat-square)
[![build status](https://img.shields.io/travis/frantic1048/abackend.svg?style=flat-square)](https://travis-ci.org/frantic1048/abackend)
![david-dm](https://img.shields.io/david/frantic1048/abackend.svg?style=flat-square)

# abackend
一个记事本应用的 Web API 服务端，提供身份验证，同步记事等 API。

# 使用指南

## 安装

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

## 运行

启动 MongoDB：

```bash
mongod -f mongodb.conf
```

执行测试：

```bash
gulp
```

作为服务器运行：

```bash
gulp run
```

## 更新

更新程序：

```bash
git pull
```

# API

待实现。

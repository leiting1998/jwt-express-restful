# jwt-express-restful



## 描述：

Express RESTful API 

- Express
- MongDB + Mongoose
- jsonwebtoken +  bcrypt
- Asynchronous Functions (Async/Await)



## 运行：

下载依赖：

```
npm install
```



启动服务器（`nodemon` 托管）：

```
npm start
```

**注意：首先，您要全局安装 nodemon ；其次，确保 mongoDB 服务器已经启动！！！**



创建用户：

```
// 接口
localhost:3000/user/register

// post方法 数据示例
{
	"email": "xxxx@qq.com",
	"password": "123456"
}
```

此时，就可以，看到消息,，表示创建用户成功：

```
{
    "message": "User created"
}
```



登录：

```
// 接口
localhost:3000/user/login

// post方法 按照上述方式，数据示例
{
	"email": "xxxx@qq.com",
	"password": "123456"
}
```

此时，已经生成了 token在返回信息里：

```
{
    "message": "Auth successful !",
    "result": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inh4eHhAcXEuY29tIiwidXNlcklkIjoiNWFhNGE2NGE2OTgyYTUwZTYwMjM5ZTg0IiwiaWF0IjoxNTIwNzQwMTQ5LCJleHAiOjE1MjA3NDM3NDl9.PYT7nYJbjZ-hKZR7Ifm2GWUl183GCJddtdu962vlF4Y"
}
```



**最后：复制 token ，在删除、更新、获取所有用户的方法请求头里加入你的Authorization就可以了；**




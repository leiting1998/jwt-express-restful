const mongoose = require('mongoose');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtKey } = require('../config');

mongoose.Promise = global.Promise;

class UsersControllers {

    // 查询当前所有用户，返回时屏蔽密码
    async find(req, res, next) {
        try {
            const users = await userModel.find();       // 查找所有用户，但不返回密码

            res.status(200).json(
                users.map(user => {
                    return {
                        _id: user._id,
                        email: user.email,
                        password: user.password,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/user/',
                        }
                    }
                })
            )
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }

    // 查询数据库中是否已存在此用户，不存在则创建；
    async add(req, res, next) { 
        try {
            const u = await userModel.findOne({ email: req.body.email });    
            
            if(u) {
                return res.status(409).json({
                    meaasge: "User exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                   
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } 

                    const user = new userModel({
                        _id : new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    
                    user
                        .save()
                        .then(result => {
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                })   
            }
        } catch (err) {          
            res.status(500).json({
                error: err
            })
        }
    }

    // 输入邮箱和密码进行登录
    async login(req, res, next) {
        const user = await userModel.findOne({ email: req.body.email });

        if(!user) {                          // 邮箱不正确
            console.log(user)
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        error: err
                    })
                } 

                const token = jwt.sign(         // 生成令牌
                    {
                        email: user.email,
                        userId: user._id
                    }, 
                    jwtKey,
                    {
                        expiresIn: "1h"
                    }
                );

                if (result) {
                    return res.status(200).json({
                        message: 'Auth successful !',
                        result: result,
                        token: token
                    })
                }
            })
        }
    }

    // 根据 id 更新用户密码 
    async update(req, res, next) {
        try{
            const user = await userModel.findByIdAndUpdate(
                req.params.userId,
                { password: req.body.password }
            );

            res.status(201).json({
                user: user,
                message: 'User updated'
            });
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }

    // 根据 id 删除用户，这是个危险的操作，管理员才有权限
    async delete(req, res, next) {
        try {
            const user = await userModel.findOneAndRemove({ 
                _id: req.params.userId
            });

            res.status(201).json({
                user: user,
                message: 'User removed'
            });
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }
}

module.exports = new UsersControllers


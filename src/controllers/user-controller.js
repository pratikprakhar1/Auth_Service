const {response} = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) =>
{

    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password,
        });
        return res.status(201).json({
            success : true,
            message : 'Succesfully created a new user',
            data : response , 
            error : {},

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'Something went wrong',
            data : {},
            success  : false ,
            err : error
        })
    }

}
const signIn = async (req,res) =>{
    try {
        const response = await userService.signin(req.body.email,req.body.password);
        return res.status(201).json({
            success : true,
            message : 'Succesfully signed in the user',
            data : response , 
            error : {},

        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({
        message : 'Something went wrong',
        data : {},
        success  : false ,
        err : error
        });
    }
}



module.exports = {
    create,
    signIn
}
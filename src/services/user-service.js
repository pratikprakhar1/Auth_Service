const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig');
const AppErrors = require('../utils/error-handler');
class UserService{

    constructor ()
    {
        this.UserRepository = new UserRepository();
    }

    async create(data)
    {
        try {
            const user = await this.UserRepository.create(data);
            return user
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            if(error.name == 'SequelizeUniqueConstraintError') {
                throw error;
            }
            if (error.statusCode) {
                throw error;
            } else {
                // Default to a 500 Internal Server Error
                throw {
                    statusCode: 500,
                    message: 'Something went wrong in service layer',
                    explanation: 'Internal server error',
                };
            }
        }
    }
    async assignrole(data)
    {
        try {
            const UserRole = await this.UserRepository.assignRole(data);
            return UserRole;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            if(error.name == 'SequelizeUniqueConstraintError') {
                throw error;
            }
            if (error.statusCode) {
                throw error;
            } else {
                // Default to a 500 Internal Server Error
                throw {
                    statusCode: 500,
                    message: 'Something went wrong in service layer',
                    explanation: 'Internal server error',
                };
            }
        }
    }
    async getUser(userId){
        try{
            const user = await this.UserRepository.getById(userId);
            return user;
        } catch(error){
            console.log("Something went wrong at service layer");
            throw{error};
    }
}
    async signin(email,plainPassword)
    {
        try {
            //fetch the user email
            const user = await this.UserRepository.getbyEmail(email);
            // compare incomming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch)
            {
                console.log("incorrect password");
                throw({error : 'password incorrect'});
            }
            // if passwords match , create a token and send it to the user
            const newJWT = this.createToken({email : user.email, id:user.id});
            return newJWT;

        } catch (error) {
            console.log("something went wrong in signin process");
            throw error;
        }
    }
    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            //to check if user exists with respect to token
            const user = await this.UserRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }
    createToken(user)
    {
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn : '1d'});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation  layer");
            throw error;
        }

    }
    verifyToken(token)
    {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in verifytoken",error);
            throw error;
        }
    }

    checkPassword(userInputplainPassword,encryptedPassword)
    {
        try {
            return bcrypt.compareSync(userInputplainPassword,encryptedPassword);
        } catch (error) {
            console.log('something went wrong in password comparison');
            throw error ;
        }
    }
    isAdmin(userId) {
        try {
            return this.UserRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

}
module.exports = UserService;
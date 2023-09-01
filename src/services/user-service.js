const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig');
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
            console.log("something went wrong in service layer");
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

}
module.exports = UserService;
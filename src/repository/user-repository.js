const {UserRoles,User,Role } = require('../models/index');
const ValidationError = require('../utils/validation-error');
const UniquenessError = require('../utils/validation-error');
class UserRepository {

    async create(data)
    {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            if(error.name == 'SequelizeUniqueConstraintError') {
                throw new UniquenessError(error);
            }

            console.log("Something went wrong in the repository layer");
            throw error ;
        }
    }
    async assignRole(data) {
    try {
        const { UserId, RoleId } = data;
        
        // Check if the user exists
        const user = await User.findByPk(UserId);
        if (!user) {
        throw new ValidationError('Invalid userId');
        }

        // Check if the role exists
        const role = await Role.findByPk(RoleId);
        if (!role) {
        throw new ValidationError('Invalid roleId');
        }

        const userRole = await UserRoles.create(data);
        return userRole;
    } catch (error) {
        if (error instanceof ValidationError) {
        throw error; // Re-throw custom validation error
        } else if (error instanceof UniquenessError) {
        throw error; // Re-throw custom uniqueness error
        } else if (error.name === 'SequelizeValidationError') {
        throw new ValidationError('Validation error', error.errors);
        } else if (error.name === 'SequelizeUniqueConstraintError') {
        throw new UniquenessError('Uniqueness constraint error');
        }

        console.error('Something went wrong in the repository layer:', error);
        throw error;
    }
    }

    async destroy(userId)
    {
        try {
             await User.destroy({
                where : {
                    id : userId ,
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error ;
        }
    }
    async getById(userId)
    {
        try {
            const user = await User.findByPk(userId ,{
                attributes : ['email','id']    //to get only email and id not password
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error ;
        }
    }
    async getbyEmail(userEmail)
    {
        try {
            const user = await User.findOne({
                where: {
                    email : userEmail,
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error ;
        }
    }
    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
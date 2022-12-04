const {userService} = require('../services')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await userService.createNewUser(req.body)

            res.json(user)
        }catch (e) {
            next(e)
        }
    }
}

const {userModel} = require('../dataBaseModels')

module.exports = {
    getAll: async () => {
        return userModel.find()
    },

    createNewUser: async (newUser) => {
        return userModel.create(newUser)
    }
}

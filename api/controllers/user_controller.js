'use strict';
const { userLogin } = require('../services/userServices');
const { getUserlist } = require('../services/userServices');
const { postUsersave } = require('../services/userServices');
const { deletedUser } = require('../services/userServices');
const { updateUserService } = require('../services/userServices');
function login(req, res) {
  
    var name = req.swagger.params.username.value;
    var password = req.swagger.params.password.value;
    userLogin(name, password).then(result => {
        res.json(result)
    })
}
function getUsers(req, res) {
    getUserlist().then(result => {
        res.json(result)
    })
}
function saveUser(req, res) {
    var request = req.swagger.params.user.value;
    postUsersave(request).then(result => {
        res.json(result)
    })
}
function deleteUser(req, res) {
    var id = req.swagger.params.userId.value;
    deletedUser(id).then(result => {
        res.json(result)
    })
}
function updateUser(req, res) {
    var request = req.swagger.params.user.value;
    updateUserService(request).then(result => {
        res.json(result)
    })
}
module.exports = {
    login: login,
    getUsers: getUsers,
    saveUser: saveUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};
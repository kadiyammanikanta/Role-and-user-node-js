'use strict';
const { getRolesListDropDown,getRolesLists,postRoleSave,updateRoleService,deletedRole,getPageLists } = require('../services/userServices');
function getRoles(req, res){
    getRolesListDropDown().then(result => {
        res.json(result)
    })
}
function getRolesList(req,res){
    getRolesLists().then(result => {
        res.json(result)
    })
}
function saveRole(req,res){
    var request = req.swagger.params.role.value;
    postRoleSave(request).then(result => {
        res.json(result)
    })
}
function updateRole(req,res){
    var request = req.swagger.params.role.value;
    updateRoleService(request).then(result => {
        res.json(result)
    })
}
function deleteRole(req,res){
    var id = req.swagger.params.roleId.value;
    deletedRole(id).then(result => {
        res.json(result)
    })
}
function getPage(req,res){
    getPageLists().then(result => {
        res.json(result)
    })
}
module.exports = {
    getRoles:getRoles,
    getRolesList:getRolesList,
    saveRole:saveRole,
    updateRole:updateRole,
    deleteRole:deleteRole,
    getPage:getPage
};
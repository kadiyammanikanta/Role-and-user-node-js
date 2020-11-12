const {
    connect,
    disconnect,
    executeQuery
} = require('../helpers/connection');
const co = require('co');
const { saveRole } = require('../controllers/role_controller');

function userLogin(userName, password) {
    return co(function* () {
        try {
            const query = `select * from public.user where name='${userName}' and password = '${password}'`;
            yield connect()
            const data = yield executeQuery(query);
            const userdetails = data.rows;
            if(userdetails.length===0){
                const payload = {
                    message: "Invalid user",
                    statusCode: 404,
                    data: []
                }
                return payload;
            }
            const roleid = userdetails[0].role;
            const query1 = `select page_id from public.roles where id=${roleid}`;
            const rolesResults = yield executeQuery(query1);
            let pageIds = rolesResults.rows[0].page_id.split(',');
            pageIds =pageIds.map(item=>parseInt(item));
            const getPagesQuery = `select * from public.page where id in (${pageIds})`;
            const pages = yield executeQuery(getPagesQuery);
           // userdetails[0]['pages'] = pageIds[0].page_id.split(',');
           userdetails[0]['pageList']=pages.rows;
            const payload = {
                message: "sucess",
                statusCode: 200,
                data: userdetails[0]
            }
            return payload;

        } catch (e) {
            disconnect();
        }
    })
}

function getUserlist() {
    return co(function* () {
        try {
            const query = `select u.id,u.password,u.email,u.name, r.name as rolename from public.user u Inner Join public.roles r on u.role = r.id where u.status='true' ORDER BY u.id DESC`;
            yield connect()
            const data = yield executeQuery(query);
            if(data.rows.length!==0){
                const payload = {
                    message: "sucess",
                    statusCode: 200,
                    data: data.rows
                }
                return payload;
            }else{
                const payload = {
                    message: "Invalid user",
                    statusCode: 404,
                    data: []
                }
                return payload;
            }
            

        } catch (e) {
            disconnect();
        }
    })
}

function postUsersave(user) {
    return co(function* () {
        try {
            const query = `Insert into public.user(name,password,email,role,status)values('${user.name}','${user.password}','${user.email}','${user.role}','true')`;
            yield connect()
            const data = yield executeQuery(query);
            const userSave = data.rows;
            if(userSave.length!==0){
                const payload = {
                    message: "Invalid user",
                    statusCode: 404,
                    data: []
                }
                return payload;
            }else{
                const payload = {
                    message: "sucess",
                    statusCode: 200,
                    data: data.rows[0]
                }
                return payload;
            }
            
        } catch (e) {
            disconnect();
        }
    }

    )
}

function deletedUser(id) {
    return co(function* () {
        try {
            const query = `UPDATE public.user SET status = 'false' WHERE id = '${id}'`;
            yield connect()
            const data = yield executeQuery(query);
            if(data.rows.length===0){
                const payload = {
                    message: "deleted",
                    statusCode: 200
                }
                return payload; 
            }else{
                const payload = {
                    message: "Invalid user",
                    statusCode: 404,
                    data: []
                }
                return payload;
                
            }
        } catch (e) {
            disconnect();
        }
    }

    )
}
function updateUserService(user) {
    const id = parseInt(user.role, 10) 
    return co(function* () {
        try {
            const query = `UPDATE public.user SET status = 'true',name='${user.name}',password ='${user.password}',email='${user.email}',role='${user.role}' WHERE id = ${user.id}`;
            yield connect()
            const data = yield executeQuery(query);
            const userUpdate = data.rows;
            if(userUpdate.length===0){
                const payload = {
                    message: "User Updated Successfully",
                    statusCode: 200
                } 
                return payload;
            }else{
                const payload = {
                    message: "Invalid user",
                    statusCode: 404,
                    data: []
                }
            }
            return payload;
        } catch (e) {
            disconnect();
        }
    }
    )
}

function getRolesListDropDown() {
    return co(function* () {
        try {
            const query = `select id,name from public.roles `;
            yield connect()
            const data = yield executeQuery(query);
            if (data.rows.length !==0 ) {
                const roles =[]
                data.rows.map(item => {
                    const obj={
                        key:item.id,
                        name:item.name
                    };
                    roles.push(obj)
                })

                const payload = {
                    message: "sucess",
                    statusCode: 200,
                    data: roles
                }
                return payload;
            } else {
                const payload = {
                    message: "faild",
                    statusCode: 404,
                }
                return payload;
            }
        } catch (e) {
            disconnect();
        }
    })
}
function getRolesLists(){
    return co(function* () {
        try {
            const query = `select * from public.roles where status=1  ORDER BY id DESC`;
            yield connect()
            const data = yield executeQuery(query);
            if (data.rows.length !==0) {
                const payload = {
                    message: "sucess",
                    statusCode: 200,
                    data: data.rows
                }
                return payload;
            } else {
                const payload = {
                    message: "faild",
                    statusCode: 404,
                }
                return payload;
            }
        } catch (e) {
            disconnect();
        }
    })
}
function postRoleSave(role){
    // const pageid=(role.pageid).toString();
    return co(function* () {
        try {
            const query = `Insert into public.roles(name,page_id,status)values('${role.name}','${role.pageid}',1)`;
            yield connect()
            const data = yield executeQuery(query);
            const saveRole=data.rows;
            if(saveRole.length===0)
            {
                const payload = {
                    message: "sucess",
                    statusCode: 200,
                }
                return payload;
            }else{
                const payload = {
                    message: "faild",
                    statusCode: 404,
                }
                return payload;
            }
           
        } catch (e) {
            disconnect();
        }
    }
    )
}
function updateRoleService(role){
    // const id = parseInt(user.role, 10) 
    return co(function* () {
        try {
            const query = `UPDATE public.roles SET name='${role.name}',page_id ='${role.pageid}' WHERE id = '${role.id}'`;
            yield connect()
            const data = yield executeQuery(query);
            const updaterole =data.rows;
            if(updaterole.length===0) {
                const payload = {
                    message: "Role Updated Successfully",
                    statusCode: 200
                }
                return payload;
            }else{
                const payload = {
                    message: "faild",
                    statusCode: 404,
                }
                return payload;
            }
        } catch (e) {
            disconnect();
        }
    }
    )
}
function deletedRole(id){
    return co(function* () {
        try {
            const query = `UPDATE public.roles SET status = '0' WHERE id = '${id}'`;
            yield connect()
            const data = yield executeQuery(query);
            const deleterole= data.rows;
            if(deleterole.length===0){
                const payload = {
                    message: "Role Deleted Successfully",
                    statusCode: 200
                }
                return payload;
            }else{
                const payload = {
                    message: "faild",
                    statusCode: 404,
                }
                return payload;
            }
        } catch (e) {
            disconnect();
        }
    }

    )
}
function getPageLists(){
    return co(function* () {
        try {
            const query = `select * from public.page`;
            yield connect()
            const data = yield executeQuery(query);
            if (data.rows.length!==0) {
                const payload = {
                    message: "sucess",
                    statusCode: 200,
                    data: data.rows
                }
                return payload;
            } else {
                const payload = {
                    message: "faild",
                    statusCode: 404,
                }
                return payload;
            }
        } catch (e) {
            disconnect();
        }
    }) 
}

module.exports = {
    userLogin: userLogin,
    getUserlist: getUserlist,
    postUsersave: postUsersave,
    deletedUser: deletedUser,
    updateUserService: updateUserService,
    getRolesListDropDown: getRolesListDropDown,
    getRolesLists: getRolesLists,
    postRoleSave: postRoleSave,
    updateRoleService: updateRoleService,
    deletedRole: deletedRole,
    getPageLists:getPageLists

}
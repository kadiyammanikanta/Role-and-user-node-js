const {
    Client
} = require('pg')

const client = new Client({
    user: 'kims_crm_root',
    host: '127.0.0.1',
    database: 'm_portal',
    password: 'test',
    port: 5432,
})

async function connect() {
    if (!client.hasExecuted) {
        client.connect();
    }
}

async function disconnect() {
    client.end();
}
async function isConnected() {
    return client.hasExecuted
}

async function executeQuery(query) {
    try {
        return client.query(query)

    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    connect: connect,
    disconnect: disconnect,
    isConnected: isConnected,
    executeQuery: executeQuery
};
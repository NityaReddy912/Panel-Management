const bcryptjs = require('bcryptjs');

function encrpytPassword(passKey){
    return bcryptjs.hashSync(passKey, 10);
}

function checkPassword(passKey, password){
    return bcryptjs.compareSync(passKey, password);
}

module.exports = {encrpytPassword, checkPassword};
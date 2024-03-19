const bcryptjs = require('bcryptjs');

async function encrpytPassword(passKey){
    const a = await bcryptjs.hash(passKey, 10);
    console.log(a);
    return a;
}

async function checkPassword(passKey, password){
    return await bcryptjs.compare(passKey, password);
}
module.exports = {encrpytPassword, checkPassword};
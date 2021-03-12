const DB = require('../services/dbService')
const md5 = require("md5");


const createUser = async (body) => {
    const inserted = await DB.doRequest(`INSERT INTO users (name, surname, email, password, phone)
         VALUES ("${body.name}","${body.surname}","${body.email}","${body.password}","${body.phone}")`);
    console.log(inserted[0]);
    return inserted;
}

const getUserByPK = async (data) => {
    let str = '';
    Object.keys(data).forEach((el,i) =>{
        str += `${el} = '${data[el]}'`;
        if(i !==Object.keys(data).length - 1){
            str += ' AND '
        }
    })
    const user = await DB.doRequest( `SELECT * FROM users WHERE ${str} LIMIT 1` )
    return user[0] && user[0][0] || null;
}

const getUser = async ({email, phone}) => {
    const user = await DB.doRequest( `SELECT * FROM users WHERE email = '${email}' and phone = '${phone}'  LIMIT 1` )
    return user[0] && user[0][0] || null;
}

const getUserByPassword = async (password,email) => {
    const user = await DB.doRequest( `SELECT * FROM users WHERE password = '${password}' and email = '${email}'` )
    return user[0] && user[0][0] || null;
}

const updateUser = async (obj,email) => {
    console.log('OBJ => ', obj)
    let str = 'UPDATE users SET ';
    for (let property in obj) {
       if(obj[property]){
           str+= ` ${property} = "${obj[property]}", `;
       }
    }
    str+='updated_at=NOW()'
    // str=  str.replace(/,\s*$/, "");
    str += ` WHERE email = "${obj.email}" LIMIT 1 `;
    console.log(str)
    const updated = await DB.doRequest(str)
    return updated[0];
}

const updateUserPassword = async (email,password) => {
    console.log(`UPDATE users SET 
    password = "${password}"  WHERE email = "${email}" LIMIT 1`)
    const updated = await DB.doRequest(`UPDATE users SET 
    password = "${password}"  WHERE email = "${email}" LIMIT 1`);
    return updated[0];
}


module.exports = {
    createUser,
    getUser,
    updateUser,
    getUserByPassword,
    updateUserPassword,
    getUserByPK
}
const mysql = require('mysql');

//创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'test',
    multipleStatements: true
});

module.exports = (sql) => {
    return new Promise(function (resovle, reject) {
        pool.query(sql, function (error, data) {
            if (error) {
                reject(error);
            }
            resovle(data);
        });
    })
}
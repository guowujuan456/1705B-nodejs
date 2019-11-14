const Service = require('egg').Service;

class UserService extends Service {
    async find(pagenum = 1, limit = 2) {
        let startIndex = (pagenum - 1) * limit;
        let totalData = await this.app.mysql.query('select count(*) from list');
        let data = await this.app.mysql.query(`select * from list limit ${startIndex},${limit}`);
        return { totalData: totalData[0]['count(*)'], data }
    }
    async searchfn(key) {
        return await this.app.mysql.query(`select * from list where username like '%${key}%'`)
    }
    async addfns(username, password, address, idCard, phone) {
        console.log(1111111)
        let obj = { username, password, address, idCard, phone, create_time: new Date() }
        console.log(obj)
        let result = await this.app.mysql.insert("list", { username, password, address, idCard, phone, create_time: new Date() })
        console.log(result)
        // return 111
    }
}
module.exports = UserService;